"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

type Img = { src: string; alt?: string };

const fallbackImages: Img[] = [
	{ src: "/promotions/allpack.png", alt: "All Packages" },
	{ src: "/promotions/headspa.png", alt: "Head Spa" },
	{ src: "/promotions/waxing.png", alt: "Waxing" },
	{ src: "/services/hand.png", alt: "Image 1" },
	{ src: "/services/foot.png", alt: "Image 2" },
	{ src: "/services/packages.png", alt: "Image 3" },
	{ src: "/services/nailExtensions.png", alt: "Image 4" },
	{ src: "/services/headSpa.png", alt: "Image 5" },
	{ src: "/services/waxing.png", alt: "Image 6" },
];

interface PromotionsSectionProps {
	images?: Img[];
	fetchUrl?: string;
	className?: string;
}

export default function PromotionsSection({
	images: imagesProp,
	fetchUrl = "/api/promotions",
	className = "",
}: PromotionsSectionProps) {
	const [images, setImages] = useState<Img[]>(imagesProp ?? fallbackImages);
	const [loading, setLoading] = useState<boolean>(!imagesProp);

	useEffect(() => {
		if (imagesProp) {
			setImages(imagesProp);
			setLoading(false);
			return;
		}

		let mounted = true;
		setLoading(true);

		(async () => {
			try {
				const res = await fetch(fetchUrl);
				if (!res.ok) throw new Error("Fetch failed");
				const data = await res.json();
				if (!mounted) return;
				const normalized: Img[] = Array.isArray(data)
					? data.map((it: any) =>
							typeof it === "string"
								? { src: it, alt: "" }
								: { src: it.src, alt: it.alt ?? "" }
					  )
					: [];
				setImages(normalized.length ? normalized : fallbackImages);
			} catch (e) {
				console.warn("PromotionsSection fetch error:", e);
				setImages(fallbackImages);
			} finally {
				if (mounted) setLoading(false);
			}
		})();

		return () => {
			mounted = false;
		};
	}, [imagesProp, fetchUrl]);

	const buttonVariants = {
		rest: { scale: 1 },
		hover: { scale: 1.1 },
		pressed: { scale: 0.95 },
	};

	return (
		<section
			className={`relative w-full mx-auto py-24 px-4 md:px-16 bg-cover bg-center ${className}`}
			style={{ backgroundImage: `url(/separate.png)` }}
		>
			<div className="text-center px-10 py-5 rounded-2xl bg-btn border border-white mb-12 mx-auto w-fit">
				<h2 className="text-white uppercase text-[40px] font-bold">
					Promotions
				</h2>
			</div>

			<div className="relative mx-auto max-w-[1440px]">
				<Swiper
					modules={[Navigation]}
					navigation={{
						prevEl: ".pro-prev",
						nextEl: ".pro-next",
					}}
					slidesPerView={3}
					speed={2000}
					spaceBetween={20}
					breakpoints={{
						0: { slidesPerView: 1, spaceBetween: 10 },
						640: { slidesPerView: 2, spaceBetween: 15 },
						1024: { slidesPerView: 3, spaceBetween: 20 },
					}}
					className="w-[100%] mx-auto"
				>
					{images.map((img, index) => (
						<SwiperSlide key={`img-${img.src}-${index}`}>
							<div className="rounded-xl overflow-hidden w-full aspect-[3/4]">
								{loading ? (
									<div className="w-full h-full bg-gray-100 flex items-center justify-center">
										Loading...
									</div>
								) : (
									<Image
										src={img.src}
										alt={img.alt ?? ""}
										width={800}
										height={600}
										sizes="(max-width: 768px) 100vw, 25vw"
										className="w-full h-full object-cover rounded-xl transition-opacity duration-300"
									/>
								)}
							</div>
						</SwiperSlide>
					))}
				</Swiper>
				<div className="pointer-events-none select-none">
					<motion.div
						className="pro-prev absolute top-1/2 left-[-55px] -translate-y-1/2 z-10 "
						variants={buttonVariants}
						initial="rest"
						whileHover="hover"
						whileTap="pressed"
					>
						<button
							type="button"
							aria-label="Previous"
							className="pointer-events-auto bg-white shadow-lg w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-btn"
						>
							<Image
								src="/arrow.png"
								alt="Prev"
								width={100}
								height={100}
								className="w-14 h-14 rotate-180 mr-1"
								draggable={false}
							/>
						</button>
					</motion.div>

					<motion.div
						className="pro-next absolute top-1/2 right-[-55px] -translate-y-1/2 z-10 "
						variants={buttonVariants}
						initial="rest"
						whileHover="hover"
						whileTap="pressed"
					>
						<button
							type="button"
							aria-label="Next"
							className="pointer-events-auto bg-white shadow-lg w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-btn"
						>
							<Image
								src="/arrow.png"
								alt="Next"
								width={100}
								height={100}
								className="w-14 h-14 ml-1"
								draggable={false}
							/>
						</button>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
