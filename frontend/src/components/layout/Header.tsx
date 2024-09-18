import { Heart, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export const Header = () => {
	return (
		<header className="flex items-center justify-between bg-black px-4 py-4 text-white">
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-1">
					<Image src="./logo.svg" alt="logo" width={32} height={27} />
					<Link href='/'>
						<span className="">ECOMMERCE</span>
					</Link>
				</div>
				<Link href="/category" className="">
					Ангилал
				</Link>
			</div>
			<div className="flex items-center relative">
				<Search
					color="white"
					size={16}
					className="absolute left-2"
					strokeWidth={1}
				/>
				<input
					type="text"
					placeholder="Бүтээгдэхүүн хайх"
					className="rounded-2xl text-sm pl-8 py-2 bg-[#18181B] w-[260px] "
				/>
			</div>
			<div className="flex items-center gap-3">
				<Heart color="white" className="mr-3" size={20} strokeWidth={1} />
				<ShoppingCart
					strokeWidth={1}
					color="white"
					className="mr-3"
					size={20}
				/>
				<Button variant="outline" className=" rounded-3xl">
					Бүртгүүлэх
				</Button>
				<Button className="bg-blue-500 rounded-3xl">Нэвтрэх</Button>
			</div>
		</header>
	);
};
