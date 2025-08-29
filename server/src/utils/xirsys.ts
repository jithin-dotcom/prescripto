


import express from "express";
import https from "https";

const router = express.Router();

router.get("/ice-servers", async (req, res) => {
  const bodyString = JSON.stringify({ format: "urls" });
  const xirsysCred = process.env.XIRSYS_CRED;

  
  const iceServers: any[] = [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" }
  ];

  if (!xirsysCred) {
    console.warn("XIRSYS_CRED not set, returning fallback STUNs only");
    res.json(iceServers);
    return;
  }

  const options = {
    host: "global.xirsys.net",
    path: "/_turn/prescripto", 
    headers: {
      "Authorization": "Basic " + Buffer.from(xirsysCred).toString("base64"),
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(bodyString),
    },
  };

  const request = https.request(options, (response) => {
    let data = "";

    response.on("data", (chunk) => (data += chunk));
    response.on("end", () => {
     

      try {
        const parsed = JSON.parse(data);
        

        const xirsysServers = parsed.v?.iceServers
          ? (Array.isArray(parsed.v.iceServers) ? parsed.v.iceServers : [parsed.v.iceServers])
          : [];

        xirsysServers.forEach((server: any) => {
          
          const turnUrls = server.urls.filter((url: string) => url.startsWith("turn:") || url.startsWith("turns:"));
          if (turnUrls.length > 0) {
            iceServers.push({
              username: server.username,
              credential: server.credential,
              urls: turnUrls
            });
          }
        });

        res.json(iceServers);
      } catch (err) {
        console.error("Failed to parse Xirsys response, returning fallback STUNs:", err);
        res.json(iceServers);
      }
    });
  });

  request.on("error", (err) => {
    console.error("Xirsys request error, returning fallback STUNs:", err);
    res.json(iceServers);
  });

  request.write(bodyString);
  request.end();
});

export default router;
