/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { Product } from "@/lib/types";
import { apiUrl, formattedPrice } from "@/lib/utils";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const ProductDetail = () => {
	const { id } = useParams();
	const [product, setProduct] = useState<Product>({
		_id: "",
		name: "",
		price: 0,
		images: [""],
		discount: 0,
	});
	const [productQuantity, setProductQuantity] = useState(0);

	const getProductDataById = async () => {
		try {
			const response = await axios.get(`${apiUrl}/products/${id}`);
			if (response.status === 200) {
				setProduct(response.data.product);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			toast.error("Failed to get product detail");
		}
	};

	useEffect(() => {
		getProductDataById();
	}, []);

	return (
		<div className="h-screen max-w-[1300px] mx-auto mt-14 mb-24">
			<div className="flex items-center gap-4">
				<div>
					{product.images.map((img, index) => (
						<img
							src={img}
							alt="images"
							key={index}
							className="w-[422px] h-[521px] rounded-2xl"
						/>
					))}
				</div>
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<h1 className="text-2xl font-bold">{product.name}</h1>
						<Heart size={22} strokeWidth={1} />
					</div>
					<p className="text-base">{product.description}</p>
					<div className="flex gap-5">
						<p
							className="border border-solid border-black px-2 rounded-full cursor-pointer"
							onClick={() => setProductQuantity(productQuantity - 1)}
						>
							-
						</p>
						<p>{productQuantity}</p>
						<p
							className="border border-solid border-black px-2 rounded-full cursor-pointer"
							onClick={() => setProductQuantity(productQuantity + 1)}
						>
							+
						</p>
					</div>
					<p className="text-xl font-bold">{formattedPrice(product.price)}₮</p>
					<Button>Сагсанд нэмэх</Button>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
