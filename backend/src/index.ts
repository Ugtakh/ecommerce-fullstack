import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";

import { connectDB } from "./config/db";
import authRoute from "./routes/auth-route";
import categoryRoute from "./routes/category-route";
import productRoute from "./routes/product-route";
import cartRoute from "./routes/cart-route";

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

// connect mongodb
connectDB(MONGO_URI);
// server asaah
app.listen(PORT, () => {
	console.log(`Сервер localhost:${PORT} дээр аслаа.`);
});
