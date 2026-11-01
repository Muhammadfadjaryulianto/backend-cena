import express from "express";
import cors from "cors";
import { publicRouter } from "../route/public-api.js";
import { userRouter } from "../route/api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { uploadDir } from "../middleware/multer-middleware.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";
import fs from "node:fs";
import path from "node:path";

export const app = express();

const openapiFile = fs.readFileSync(
  path.resolve(process.cwd(), "open-api.yaml"),
  "utf8",
);

const openapiDocument = YAML.parse(openapiFile);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));

app.use(cors());
app.use(express.json());

app.use("/api/cover", express.static(uploadDir));

app.use(publicRouter);
app.use(userRouter);

app.use(errorMiddleware);
