// utils/deleteFile.js
import fs from "fs";
import path from "path";

export const deleteFile = (relativePath) => {
  const fullPath = path.join(process.cwd(), relativePath);
  console.log("Deleting file at:", fullPath);

  fs.unlink(fullPath, (err) => {
    if (err) console.error("Lỗi xoá file:", err.message);
  });
};
