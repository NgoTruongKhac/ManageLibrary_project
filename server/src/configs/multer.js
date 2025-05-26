// config/multer.js
import multer from "multer";
import path from "path";
import fs from "fs";

// Đảm bảo thư mục tồn tại
const uploadDir = "uploads/avatars";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  // Chỉ chấp nhận các loại ảnh
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ cho phép upload file ảnh"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
