import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import authRoute from "./routes/auth-route";
import { connectDB } from "./config/db";
import { generateHtmlTemplate } from "./utils/generateHtmlTemplate";
import { sendEmail } from "./utils/send-email";

const PORT: string = process.env.PORT || "";
const MONGO_URI = process.env.MONGO_URI || "";

// express application object uusgeh
const app = express();

//middlewares
app.use(express.json());
app.use("/api/v1/auth", authRoute);

app.get("/", async (req: Request, res: Response) => {
  // const rndOtp = Math.floor(Math.random() * 10_000)
  //   .toString()
  //   .padStart(4, "0");
  // sendEmail("ugtakhbayar.pico@gmail.com", rndOtp);

  res.send("Welcome E-Commerce API Server");
});

connectDB(MONGO_URI);
// server asaah
app.listen(PORT, () => {
  console.log(`Сервер localhost:${PORT} дээр аслаа.`);
});
