/* eslint-disable @typescript-eslint/no-explicit-any */

import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import UserProvider from "@/provider/user-provider";
import { Toaster } from "@/components/ui/sonner";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-layer`}>
        <NextIntlClientProvider messages={messages}>
          <UserProvider>
            <Header />
            {children}
            <Footer />
            <Toaster richColors />
          </UserProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
