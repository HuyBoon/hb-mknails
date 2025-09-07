"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { servicesData } from "@/utils/data/servicesData";
import Link from "next/link";

const Services = () => {
	const [activeIndex, setActiveIndex] = useState(1);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const router = useRouter();

	const categories = Object.values(servicesData);

	return (
		<section className="relative max-w-[1400px] w-full mx-auto z-20 py-24">
			{/* Title */}
			<div className="absolute left-1/2 transform -translate-x-1/2 text-center px-10 py-5 rounded-2xl bg-btn border border-white z-30">
				<Link
					href={"/services"}
					className="block text-white uppercase text-[50px] font-bold"
				>
					Services
				</Link>
			</div>

			<div className="relative w-full px-3 overflow-visible">
				<div className="relative h-[600px]">
					<Swiper
						onSlideChange={(swiper) => setActiveIndex(swiper.realIndex + 1)}
						modules={[Navigation]}
						// centeredSlides
						navigation={{
							nextEl: ".card2-next",
							prevEl: ".card2-prev",
						}}
						speed={2000}
						spaceBetween={30}
						initialSlide={0}
						breakpoints={{
							480: { slidesPerView: 1 },
							768: { slidesPerView: 3 },
						}}
						className="w-[90%] mx-auto mb-[50px]"
					>
						{categories.map((cat, idx) => {
							const isActive = idx === activeIndex;
							const isHovered = idx === hoveredIndex;

							return (
								<SwiperSlide key={cat.key}>
									<div
										className="group relative h-full transition-all duration-500 ease-in-out cursor-pointer"
										onMouseEnter={() => setHoveredIndex(idx)}
										onMouseLeave={() => setHoveredIndex(null)}
										onClick={() => router.push(`/services?category=${cat.key}`)}
									>
										<div
											className={`aspect-[3/4] overflow-hidden rounded-2xl border border-white transition-all duration-500 ${
												isActive ? "mt-[100px]" : "mt-0"
											}`}
										>
											<Image
												src={cat.imageHome}
												alt={cat.title}
												width={800}
												height={600}
												className="object-cover rounded-2xl w-full h-full"
											/>
										</div>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>

				<div className="absolute top-1/2 left-[5px] -translate-y-1/2 z-10">
					<button
						className={`card2-prev bg-white shadow-lg w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
							activeIndex === 1
								? "opacity-50 cursor-not-allowed"
								: "hover:bg-btn hover:text-white cursor-pointer"
						}`}
						disabled={activeIndex === 1}
					>
						<Image
							src="/arrow.png"
							alt="Previous"
							width={100}
							height={100}
							className="w-14 h-14 rotate-180 mr-1"
						/>
					</button>
				</div>

				<div className="absolute top-1/2 right-[5px] -translate-y-1/2 z-10">
					<button
						className={`card2-next bg-white shadow-lg w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
							activeIndex === categories.length - 2
								? "opacity-50 cursor-not-allowed"
								: "hover:bg-btn hover:text-white cursor-pointer"
						}`}
						disabled={activeIndex === categories.length - 2}
					>
						<Image
							src="/arrow.png"
							alt="Next"
							width={100}
							height={100}
							className="w-14 h-14 ml-1"
						/>
					</button>
				</div>
			</div>
		</section>
	);
};

export default Services;
