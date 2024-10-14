import { Schema, model } from "mongoose";

interface IReview {
	user: Schema.Types.ObjectId;
	rating: Number;
	comment: String;
}

const reviewSchema = new Schema<IReview>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Review = model<IReview>("Review", reviewSchema);

export default Review;
