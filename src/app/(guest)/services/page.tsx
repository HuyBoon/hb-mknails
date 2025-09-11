import { Suspense } from "react";
import ServicePageContent from "./ServicePageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Nail & Spa Services | MK Nails & Spa",
	description:
		"Discover professional nail and spa services at MK Nails & Spa. From manicures and pedicures to deluxe spa treatments, we provide relaxation and beauty care tailored to you.",
	keywords: [
		"MK Nails & Spa",
		"nail salon",
		"manicure",
		"pedicure",
		"spa treatments",
		"beauty care",
		"self care",
		"nail services",
	],
	openGraph: {
		title: "Nail & Spa Services | MK Nails & Spa",
		description:
			"Relax and beautify with manicure, pedicure, and spa treatments at MK Nails & Spa.",
		url: "https://your-domain.com/service", // replace with your real domain
		siteName: "MK Nails & Spa",
		images: [
			{
				url: "https://your-domain.com/og-image.jpg", // replace with your real OG image
				width: 1200,
				height: 630,
				alt: "MK Nails & Spa Service Page",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Nail & Spa Services | MK Nails & Spa",
		description:
			"Explore manicures, pedicures, and spa treatments at MK Nails & Spa. Your destination for beauty and relaxation.",
		images: ["https://your-domain.com/og-image.jpg"], // same OG image
	},
	alternates: {
		canonical: "https://your-domain.com/service",
	},
};

const ServicePage = () => {
	return (
		<Suspense
			fallback={
				<div className="flex justify-center items-center min-h-screen">
					Loading...
				</div>
			}
		>
			<ServicePageContent />
		</Suspense>
	);
};

export default ServicePage;
