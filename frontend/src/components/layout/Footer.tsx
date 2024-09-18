import {
	Facebook,
	Instagram,
	Linkedin,
	Mail,
	Phone,
	Twitter,
} from "lucide-react";
import Image from "next/image";
import { Separator } from "../ui/separator";

export const Footer = () => {
	return (
		<footer className="bg-black text-white py-16">
			<div className="max-w-[1000px] mx-auto">
				<div className="flex justify-between items-center">
					<Image src="./logo.svg" alt="logo" width={41} height={34} />
					<div className="flex gap-9 items-center">
						<div className="flex gap-5  items-center">
							<Phone size={20} color="white" strokeWidth={1.25} />
							<span className="text-sm">(976) 7007-1234</span>
						</div>
						<div className="flex gap-5  items-center">
							<Mail size={20} color="white" strokeWidth={1.25} />
							<span className="text-sm">contact@ecommerce.mn</span>
						</div>
					</div>
				</div>
				<Separator className="my-11 bg-[#ffffff1a]" />
				<div className="flex justify-between items-center">
					<p className="text-sm">© 2024 Ecommerce MN</p>
					<div className="flex gap-7">
						<Facebook color="white" size={20} strokeWidth={1.25} />
						<Instagram color="white" size={20} strokeWidth={1.25} />
						<Twitter size={20} strokeWidth={1.25} />
						<Linkedin size={20} strokeWidth={1.25} />
					</div>
				</div>
			</div>
		</footer>
	);
};
