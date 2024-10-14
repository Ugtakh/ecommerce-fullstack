export type Product = {
	_id: string;
	name: string;
	description?: string;
	price: number;
	size?: string;
	images: [string];
	isNew?: boolean;
	quantity?: number;
	discount: number;
	category?: Category;
	createdAt?: Date;
	updatedAt?: Date;
};

export type Category = {
	_id: string;
	name: string;
	description?: string;
	createdAt?: Date;
	updatedAt?: Date;
};

export type WishListProduct = {
	name: string;
	price: number;
	image: string;
};

export type Cart = {
	product: Product;
	quantity: number;
}[];

export const wishlistProducts: WishListProduct[] = [
	{
		name: "Chunky Glyph Tee",
		price: 120000,
		image: "/wishlist/wishlist1.png",
	},
	{
		name: "Doodle Hoodie",
		price: 120000,
		image: "/wishlist/wishlist2.png",
	},
	{
		name: "Local Styles Crewneck",
		price: 120000,
		image: "/wishlist/wishlist3.png",
	},
];
