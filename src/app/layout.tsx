import type { Metadata } from "next";
import {
	Lora,
	Great_Vibes,
	Cinzel_Decorative,
	Mr_Dafoe,
} from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/contexts/AppContext";
import { ClientToaster } from "@/components/shared/ClientToaster";

export const metadata: Metadata = {
	title: "MK NAIL & SPA",
	description: "Nature is the best medicine",
};

const mrDafoe = Mr_Dafoe({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-mrDafoe",
	display: "swap",
});
const lora = Lora({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-lora",
	display: "swap",
});
const cinzelDecorative = Cinzel_Decorative({
	subsets: ["latin"],
	weight: ["400", "700", "900"],
	variable: "--font-cinzel-decorative",
	display: "swap",
});

const greatVibes = Great_Vibes({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-greatvibes",
	display: "swap",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${lora.variable} ${greatVibes.variable} ${cinzelDecorative.variable} ${mrDafoe.variable}`}
			>
				<AppProvider>{children}</AppProvider>
				<ClientToaster />
			</body>
		</html>
	);
}
