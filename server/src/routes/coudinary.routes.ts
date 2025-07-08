

// import express from 'express';
// import { Request, Response } from 'express';
// import axios from 'axios';
// import { verifyAccessToken } from '../middlewares/auth.middleware';

// const router = express.Router();

// router.get('/proxy-image', async (req:Request, res:Response) => {
//   const imageUrl = req.query.url as string;

//   if (!imageUrl || !imageUrl.startsWith("https://res.cloudinary.com/")) {
//     return res.status(400).json({ error: "Invalid URL" });
//   }

//   try {
//     const response = await axios.get(imageUrl, { responseType: 'stream' });
//     res.setHeader('Content-Type', response.headers['content-type']);
//     response.data.pipe(res);
//   } catch (error) {
//     console.error("Proxy error:", error);
//     res.status(500).json({ error: "Failed to fetch image" });
//   }
// });

// export default router;




// import express, { Request, Response } from 'express';
// import axios from 'axios';

// const router = express.Router();

// router.get('/proxy-image', async (req: Request, res: Response) => {
//   const imageUrl = req.query.url as string;

//   if (!imageUrl || !imageUrl.startsWith("https://res.cloudinary.com/")) {
//     return res.status(400).json({ error: "Invalid URL" });
//   }

//   try {
//     const response = await axios.get(imageUrl, { responseType: 'stream' });
//     res.setHeader('Content-Type', response.headers['content-type']);
//     response.data.pipe(res);
//   } catch (error) {
//     console.error("Proxy error:", error);
//     res.status(500).json({ error: "Failed to fetch image" });
//   }
// });

// export default router;




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
