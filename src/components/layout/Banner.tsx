"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const desktopImages = Array.from({ length: 4 }, (_, i) => ({
	src: `/banners/${i + 1}.svg`,
	alt: `Promotion Banner Desktop ${i + 1} | YourBrand`,
}));

const mobileImages = Array.from({ length: 4 }, (_, i) => ({
	src: `/banners/${i + 1}.png`,
	alt: `Promotion Banner Mobile ${i + 1} | YourBrand`,
}));

const Banner = () => {
	return (
		<section
			className="relative w-full"
			aria-label="Promotional banners carousel"
		>
			{/* Desktop (16:9 ratio) */}
			<div className="relative hidden md:block w-full aspect-[16/9]">
				<Swiper
					modules={[Autoplay]}
					autoplay={{ delay: 10000, disableOnInteraction: false }}
					loop
					className="h-full w-full"
				>
					{desktopImages.map((img, index) => (
						<SwiperSlide key={index}>
							<div className="relative w-full h-full">
								<Image
									src={img.src}
									alt={img.alt}
									fill
									className="object-cover"
									priority={index === 0}
									sizes="100vw"
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			{/* Mobile (4:5 ratio để không bị dọc quá dài) */}
			<div className="relative md:hidden w-full aspect-[1/1]">
				<Swiper
					modules={[Autoplay]}
					autoplay={{ delay: 10000, disableOnInteraction: false }}
					loop
					className="h-full w-full"
				>
					{mobileImages.map((img, index) => (
						<SwiperSlide key={index}>
							<div className="relative w-full h-full">
								<Image
									src={img.src}
									alt={img.alt}
									fill
									className="object-cover"
									priority={index === 0}
									sizes="100vw"
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default Banner;
