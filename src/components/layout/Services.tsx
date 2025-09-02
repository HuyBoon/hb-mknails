"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
				<h1 className="text-white text-[50px] font-bold">SERVICES</h1>
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
					spaceBetween={15}
					breakpoints={{
						480: { slidesPerView: 1 },
						768: { slidesPerView: 3 },
					}}
					className="w-[85%] mx-auto mb-[50px]"
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
											isActive ? "mt-[80px]" : "mt-0"
										}`}
									>
										<Image
											src={cat.image}
											alt={cat.title}
											width={800}
											height={600}
											className="object-cover rounded-2xl w-full h-full"
										/>
									</div>
									<p className="text-center mt-3 font-semibold text-lg">
										{cat.title}
									</p>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>

				{/* Prev/Next Buttons */}
				<div className="absolute top-1/2 left-[15px] -translate-y-1/2 z-10">
					<button className="card2-prev bg-white cursor-pointer shadow-lg w-12 h-12 rounded-full flex items-center justify-center hover:bg-btn hover:text-white transition-all duration-300">
						<ArrowLeft className="w-6 h-6 hover:text-[#f2ecdb] text-bg-btn" />
					</button>
				</div>

				<div className="absolute top-1/2 right-[15px] -translate-y-1/2 z-10">
					<button className="card2-next bg-white cursor-pointer shadow-lg w-12 h-12 rounded-full flex items-center justify-center hover:bg-btn hover:text-white transition-all duration-300">
						<ArrowRight className="w-6 h-6 hover:text-[#f2ecdb] text-bg-btn" />
					</button>
				</div>
			</div>
		</section>
	);
};

export default Services;
