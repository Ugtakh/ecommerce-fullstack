import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import authRoute from "./routes/auth-route";

const PORT: string = process.env.PORT || "";

// express application object uusgeh
const app = express();

//middlewares
app.use("/api/v1/auth", authRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome E-Commerce API Server");
});

// server asaah
app.listen(PORT, () => {
  console.log(`Сервер localhost:${PORT} дээр аслаа.`);
});
