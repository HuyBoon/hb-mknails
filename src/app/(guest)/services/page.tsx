"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { servicesData } from "@/utils/data/servicesData";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Menu, X, ShoppingCart, Plus } from "lucide-react";
import { ServiceItem } from "@/types/types";

const ServicePage = () => {
	const searchParams = useSearchParams();
	const categoryParam = searchParams.get("category") || "hand";
	const [activeCategory, setActiveCategory] = useState(categoryParam);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

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
										setIsMenuOpen(false);
									}}
									className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border transition-all duration-300 ${
										activeCategory === key
											? "bg-pink-600 text-white border-pink-600 shadow-sm"
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

				{/* Mobile Menu Button */}
				<div className="md:hidden flex justify-between items-center mt-4">
					<h2 className="text-xl font-semibold text-gray-800">
						{servicesData[activeCategory].title}
					</h2>
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="p-2 rounded-md hover:bg-gray-100"
					>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Mobile Slide Menu */}
				<div
					className={`md:hidden fixed top-0 left-0 w-64 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ${
						isMenuOpen ? "translate-x-0" : "-translate-x-full"
					}`}
				>
					<div className="p-4">
						<button
							onClick={() => setIsMenuOpen(false)}
							className="mb-4 p-2 rounded-md hover:bg-gray-100"
						>
							<X size={24} />
						</button>
						<div className="flex flex-col gap-2">
							{categories.map((key) => (
								<button
									key={key}
									onClick={() => {
										setActiveCategory(key);
										setIsMenuOpen(false);
									}}
									className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium ${
										activeCategory === key
											? "bg-pink-600 text-white"
											: "text-gray-700 hover:bg-gray-100"
									}`}
								>
									{servicesData[key].title}
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Overlay for Mobile Menu */}
				{isMenuOpen && (
					<div
						className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
						onClick={() => setIsMenuOpen(false)}
					/>
				)}
			</div>

			{/* Content */}
			<div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 rounded-xl shadow-lg bg-white p-4 sm:p-6 lg:p-8">
				<div className="lg:col-span-5">
					<Image
						src={servicesData[activeCategory].image}
						alt={servicesData[activeCategory].title}
						width={800}
						height={600}
						className="object-cover rounded-2xl w-full h-full max-h-[300px] sm:max-h-[400px] lg:max-h-[500px]"
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

export default ServicePage;
