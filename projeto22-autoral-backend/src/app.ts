import express, { Express } from "express";
import cors from "cors";

import { connectDb, disconnectDB } from "./config/database";
import { authRouter, productRouter } from "./routes";

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/auth", authRouter)
  .use("/products", productRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
