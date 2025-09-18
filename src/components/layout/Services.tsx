"use client";

import React, { useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

interface Service {
	key: string;
	title: string;
	imageHome: string;
	image: string;
	items: { name: string; price: number | string; description?: string }[];
}

interface ServicesProps {
	services: Service[];
}

const Services = ({ services }: ServicesProps) => {
	const [activeIndex, setActiveIndex] = useState(1);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const router = useRouter();

	const handleMouseEnter = (index: number) => {
		setHoveredIndex(index);
		if (typeof window !== "undefined" && window.innerWidth <= 768) {
			setTimeout(() => {
				setHoveredIndex(null);
			}, 1000);
		}
	};

	const handleMouseLeave = () => {
		if (typeof window !== "undefined" && window.innerWidth > 768) {
			setHoveredIndex(null);
		}
	};

	const handleClick = useCallback(
		(index: number) => {
			const categoryKey = services[index].key;
			router.push(`/services?category=${categoryKey}`);
			setHoveredIndex(index);
			if (typeof window !== "undefined" && window.innerWidth <= 768) {
				setTimeout(() => setHoveredIndex(null), 1000);
			}
		},
		[router, services]
	);

	return (
		<section className="relative max-w-[1400px] w-full mx-auto pt-12 md:pt-16 lg:pt-24 px-4 sm:px-6 md:px-12">
			<motion.div
				initial={{ opacity: 0, y: -40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
				viewport={{ once: false }}
				className="absolute left-1/2 transform -translate-x-1/2 text-center px-8 py-2 rounded-2xl bg-btn border border-white z-30"
			>
				<Link href={"/services"}>
					<h2 className="text-white uppercase text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold">
						Services
					</h2>
				</Link>
			</motion.div>

			<div className="relative w-full px-3 overflow-visible">
				<div className="relative min-h-[350px] xs:min-h-[420px] sm:min-h-[450px] md:min-h-[600px]">
					<Swiper
						onSlideChange={(swiper) => setActiveIndex(swiper.realIndex + 1)}
						modules={[Navigation]}
						navigation={{
							nextEl: ".card2-next",
							prevEl: ".card2-prev",
						}}
						speed={1000}
						initialSlide={0}
						breakpoints={{
							320: { slidesPerView: 2, spaceBetween: 8 },
							640: { slidesPerView: 2, spaceBetween: 12 },
							1024: { slidesPerView: 3, spaceBetween: 24 },
							1280: { slidesPerView: 3, spaceBetween: 32 },
						}}
						className="w-[100%] mx-auto mb-12"
					>
						{services.map((cat, idx) => {
							const isActive = idx === activeIndex;
							const isHovered = idx === hoveredIndex;

							return (
								<SwiperSlide key={cat.key}>
									<motion.div
										initial={{ opacity: 0, scale: 0.9, y: 40 }}
										whileInView={{ opacity: 1, scale: 1, y: 0 }}
										transition={{
											duration: 0.8,
											delay: idx * 0.15,
											ease: [0.25, 0.46, 0.45, 0.94],
										}}
										viewport={{ once: false }}
										className="mt-24 lg:mt-0 group relative h-full transition-all duration-1000 ease-in-out cursor-pointer will-change-transform"
										onMouseEnter={() => handleMouseEnter(idx)}
										onMouseLeave={handleMouseLeave}
										onClick={() => handleClick(idx)}
									>
										<div
											className={`aspect-[3/4] overflow-hidden rounded-2xl border-white transition-all duration-500 shadow-md border-2 ${
												isActive ? "lg:mt-22" : "mt-0"
											} group-hover:shadow-xl`}
										>
											<div
												className={`relative w-full h-full transition-all duration-500 ${
													isHovered ? "shine-effect" : ""
												}`}
											>
												<Image
													src={cat.imageHome}
													alt={cat.title}
													width={800}
													height={600}
													sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 20vw"
													className="object-cover rounded-2xl w-full h-full transition-transform duration-500 group-hover:scale-105 group-hover:brightness-95"
													priority={idx < 3} // Prioritize first 3 images
												/>
											</div>
										</div>
									</motion.div>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>

				<div className="hidden sm:block absolute top-1/2 sm:left-[-20px] md:left-[-25px] lg:left-[-50px] -translate-y-1/2 z-10">
					<button
						className={`card2-prev bg-white shadow-lg w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
							activeIndex === 1
								? "opacity-50 cursor-not-allowed"
								: "hover:bg-btn hover:text-white cursor-pointer"
						}`}
						disabled={activeIndex === 1}
					>
						<Image
							src="/arrow.png"
							alt="Previous"
							width={40}
							height={40}
							className="w-8 h-8 lg:w-10 lg:h-10 rotate-180 mr-1"
							draggable={false}
						/>
					</button>
				</div>

				<div className="hidden sm:block absolute top-1/2 sm:right-[-20px] md:right-[-25px] lg:right-[-50px] -translate-y-1/2 z-10">
					<button
						className={`card2-next bg-white shadow-lg w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
							activeIndex === services.length - 2
								? "opacity-50 cursor-not-allowed"
								: "hover:bg-btn hover:text-white cursor-pointer"
						}`}
						disabled={activeIndex === services.length - 2}
					>
						<Image
							src="/arrow.png"
							alt="Next"
							width={40}
							height={40}
							className="w-8 h-8 lg:w-10 lg:h-10 ml-1"
							draggable={false}
						/>
					</button>
				</div>
			</div>
		</section>
	);
};

export default Services;
