/* eslint-disable @next/next/no-img-element */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BuySteps = () => {
	return (
		<div className="h-screen p-4">
			<Card className="p-4 rounded-2xl w-1/2 mb-2">
				<CardContent className="flex justify-between p-0">
					<div className="flex gap-6">
						{/* <img src={} alt="wishlists" className="w-32 h-28 rounded-2xl" /> */}
						<div>
							<p className="font-normal text-base">name</p>
							<div className="flex gap-5">
								<p className="border border-solid border-black px-2 rounded-full cursor-pointer">
									-
								</p>
								<p>0</p>
								<p className="border border-solid border-black px-2 rounded-full cursor-pointer">
									+
								</p>
							</div>
							<p className="mt-1 mb-2 text-sm font-bold">price</p>
						</div>
					</div>
				</CardContent>
			</Card>
			<Button className="button-primary">Худалдан авах</Button>
		</div>
	);
};

export default BuySteps;
