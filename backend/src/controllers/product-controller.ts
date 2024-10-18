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
		const product = await Product.findById(productId).populate("category");
		res.status(200).json({ message: "success to get one product", product });
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: "failed to get one product" });
	}
};

export const createProduct = async (req: Request, res: Response) => {
	try {
		const { name, price, description, size, quantity, category } = req.body;
		const product = await Product.create({
			name,
			price,
			description,
			size,
			quantity,
			category,
		});
		res.status(200).json({ message: "success to create product", product });
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: "failed to create product" });
	}
};

export const updateProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		// const { name, price, description, size, quantity, category } = req.body;
		const product = req.body;

		const updatedProduct = await Product.findByIdAndUpdate(
			id,
			{
				...product,
			},
			{ new: true }
		);

		if (!updatedProduct) {
			return res.status(404).json({ message: "Product not found" });
		}

		res.status(200).json(updatedProduct);
	} catch (error) {
		res.status(400).json({ message: "Error updating product", error });
	}
};
