import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

export const authorize = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.user;

		if (!id) {
			return res
				.status(401)
				.json({ message: "Та энэ үйдлийг хийхийн тулд нэвтэрнэ үү" });
		}
		const user = await User.findById(id);

		if (!user || user.role !== "admin") {
			return res.status(403).json({
				message: "Зөвхөн админ хэрэглэгч энэ үйлдлийг гүйцэтгэх боломжтой.",
			});
		}

		next();
	} catch (error) {
		console.error("Error in admin middleware:", error);
		res.status(500).json({ message: "Дотоод серверийн алдаа" });
	}
};
