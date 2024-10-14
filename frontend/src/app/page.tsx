import { Hero } from "@/components/home";
import { ProductCard, FeaturedProductCard } from "@/components/product-card";
import { Product } from "@/lib/data";
import { apiUrl } from "@/lib/utils";
import axios from "axios";

interface ProductResponse {
	products: Product[];
}

const getProductData = async () => {
	try {
		const response = await axios.get<ProductResponse>(`${apiUrl}/products`);
		return response.data.products;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw new Error("Failed to fetch data");
	}
};

export default async function Home() {
	const products = await getProductData();
	return (
		<main>
			<Hero />
			<section className="mt-6 mb-24 max-w-[1100px] mx-auto grid grid-cols-4 gap-y-12 gap-x-5">
				{products.map((product, index) => {
					return (
						<>
							{index === 6 || index === 7 ? (
								<FeaturedProductCard key={index} {...product} />
							) : (
								<ProductCard key={index} {...product} />
							)}
						</>
					);
				})}
			</section>
		</main>
	);
}
