


import express, { RequestHandler } from 'express';
import axios from 'axios';

const router = express.Router();

const proxyImageHandler: RequestHandler = async (req, res) => {
  const imageUrl = req.query.url as string;

  if (!imageUrl || !imageUrl.startsWith("https://res.cloudinary.com/")) {
    res.status(400).json({ error: "Invalid URL" });
    return;
  }

  try {
    const response = await axios.get(imageUrl, { responseType: 'stream' });
    res.setHeader('Content-Type', response.headers['content-type']);
    response.data.pipe(res);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
};

router.get('/proxy-image', proxyImageHandler);
export default router;
