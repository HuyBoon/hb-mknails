"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const desktopImages = Array.from({ length: 5 }, (_, i) => ({
	src: `/banners/${i + 1}.png`,
	alt: `Desktop Banner ${i + 1}`,
}));

const mobileImages = Array.from({ length: 5 }, (_, i) => ({
	src: `/banners/${i + 1}.png`,
	alt: `Mobile Banner ${i + 1}`,
}));

const Banner = () => {
	return (
		<section className="relative w-full h-auto">
			{/* Desktop (16:9) */}
			<div className="aspect-[3/2] overflow-hidden hidden md:block">
				<Swiper
					modules={[Autoplay, Pagination]}
					autoplay={{ delay: 4000, disableOnInteraction: false }}
					// pagination={{ clickable: true }}
					loop
					className="h-full w-full"
				>
					{desktopImages.map((img, index) => (
						<SwiperSlide key={index}>
							<Image
								src={img.src}
								alt={img.alt}
								width={1200}
								height={800}
								className="w-full h-full object-cover"
								priority={index === 0}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			{/* Mobile (9:16) */}
			<div className="aspect-[9/16] overflow-hidden md:hidden">
				<Swiper
					modules={[Autoplay, Pagination]}
					autoplay={{ delay: 3000, disableOnInteraction: false }}
					pagination={{ clickable: true }}
					loop
					className="h-full w-full"
				>
					{mobileImages.map((img, index) => (
						<SwiperSlide key={index}>
							<Image
								src={img.src}
								alt={img.alt}
								width={768}
								height={1366}
								className="w-full h-full object-cover"
								priority={index === 0}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default Banner;
