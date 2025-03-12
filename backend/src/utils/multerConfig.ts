import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure 'uploads/' exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Storing file in uploads/");
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    console.log("Received file:", file.originalname);
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// File filter to accept only images
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

    console.log("Checking file:", file.originalname);
    console.log("MIME Type:", file.mimetype);

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed"));
    }
};

// Multer configuration
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB max file size
    }
});

export default upload;
