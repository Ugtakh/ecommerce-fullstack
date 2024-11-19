import mongoose, { model, Schema } from "mongoose";

interface IOrder {
  user: Schema.Types.ObjectId;
  status: string;
  products: [{ product: Schema.Types.ObjectId; quantity: Number }];
  totalAmount: Number;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
      require: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
export const Order = model("Order", orderSchema);
