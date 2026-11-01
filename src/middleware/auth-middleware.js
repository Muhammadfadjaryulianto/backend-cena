import { prismaClient } from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.get("Authorization");

    // Memastikan Authorization tersedia
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        errors: "Unauthorized",
      });
    }

    // Mengambil token tanpa prefix Bearer
    const token = authorization.slice(7).trim();

    if (!token) {
      return res.status(401).json({
        errors: "Unauthorized",
      });
    }

    const user = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: "Unauthorized",
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    next(error);
  }
};
