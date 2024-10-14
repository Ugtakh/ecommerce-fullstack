import { Request, Response } from "express";
import Cart from "../models/cart.model";

export const createCart = async (req: Request, res: Response) => {
	const { userId, productId, totalAmount, quantity } = req.body;
	try {
		const findUserCart = await Cart.findOne({ user: userId });

		if (!findUserCart) {
			const cart = await Cart.create({
				user: userId,
				products: { product: productId, quantity },
				totalAmount,
			});
			return res.status(200).json({
				message: "created new cart",
				cart,
			});
		}

		const findDuplicated = findUserCart.products.findIndex(
			(item) => item.product.toString() === productId
		);

		if (findDuplicated > -1) {
			findUserCart.products[findDuplicated].quantity += quantity;
		} else {
			findUserCart.products.push({ product: productId, quantity });
		}

		const updatedCart = await findUserCart.save();
		res.status(200).json({
			message: "updated cart",
			updatedCart,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			message: "failed to read carts",
		});
	}
};

export const deleteCart = async (req: Request, res: Response) => {
	const { userId, productId } = req.body;
	try {
		const findUserCart = await Cart.findOne({ user: userId });
		// const deleteCart = await Cart.deleteOne(cartId);

		if (!findUserCart) {
			return res.status(404).json({
				message: "Cart not found",
			});
		}

		const productIndex = findUserCart.products.findIndex(
			(item) => item.product.toString() === productId
		);

		if (productIndex === -1) {
			return res.status(404).json({
				message: "Product not found in cart",
			});
		}

		findUserCart.products.splice(productIndex, 1);

		if (findUserCart.products.length === 0) {
			await Cart.deleteOne({ _id: findUserCart._id });
			return res.status(200).json({
				message: "Cart is empty and has been deleted",
			});
		}

		const updatedCart = await findUserCart.save();

		res.status(200).json({
			message: "Product removed from cart",
			updatedCart,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			message: "Failed to delete product from cart",
		});
	}
};
