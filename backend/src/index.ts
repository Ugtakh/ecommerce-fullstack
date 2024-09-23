import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import { Resend } from "resend";

import authRoute from "./routes/auth-route";
import { connectDB } from "./config/db";

const PORT: string = process.env.PORT || "";
const MONGO_URI = process.env.MONGO_URI || "";

// express application object uusgeh
const app = express();
const resend = new Resend(process.env.RS_API_KEY);

//middlewares
app.use(express.json());
app.use("/api/v1/auth", authRoute);

app.get("/", async (req: Request, res: Response) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["ugtakhbayar.pico@gmail.com"],
    subject: "Hello World",
    html: "<strong>It works!</strong>",
  });
  if (error) {
    console.error("EMAIL_ERR", { error });
  }
  res.send("Welcome E-Commerce API Server");
});

connectDB(MONGO_URI);
// server asaah
app.listen(PORT, () => {
  console.log(`Сервер localhost:${PORT} дээр аслаа.`);
});
