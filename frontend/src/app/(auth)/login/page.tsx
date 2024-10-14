"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiUrl } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/provider/user-provider";

const LogIn = () => {
	const router = useRouter();
	const { setIsLoggedIn } = useUser();
	const [logInForm, setLogInForm] = useState({
		email: "",
		password: "",
	});

	const userLogIn = async () => {
		const { email, password } = logInForm;
		try {
			const response = await axios.post(`${apiUrl}/auth/login`, {
				email,
				password,
			});

			if (response.status === 200) {
				const { token } = response.data;
				localStorage.setItem("token", token);
				router.push("/");
				setIsLoggedIn(true);
				toast.success("User successfully logged in");
			}
		} catch (error) {
			toast.error("User failed to log in");
		}
	};

	return (
		<div className="h-[calc(100vh-350px)] flex flex-col justify-center items-center">
			<div className="w-[320px]">
				<h1 className="text-2xl font-semibold mb-8 text-center">Нэвтрэх</h1>
				<div className="flex flex-col gap-4 text-sm">
					<Input
						type="email"
						placeholder="Имэйл хаяг"
						className="input-primary"
						onChange={(e) =>
							setLogInForm({ ...logInForm, email: e.target.value })
						}
					/>
					<Input
						type="password"
						placeholder="Нууц үг"
						className="input-primary"
						onChange={(e) =>
							setLogInForm({ ...logInForm, password: e.target.value })
						}
					/>
					<Button className="button-primary" onClick={userLogIn}>
						Нэвтрэх
					</Button>
				</div>
				<div className="flex flex-col gap-12 mt-4">
					<Link href="/forgetpass/email" className="text-center text-sm">
						<Button
							className="underline text-muted-foreground font-normal"
							variant="link"
						>
							Нууц үг мартсан
						</Button>
					</Link>
					<Link href="/signup">
						<Button
							variant="outline"
							className="border-blue-primary text-blue-primary rounded-[18px] w-full bg-white"
						>
							Бүртгүүлэх
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LogIn;
