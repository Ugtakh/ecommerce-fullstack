import { model, Schema } from "mongoose";

interface IProduct {
	name: string;
	description: string;
	price: number;
	size: string;
	images: [string];
	isNew: boolean;
	quantity: number;
	discount: number;
	category: Schema.Types.ObjectId;
	reviews: [Schema.Types.ObjectId];
}

const productSchema = new Schema<IProduct>(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			
			type: String,
			default: "comment",
		},
		size: { type: String, enum: ["S", "L", "M", "XL", "XXL"], default: "S" },
		images: {
			type: [String],
			default: ["img"],
		},
		isNew: { type: Boolean, default: true },
		quantity: { type: Number, required: true },
		discount: { type: Number, default: 0 },
		category: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Category",
		},
		reviews: [
			{
				type: Schema.Types.ObjectId,
				ref: "Review",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
