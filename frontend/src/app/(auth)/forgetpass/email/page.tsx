"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const Email = () => {
  const router = useRouter();

  const handleSendOtp = () => {
    router.push("/forgetpass/otp");
  };

  return (
    <div className="h-[calc(100vh-350px)] flex flex-col items-center">
      <div className="w-[320px] mt-24">
        <h1 className="text-2xl font-semibold mb-8 text-center">
          Нууц үг сэргээх
        </h1>
        <div className="flex flex-col gap-4 text-sm">
          <Input
            type="email"
            placeholder="Имэйл хаяг оруулах"
            className="input-primary"
          />
          <Button className="button-primary" onClick={handleSendOtp}>
            Илгээх
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Email;
