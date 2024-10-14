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

// try {
//   const page = parseInt(req.query.page as string) || 1; // Current page number
//   const limit = parseInt(req.query.limit as string) || 10; // Number of items per page
//   const skip = (page - 1) * limit; // Number of items to skip

//   // Fetch products with pagination
//   const products = await Product.find()
//     .skip(skip)
//     .limit(limit)
//     .sort({ createdAt: -1 }); // Sort by creation date, newest first

//   // Get total count of products
//   const totalProducts = await Product.countDocuments();

//   // Calculate total pages
//   const totalPages = Math.ceil(totalProducts / limit);

//   res.json({
//     products,
//     currentPage: page,
//     totalPages,
//     totalProducts,
//   });
// } catch (error) {
//   res.status(500).json({ message: 'Error fetching products', error });
// }