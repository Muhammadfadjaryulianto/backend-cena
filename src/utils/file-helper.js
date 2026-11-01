import fs from "fs/promises";
import path from "path";
import { uploadDir } from "../middleware/multer-middleware.js";

// Menghapus file berdasarkan nama file
const removeFile = async (filename) => {
  if (!filename) return;

  // Pastikan hanya nama file yang digunakan
  const safeFilename = path.basename(filename);

  const filePath = path.join(uploadDir, safeFilename);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    // File yang sudah tidak ada tidak perlu dianggap sebagai kegagalan
    if (error.code === "ENOENT") {
      return;
    }

    throw error;
  }
};

export { removeFile };
