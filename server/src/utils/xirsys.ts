


// import express from "express";
// import https from "https";

// const router = express.Router();

// router.get("/ice-servers", (req, res) => {
//   const bodyString = JSON.stringify({ format: "urls" });
//   const xirsysCred = process.env.XIRSYS_CRED;
//   if (!xirsysCred) {
//     throw new Error("XIRSYS_CRED environment variable is not set");
//   }

//   const options = {
//     host: "global.xirsys.net",
//     path: "/_turn/prescripto", 
//     method: "PUT",
//     headers: {
//       "Authorization":
//         "Basic " +
//         Buffer.from(xirsysCred).toString(
//           "base64"
//         ),
//       "Content-Type": "application/json",
//       "Content-Length": bodyString.length,
//     },
//   };

//   const httpreq = https.request(options, (httpres) => {
//     let str = "";
//     httpres.on("data", (data) => {
//       str += data;
//     });
//     httpres.on("end", () => {
//       try {
//         const parsed = JSON.parse(str);
//         console.log("Xirsys response:", JSON.stringify(parsed, null, 2));
//         // res.json(parsed.v?.iceServers || []); 
//         // res.json({ iceServers: parsed.v?.iceServers || [] });

//            const xirsysIceServers = parsed.v?.iceServers || [];

//         // ✅ Add Google STUN as first ICE server
//         const iceServers = [
//           { urls: "stun:stun.l.google.com:19302" },
//           ...xirsysIceServers,
//         ];

//         res.json({ iceServers });
//       } catch (err) {
//         res.status(500).json({ error: "Failed to parse ICE response" });
//       }
//     });
//   });

//   httpreq.on("error", (e) => {
//     console.log("request error:", e);
//     res.status(500).json({ error: "ICE fetch failed" });
//   });

//   httpreq.write(bodyString);
//   httpreq.end();
// });

// export default router;














// import express from "express";
// import https from "https";

// const router = express.Router();

// router.get("/ice-servers", (req, res) => {
//   const bodyString = JSON.stringify({ format: "urls" });
//   const xirsysCred = process.env.XIRSYS_CRED;

//   if (!xirsysCred) {
//     console.error("XIRSYS_CRED not set in env");
//     res.status(500).json({ error: "XIRSYS_CRED environment variable not set" });
//     return;
//   }

//   const options = {
//     host: "global.xirsys.net",
//     path: "/_turn/prescripto", 
//     method: "PUT",
//     headers: {
//       "Authorization": "Basic " + Buffer.from(xirsysCred).toString("base64"),
//       "Content-Type": "application/json",
//       "Content-Length": bodyString.length,
//     },
//   };

//   const httpreq = https.request(options, (httpres) => {
//     let str = "";
//     httpres.on("data", (chunk) => (str += chunk));
//     httpres.on("end", () => {
//       try {
//         const parsed = JSON.parse(str);

//         if (parsed.s !== "ok" || !parsed.v?.iceServers) {
//           console.error("Invalid Xirsys response:", parsed);
//            res.status(500).json({ error: "Invalid ICE response from Xirsys" });
//            return;
//         }

//         const xirsysIce = Array.isArray(parsed.v.iceServers)
//           ? parsed.v.iceServers
//           : [parsed.v.iceServers];

        
//         const iceServers = [
//           { urls: "stun:stun.l.google.com:19302" },
//           ...xirsysIce,
//         ];

//         console.log("Returning ICE servers:", iceServers);
//         res.json(iceServers);
//       } catch (err) {
//         console.error("Failed to parse ICE response:", err, str);
//         res.status(500).json({ error: "Failed to parse ICE response" });
//       }
//     });
//   });

//   httpreq.on("error", (e) => {
//     console.error("Xirsys request error:", e);
//     res.status(500).json({ error: "ICE fetch failed" });
//   });

//   httpreq.write(bodyString);
//   httpreq.end();
// });

// export default router;



















import express from "express";
import https from "https";

const router = express.Router();

router.get("/ice-servers", async (req, res) => {
  const bodyString = JSON.stringify({ format: "urls" });
  const xirsysCred = process.env.XIRSYS_CRED;

  // Multiple Google STUN servers as fallback
  const fallbackIceServers = [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" },
  ];

  if (!xirsysCred) {
    console.warn("XIRSYS_CRED not set, returning fallback STUNs only");
    res.json(fallbackIceServers);
    return;
  }

  const options = {
    host: "global.xirsys.net",
    path: "/_turn/prescripto", // replace with your channel name
    method: "PUT",
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

        if (parsed.s !== "ok" || !parsed.v?.iceServers) {
          console.warn("Xirsys invalid response, using fallback STUNs:", parsed);
          res.json(fallbackIceServers);
          return;
        }

        const xirsysIce = Array.isArray(parsed.v.iceServers)
          ? parsed.v.iceServers.map((server: any) => ({
              urls: server.urls,
              username: server.username || undefined,
              credential: server.credential || undefined,
            }))
          : [];

        // Combine Google STUNs + Xirsys TURN
        const iceServers = [...fallbackIceServers, ...xirsysIce];
        console.log("Returning ICE servers:", iceServers);
        res.json(iceServers);
      } catch (err) {
        console.error("Failed to parse Xirsys response, using fallback STUNs:", err, data);
        res.json(fallbackIceServers);
      }
    });
  });

  request.on("error", (err) => {
    console.error("Xirsys request error, returning fallback STUNs:", err);
    res.json(fallbackIceServers);
  });

  request.write(bodyString);
  request.end();
});

export default router;
