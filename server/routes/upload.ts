// server/routes/upload.ts
import { RequestHandler } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

export const handleAvatarUpload: RequestHandler = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded." });
  }
  
  const avatarUrl = `/uploads/${req.file.filename}`;

  res.status(200).json({ 
    success: true, 
    message: "Avatar uploaded successfully.",
    avatarUrl: avatarUrl
  });
};

export const uploadMiddleware = upload.single('avatar');
