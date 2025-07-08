



import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadToCloudinary = (fileBuffer: Buffer, folder: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || '');
      }
    );

    Readable.from(fileBuffer).pipe(uploadStream);
  });
};






// export const uploadToCloudinary = (fileBuffer: Buffer, folder: string): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         folder,
//         resource_type: "auto",
//         type: "authenticated",         // 🔐 Important
//         access_mode: "authenticated",  // 🔐 Optional but reinforces access control
//       },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result?.public_id || ''); // ✅ Save public_id, not URL
//       }
//     );

//     Readable.from(fileBuffer).pipe(uploadStream);
//   });
// };





// import { v2 as cloudinary } from 'cloudinary';
// import express from 'express';

// const router = express.Router();

// router.get('/signed-url/:publicId', (req, res) => {
//   const publicId = req.params.publicId;

//   try {
//     const signedUrl = cloudinary.url(publicId, {
//       secure: true,
//       type: 'authenticated',
//       sign_url: true,
//       expires_at: Math.floor(Date.now() / 1000) + 60 * 5, // 5 min expiry
//     });

//     res.json({ url: signedUrl });
//   } catch (err) {
//     console.error("Signed URL error:", err);
//     res.status(500).json({ error: "Unable to generate signed URL" });
//   }
// });

// export default router;
