import multer from "multer";
import { ResponseError } from "../error/response-error.js";

const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ResponseError) {
    res.status(err.status).json({
      errors: err.message,
    });
  }

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        errors: "Ukuran file maksimal 2 MB",
      });
    }

    return res.status(400).json({
      errors: "Terjadi kesalahan saat mengunggah file",
    });
  }

  console.error(err);

  return res.status(500).json({
    errors: "Internal Server Error",
  });
};

export { errorMiddleware };
