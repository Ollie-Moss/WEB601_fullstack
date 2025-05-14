/*
File: backend/routes/uploadRoutes.js
Description: Imports controllers, sets up routes and their methods
Versions: 0.2.0
Author: WEB601
*/

import path from 'path';
import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';

const router = express.Router();

// Ensure the uploads directory exists
const UPLOAD_DIR = 'uploads/';
await fs.mkdir(UPLOAD_DIR, { recursive: true });

// Multer storage configuration
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await fs.access(UPLOAD_DIR);
      cb(null, UPLOAD_DIR);
    } catch (err) {
      cb(new Error("Upload directory is not accessible"));
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

// File type validation
const checkFileType = (file) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return true;
  } else {
    throw new Error('Only JPG, JPEG, and PNG files are allowed');
  }
};

// Multer middleware setup
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    try {
      if (checkFileType(file)) {
        cb(null, true);
      }
    } catch (error) {
      cb(error);
    }
  },
});

// Async route handler
router.post('/', async (req, res, next) => {
  try {
    // Use a Promise-based wrapper for the multer single file upload
    await new Promise((resolve, reject) => {
      upload.single('image')(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.status(200).json({ path: `/${req.file.path}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
