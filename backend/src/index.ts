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
import Stripe from "stripe";

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

const stripe = new Stripe("", {
  apiVersion: "2024-10-28.acacia",
});

// stripe webhook
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req: Request, res: Response) => {
    try {
      const stripe_signature = req.headers["stripe-signature"];
      let event: Stripe.Event;
      if (!stripe_signature) {
        return res.status(500).json({ message: "Stripe no signature" });
      }
      // console.log("SIG", stripe_signature);
      // console.log("BODY", req.body);
      event = stripe.webhooks.constructEvent(req.body, stripe_signature, "");
      console.log("EV", event);

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        session.amount_total;

        console.log("EM", session.amount_total);
      }
      console.log("WEBHOOK called");
      res.status(200).json({ received: true });
    } catch (error) {
      console.log("WEBHOOK called as Error", error);
      res.status(500).json({ received: false });
    }
  }
);

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

app.get("/checkout", async (req: Request, res: Response) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "mnt",
          product_data: {
            name: "Node js book",
          },
          unit_amount: 50000 * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/payment/complete",
    cancel_url: "http://localhost:3000/payment/cancel",
  });
  console.log(session);

  res.status(200).json({ url: session.url! });
});

// connect mongodb
connectDB(MONGO_URI);

// server asaah
app.listen(PORT, () => {
  console.log(`Сервер localhost:${PORT} дээр аслаа.`);
});
