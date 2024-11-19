"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiUrl } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignUp = () => {
	const router = useRouter();
	const [signUpForm, setSignUpForm] = useState({
		lastname: "",
		firstname: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleSignUpValues = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setSignUpForm({ ...signUpForm, [name]: value });
	};

	const userSignUp = async () => {
		const { lastname, firstname, email, password, confirmPassword } =
			signUpForm;
		try {
			if (password !== confirmPassword) {
				toast.error("Password does not match");
				return;
			}
			const response = await axios.post(`${apiUrl}/auth/signup`, {
				lastname,
				firstname,
				email,
				password,
			});

			if (response.status === 201) {
				router.push("/login");
				toast.success("User successfully signed up");
			}
		} catch (error) {
			console.log("error", error);
			toast.error("User failed to sign up");
		}
	};

	return (
		<div className="2xl:h-[calc(100vh-350px)] h-[calc(100vh-200px)] flex flex-col justify-center items-center bg-layer">
			<div className="w-[320px]">
				<h1 className="text-2xl font-semibold mb-8 text-center">Бүртгүүлэх</h1>
				<div className="flex flex-col gap-4 text-sm">
					<Input
						type="text"
						placeholder="Овог"
						className="input-primary"
						name="lastname"
						onChange={handleSignUpValues}
					/>
					<Input
						type="text"
						placeholder="Нэр"
						className="input-primary"
						name="firstname"
						onChange={handleSignUpValues}
					/>
					<Input
						type="email"
						placeholder="Имэйл хаяг"
						className="input-primary"
						name="email"
						onChange={handleSignUpValues}
					/>
					<Input
						type="password"
						placeholder="Нууц үг"
						className="input-primary"
						name="password"
						onChange={handleSignUpValues}
					/>
					<Input
						type="password"
						placeholder="Нууц үг давтах"
						className="input-primary"
						name="confirmPassword"
						onChange={handleSignUpValues}
					/>
					<ul className="list-disc pl-5 mb-4 text-muted-foreground text-xs font-light leading-5 flex flex-col gap-0.5">
						<li>Том үсэг орсон байх</li>
						<li>Жижиг үсэг орсон байх</li>
						<li>Тоо орсон байх</li>
						<li>Тэмдэгт орсон байх</li>
					</ul>
				</div>
				<div className="flex flex-col gap-12">
					<Button className="button-primary" onClick={userSignUp}>
						Үүсгэх
					</Button>
					<Link href="/login">
						<Button
							variant="outline"
							className="border-blue-primary text-blue-primary rounded-[18px] w-full bg-white"
						>
							Нэвтрэх
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
