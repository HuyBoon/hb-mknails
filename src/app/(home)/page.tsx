import Header from "@/components/layout/Header";
import Banner from "@/components/layout/Banner";
import Shopping from "@/components/layout/Shopping";
import Footer from "@/components/layout/Footer";
import Promotions from "@/components/layout/Promotions";
import Services from "@/components/layout/Services";
import type { Metadata } from "next";
import Separate from "@/components/layout/Separate";

export const metadata: Metadata = {
	title: "MK Nails & Spa | Relaxation, Beauty & Self-Care",
	description:
		"MK Nails & Spa offers professional manicures, pedicures, spa treatments, waxing, nail art, and facial massage. Your destination for beauty, self-care, and relaxation.",
	keywords: [
		"MK Nails & Spa",
		"nail salon",
		"manicure",
		"pedicure",
		"spa treatments",
		"waxing",
		"nail extensions",
		"nail art",
		"facial massage",
		"beauty and self care",
	],
	openGraph: {
		title: "MK Nails & Spa | Relaxation, Beauty & Self-Care",
		description:
			"Discover premium nail and spa services at MK Nails & Spa. From classic manicures and pedicures to deluxe spa treatments, we provide beauty and relaxation in every detail.",
		url: "hb-mknails.vercel.app",
		siteName: "MK Nails & Spa",
		images: [
			{
				url: "hb-mknails.vercel.app/og-home.jpg",
				width: 1200,
				height: 630,
				alt: "MK Nails & Spa Homepage",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "MK Nails & Spa | Relaxation, Beauty & Self-Care",
		description:
			"Professional nail and spa services: manicures, pedicures, waxing, facials, and more at MK Nails & Spa.",
		images: ["https://your-domain.com/og-home.jpg"],
	},
	alternates: {
		canonical: "https://your-domain.com",
	},
};

export default function Home() {
	return (
		<div className="bg-[#f2ecdb]">
			<Header />
			<Banner />
			<div className=" bg-[#f2ecdb]">
				<Services />
			</div>
			<div className="overflow-hidden mt-2  ">
				<Separate />
			</div>
			<div className=" z-10">
				<Promotions />
			</div>
			<Shopping />
			<Footer />
		</div>
	);
}
