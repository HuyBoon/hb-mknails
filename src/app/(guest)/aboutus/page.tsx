import React from "react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "About Us | MK Nails & Spa",
	description:
		"Learn more about MK Nails & Spa – your destination for relaxation, beauty, and self-care. Discover our story, our services, and our commitment to comfort and quality.",
	keywords: [
		"About MK Nails & Spa",
		"nail salon story",
		"beauty and self care",
		"spa experience",
		"nail care",
		"facial massage",
		"head spa",
		"waxing",
	],
	openGraph: {
		title: "About Us | MK Nails & Spa",
		description:
			"Get to know MK Nails & Spa: offering manicures, pedicures, spa treatments, nail art, waxing, and more in a cozy, professional environment.",
		url: "https://your-domain.com/about", // replace with real domain
		siteName: "MK Nails & Spa",
		images: [
			{
				url: "https://your-domain.com/og-about.jpg", // replace with real OG image
				width: 1200,
				height: 630,
				alt: "MK Nails & Spa About Us",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "About Us | MK Nails & Spa",
		description:
			"Discover the story behind MK Nails & Spa and our mission to provide relaxation, beauty, and self-care in every visit.",
		images: ["https://your-domain.com/og-about.jpg"],
	},
	alternates: {
		canonical: "https://your-domain.com/about",
	},
};

const AboutUs = () => {
	return (
		<div
			className="min-h-screen text-gray-800"
			style={{
				backgroundImage: `url(/bannerservicepage.png)`,
				backgroundPosition: "center",
				backgroundSize: "cover",
			}}
		>
			<div className="max-w-[1400px] mx-auto py-12 md:py-16 lg:py-24 px-4 sm:px-6 md:px-12">
				{/* Hero Section */}
				<section className="relative flex items-center justify-center">
					<div className="relative z-10 text-center px-4">
						<h1 className="text-4xl md:text-5xl font-bold text-black drop-shadow-lg">
							MK Nails & Spa
						</h1>
						<p className="mt-4 text-base italic md:text-xl text-black max-w-2xl mx-auto">
							Relaxation, beauty and self-care in every detail.
						</p>
					</div>
				</section>

				{/* Main Content */}
				<section className="mx-auto py-16 px-4 grid md:grid-cols-2 gap-10 items-center">
					<div>
						<p className="mb-4 leading-relaxed text-justify">
							Welcome to <span className="font-semibold">MK Nails & Spa</span> –
							your destination for relaxation, beauty, and self-care. We offer a
							wide range of nail services from classic manicures and pedicures
							to Shellac, deluxe spa pedicures, and convenient combo packages.
						</p>
						<p className="mb-4 leading-relaxed text-justify">
							Beyond nail care, MK Nails & Spa also provides nail extensions,
							custom nail art, professional waxing, and rejuvenating head spa &
							facial massage treatments designed to refresh both body and mind.
						</p>
						<p className="leading-relaxed text-justify">
							With a cozy atmosphere, a dedicated team, and high-quality
							products, we are here to make every visit a comfortable and
							confidence-boosting experience.
						</p>
					</div>
					<div className="relative rounded-2xl overflow-hidden shadow-lg">
						<Image
							src="/mkshop.png"
							alt="Inside MK Nails & Spa"
							width={800}
							height={600}
							className="h-auto w-full object-cover aspect-[4/3]"
							priority
						/>
					</div>
				</section>
			</div>
		</div>
	);
};

export default AboutUs;
