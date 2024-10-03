import { Request, Response } from "express";
import Product from "../models/product.model";

export const getAllProduct = async (req: Request, res: Response) => {
	try {
    const products = await Product.find({}).populate("category");
		res.status(200).json({ message: "success to get all product", products });
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: "failed to get all product" });
	}
};

export const getProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId).populate("category")
    res.status(200).json({ message: "success to get one product", product });
  } catch (error) {
    console.error(error);
		res.status(400).json({ message: "failed to get one product" });
  }
}