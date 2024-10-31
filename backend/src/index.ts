import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";

import { connectDB } from "./config/db";
import authRoute from "./routes/auth-route";
import categoryRoute from "./routes/category-route";
import productRoute from "./routes/product-route";
import cartRoute from "./routes/cart-route";

import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dn78df09z",
  api_key: "757122712419763",
  api_secret: "V9ntxkYkr-KR-ByrWPo56nyp8so",
});
// CLOUDINARY_CLOUD_NAME = "dn78df09z";
// CLOUDINARY_API_KEY = "757122712419763";
// CLOUDINARY_API_SECRET = "V9ntxkYkr-KR-ByrWPo56nyp8so";

const PORT: string = process.env.PORT || "";
const MONGO_URI = process.env.MONGO_URI || "";

// express application object uusgeh
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/carts", cartRoute);

// home request
app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome E-Commerce API Server");
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post(
  "/upload",
  upload.single("photo"),
  async (req: Request, res: Response) => {
    try {
      console.log("REQFILE", req.file);
      const uu = await cloudinary.uploader
        .upload_stream()
        .end(req.file?.buffer);
      console.log("uu", uu);
      res.send("success");
    } catch (error) {
      console.log(error);
      res.send("not success");
    }
  }
);

// connect mongodb
connectDB(MONGO_URI);
// server asaah
app.listen(PORT, () => {
  console.log(`Сервер localhost:${PORT} дээр аслаа.`);
});
