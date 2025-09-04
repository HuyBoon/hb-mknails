"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { servicesData } from "@/utils/data/servicesData";

const Services = () => {
	const [activeIndex, setActiveIndex] = useState(1);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const router = useRouter();

	const categories = Object.values(servicesData);

	return (
		<section className="relative container w-full mx-auto z-20 py-24">
			{/* Title */}
			<div className="absolute left-1/2 transform -translate-x-1/2 text-center px-10 py-5 rounded-2xl bg-btn border border-white z-30">
				<h2 className="text-white uppercase text-[50px] font-bold">Services</h2>
			</div>

			<div className="relative w-full px-3 overflow-visible">
				<Swiper
					onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
					modules={[Navigation]}
					slidesPerView={1}
					centeredSlides
					loop
					navigation={{
						nextEl: ".card2-next",
						prevEl: ".card2-prev",
					}}
					speed={1500}
					spaceBetween={30}
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

				{/* Prev/Next Buttons */}
				{/* Prev/Next Buttons */}
				<div className="absolute top-1/2 left-[5px] -translate-y-1/2 z-10">
					<button className="card2-prev bg-white cursor-pointer shadow-lg w-12 h-12 rounded-full flex items-center justify-center hover:bg-btn hover:text-white transition-all duration-300">
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
					<button className="card2-next bg-white cursor-pointer shadow-lg w-12 h-12 rounded-full flex items-center justify-center hover:bg-btn hover:text-white transition-all duration-300">
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
