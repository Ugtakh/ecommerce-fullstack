"use client";
import { Heart, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useUser } from "@/provider/user-provider";

export const Header = () => {
	const { user } = useUser();
	return (
		<header className="flex items-center justify-between bg-black px-4 py-4 text-white text-sm">
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-1">
					<Image src="/logo.svg" alt="logo" width={32} height={27} />
					<Link href="/">
						<span className="text-white-primary">ECOMMERCE</span>
					</Link>
				</div>
				<Link href="/category">
					<span className="text-muted-foreground">Ангилал</span>
				</Link>
			</div>
			<div className="flex items-center relative">
				<Search
					color="white"
					size={18}
					className="absolute left-2"
					strokeWidth={1}
				/>
				<Input
					type="text"
					className="rounded-2xl pl-8 py-2 bg-[#18181B] w-[260px] placeholder:text-muted-foreground border-none"
					placeholder="Бүтээгдэхүүн хайх"
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
				{user && <img src={""} alt="'profile" />}
				{!user && (
					<>
						<Link href="/signup">
							<Button
								variant="outline"
								className="rounded-3xl border-blue-primary text-white-primary"
							>
								Бүртгүүлэх
							</Button>
						</Link>
						<Link href="/login">
							<Button className="button-primary">Нэвтрэх</Button>
						</Link>
					</>
				)}
			</div>
		</header>
	);
};
