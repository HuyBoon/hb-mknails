"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const fallbackImages = [
	{ src: "/promotions/allpack.png", alt: "All Packages" },
	{ src: "/promotions/headspa.png", alt: "Head Spa" },
	{ src: "/promotions/waxing.png", alt: "Waxing" },
	{ src: "/promotions/deluxe.png", alt: "Deluxe" },
];

export default function PromotionsSection() {
	return (
		<section
			className="relative w-full mx-auto py-12 md:py-16 lg:py-24 px-4 sm:px-6 md:px-12 bg-gray-700 bg-cover bg-center"
			style={{ backgroundImage: `url(/separate.png)` }}
		>
			<div className="max-w-[1440px] mx-auto">
				<div className="text-center px-6 py-3 sm:py-4 rounded-2xl bg-btn border border-white mb-8 sm:mb-12 mx-auto w-fit shadow-md">
					<Link href={"/promotions"}>
						<h2 className="text-white uppercase text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide">
							Promotions
						</h2>
					</Link>
				</div>

				{/* Swiper */}
				<div className="relative mx-auto">
					<Swiper
						modules={[Navigation]}
						navigation={{
							prevEl: ".pro-prev",
							nextEl: ".pro-next",
						}}
						speed={2000}
						breakpoints={{
							0: {
								slidesPerView: 1,
								spaceBetween: 10,
							},
							480: {
								slidesPerView: 1,
								spaceBetween: 12,
							},
							640: {
								slidesPerView: 2,
								spaceBetween: 16,
							},
							768: {
								slidesPerView: 2,
								spaceBetween: 18,
							},
							1024: {
								slidesPerView: 3,
								spaceBetween: 20,
							},
							1280: {
								slidesPerView: 4,
								spaceBetween: 24,
							},
							1536: {
								slidesPerView: 4,
								spaceBetween: 28,
							},
						}}
						className="w-full"
					>
						{fallbackImages.map((img, index) => (
							<SwiperSlide key={`promo-${index}`}>
								<div className="block relative rounded-xl overflow-hidden group aspect-[3/4] shadow-md border-4 border-white">
									<Image
										src={img.src}
										alt={img.alt ?? ""}
										width={800}
										height={600}
										sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 20vw"
										className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105 group-hover:brightness-95"
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					<div className="hidden sm:block absolute top-1/2 sm:left-[-20px] md:left-[-25px] lg:left-[-50px] -translate-y-1/2 z-10">
						<button
							type="button"
							aria-label="Previous"
							className="pro-prev bg-white shadow-lg w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-btn hover:text-white"
						>
							<Image
								src="/arrow.png"
								alt="Previous"
								width={40}
								height={40}
								className="w-4 h-4 lg:w-6 lg:h-6 rotate-180 mr-1"
								draggable={false}
							/>
						</button>
					</div>

					<div className="hidden sm:block absolute top-1/2 sm:right-[-20px] md:right-[-25px] lg:right-[-50px] -translate-y-1/2 z-10">
						<button
							type="button"
							aria-label="Next"
							className="pro-next bg-white shadow-lg w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-btn hover:text-white"
						>
							<Image
								src="/arrow.png"
								alt="Next"
								width={40}
								height={40}
								className="w-4 h-4 lg:w-6 lg:h-6 ml-1"
								draggable={false}
							/>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
