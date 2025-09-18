import { Suspense } from "react";
import ServicePageContent from "./ServicePageContent";
import { servicesData } from "@/utils/data/servicesData"; // Import for fallback
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
		url: "https://your-domain.com/service",
		siteName: "MK Nails & Spa",
		images: [
			{
				url: "https://your-domain.com/og-image.jpg",
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
		images: ["https://your-domain.com/og-image.jpg"],
	},
	alternates: {
		canonical: "https://your-domain.com/service",
	},
};

async function fetchServices() {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/service`,
			{
				cache: "no-store",
			}
		);
		const result = await response.json();

		if (result.success && result.data) {
			return result.data;
		} else {
			console.error("Failed to fetch services:", result.message);
			return Object.values(servicesData);
		}
	} catch (error) {
		console.error("Error fetching services:", error);
		return Object.values(servicesData);
	}
}

const ServicePage = async () => {
	const services = await fetchServices();

	return (
		<Suspense
			fallback={
				<div className="flex justify-center items-center min-h-screen">
					Loading...
				</div>
			}
		>
			<ServicePageContent services={services} />
		</Suspense>
	);
};

export default ServicePage;
