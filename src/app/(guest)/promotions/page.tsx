"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const fallbackImages = [
	{ src: "/promotions/allpack.png", alt: "All Packages" },
	{ src: "/promotions/headspa.png", alt: "Head Spa" },
	{ src: "/promotions/waxing.png", alt: "Waxing" },
	{ src: "/promotions/deluxe.png", alt: "Deluxe" },
];

const PromotionsPage = () => {
	return (
		<motion.div
			className="w-full h-screen flex items-center justify-center "
			style={{
				backgroundImage: `url(/bannerservicepage.png)`,
				backgroundPosition: "center",
				backgroundSize: "cover",
			}}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<div className="max-w-[1400px] mx-auto  py-12 md:py-16 lg:py-12 px-4 sm:px-6 md:px-12">
				<motion.h2
					className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-btn mb-14 text-center font-cinzel-decorative"
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					Our Exclusive Promotions
				</motion.h2>
				<div className="flex flex-wrap -mx-2 gap-y-6 justify-center">
					{fallbackImages.map((img, index) => (
						<motion.div
							key={index}
							className="px-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/4"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
						>
							<div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white shadow-md">
								<Image
									src={img.src}
									alt={img.alt ?? ""}
									width={800}
									height={600}
									sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
									className="object-cover w-full h-full rounded-xl transition-transform duration-300 hover:scale-105 hover:brightness-95"
								/>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</motion.div>
	);
};

export default PromotionsPage;
