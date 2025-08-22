


import express from "express";
import https from "https";

const router = express.Router();

router.get("/ice-servers", (req, res) => {
  const bodyString = JSON.stringify({ format: "urls" });
  const xirsysCred = process.env.XIRSYS_CRED;
  if (!xirsysCred) {
    throw new Error("XIRSYS_CRED environment variable is not set");
  }

  const options = {
    host: "global.xirsys.net",
    path: "/_turn/prescripto", 
    method: "PUT",
    headers: {
      "Authorization":
        "Basic " +
        Buffer.from(xirsysCred).toString(
          "base64"
        ),
      "Content-Type": "application/json",
      "Content-Length": bodyString.length,
    },
  };

  const httpreq = https.request(options, (httpres) => {
    let str = "";
    httpres.on("data", (data) => {
      str += data;
    });
    httpres.on("end", () => {
      try {
        const parsed = JSON.parse(str);
        res.json(parsed.v?.iceServers || []); 
      } catch (err) {
        res.status(500).json({ error: "Failed to parse ICE response" });
      }
    });
  });

  httpreq.on("error", (e) => {
    console.log("request error:", e);
    res.status(500).json({ error: "ICE fetch failed" });
  });

  httpreq.write(bodyString);
  httpreq.end();
});

export default router;
