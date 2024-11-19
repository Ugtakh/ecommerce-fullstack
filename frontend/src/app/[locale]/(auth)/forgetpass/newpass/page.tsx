"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const NewPass = () => {
	const { toast } = useToast();
	const [password, setPassword] = useState("");
	const [repassword, setRePassword] = useState("");

	const handleNewPassword = () => {
		if (!(password === repassword)) {
			toast({
				title: "Алдаа",
				description: "Нууц үг хоорондоо таарахгүй байна",
			});
			return;
		}
	};

	return (
		<div className="h-[calc(100vh-350px)] flex flex-col items-center">
			<div className="w-[320px] mt-24">
				<h1 className="text-2xl font-semibold mb-8 text-center">
					Нууц үг сэргээх
				</h1>
				<div className="flex flex-col gap-4 text-sm">
					<Input
						type="password"
						placeholder="Шинэ нууц үг"
						className="input-primary"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Input
						type="password"
						placeholder="Шинэ нууц үг давтах"
						className="input-primary"
						onChange={(e) => setRePassword(e.target.value)}
					/>
					<ul className="list-disc pl-5 text-muted-foreground text-xs font-light leading-5 flex flex-col gap-0.5">
						<li>Том үсэг орсон байх</li>
						<li>Жижиг үсэг орсон байх</li>
						<li>Тоо орсон байх</li>
						<li>Тэмдэгт орсон байх</li>
					</ul>
					<Button className="button-primary" onClick={handleNewPassword}>
						Үүсгэх
					</Button>
				</div>
			</div>
		</div>
	);
};

export default NewPass;
