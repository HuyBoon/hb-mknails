"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { servicesData } from "@/utils/data/servicesData";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { ServiceItem } from "@/types/types";

const ServicePageContent = () => {
	const searchParams = useSearchParams();
	const categoryParam = searchParams.get("category") || "hand";
	const [activeCategory, setActiveCategory] = useState(categoryParam);

	useEffect(() => {
		setActiveCategory(categoryParam);
	}, [categoryParam]);

	const categories = Object.keys(servicesData);

	const handleAddToCart = (item: ServiceItem) => {
		console.log(`Added ${item.name} to cart`);
		// Implement actual cart logic here
	};

	return (
		<div className="flex flex-col min-h-screen py-6 px-4 sm:px-6 lg:px-12 bg-gray-50">
			<h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
				MK's Services
			</h1>

			{/* Swiper Topbar */}
			<div className="relative mb-6 sm:mb-8">
				<Swiper
					// modules={[Navigation]}
					// navigation={{
					// 	nextEl: ".swiper-button-next",
					// 	prevEl: ".swiper-button-prev",
					// }}
					// spaceBetween={8}
					slidesPerView="auto"
					centeredSlides={false}
					className="w-full max-w-7xl " // Center Swiper with max-width
				>
					<div className="flex justify-center">
						{categories.map((key) => (
							<SwiperSlide key={key} className="!w-auto mx-auto">
								<button
									onClick={() => {
										setActiveCategory(key);
									}}
									className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border transition-all duration-300 ${
										activeCategory === key
											? "bg-primary text-white border-primary shadow-sm"
											: "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
									}`}
								>
									<Image
										src={servicesData[key].image}
										alt={servicesData[key].title}
										width={20}
										height={20}
										className="rounded-sm hidden sm:inline-block"
									/>
									<span className="font-medium text-sm sm:text-base">
										{servicesData[key].title}
									</span>
								</button>
							</SwiperSlide>
						))}
					</div>
					{/* <div className="swiper-button-prev !text-gray-600 !w-8 !h-8 after:!text-sm hidden lg:block" />
					<div className="swiper-button-next !text-gray-600 !w-8 !h-8 after:!text-sm hidden lg:block" /> */}
				</Swiper>
			</div>

			{/* Content */}
			<div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 rounded-xl shadow-lg bg-white p-4 sm:p-6 lg:p-8">
				<div className="lg:col-span-5">
					<Image
						src={servicesData[activeCategory].image}
						alt={servicesData[activeCategory].title}
						width={800}
						height={600}
						className="bg-white object-cover rounded-2xl w-[300px] sm:w-[400px] aspect-[3/4]"
						priority
					/>
				</div>
				<div className="lg:col-span-7">
					<h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
						{servicesData[activeCategory].title} Services
					</h3>
					<ul className="space-y-1 sm:space-y-2">
						{servicesData[activeCategory].items.map((item, idx) => (
							<li
								key={idx}
								className="flex items-center justify-between border-b py-3 gap-2"
							>
								<div>
									<span className="text-base sm:text-lg text-gray-700">
										{item.name}
									</span>
									{item.description && (
										<p className="text-sm text-gray-500">{item.description}</p>
									)}
								</div>
								<div className="flex items-center gap-4">
									<span className="text-base font-bold text-gray-500">
										{typeof item.price === "number"
											? `$${item.price}`
											: item.price}
									</span>
									{/* <button
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors duration-200 text-sm sm:text-base"
                  >
                    <Plus size={16} />
                  </button> */}
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ServicePageContent;
