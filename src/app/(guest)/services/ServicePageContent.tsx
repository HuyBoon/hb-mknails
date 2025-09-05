"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { servicesData } from "@/utils/data/servicesData";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { ServiceItem } from "@/types/types";
import { motion, AnimatePresence } from "framer-motion";

const ServicePageContent = () => {
	const searchParams = useSearchParams();
	const categoryParam = searchParams.get("category") || "hand";
	const [activeCategory, setActiveCategory] = useState(categoryParam);
	const [showServices, setShowServices] = useState(!!categoryParam);

	useEffect(() => {
		setActiveCategory(categoryParam);
		if (categoryParam) {
			setShowServices(true);
			document
				.getElementById("services-section")
				?.scrollIntoView({ behavior: "smooth" });
		}
	}, [categoryParam]);

	const categories = Object.keys(servicesData);

	const handleCategoryClick = (key: string) => {
		setActiveCategory(key);
		setShowServices(true);
		setTimeout(() => {
			document
				.getElementById("services-section")
				?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	};

	const handleAddToCart = (item: ServiceItem) => {
		console.log(`Added ${item.name} to cart`);
	};

	return (
		<div className="flex flex-col bg-gray-50">
			<motion.div
				className="w-full h-screen flex items-center justify-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<motion.h2
						className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center"
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						Our Services
					</motion.h2>
					<div className="flex flex-wrap -mx-3 gap-y-4 justify-between px-18 pb-18">
						<motion.div
							className="px-3 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.3 }}
						>
							<div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
								<Image
									src="/banner.png"
									alt="MK's Services"
									width={600}
									height={800}
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-black/40 flex items-center justify-center">
									<h2 className="text-xl sm:text-2xl font-bold text-white text-center">
										MK&apos;s Services
									</h2>
								</div>
							</div>
						</motion.div>

						{categories.map((key, index) => (
							<motion.div
								key={key}
								className="px-3 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
								initial={{ scale: 0.9, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
							>
								<button
									onClick={() => handleCategoryClick(key)}
									className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
									aria-pressed={activeCategory === key}
									aria-label={servicesData[key].title}
								>
									<Image
										src={servicesData[key].image}
										alt={servicesData[key].title}
										width={600}
										height={800}
										className="object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									<div
										className={`absolute inset-0 flex items-center justify-center transition-colors ${
											activeCategory === key ? "bg-black/30" : "bg-black/40"
										}`}
									>
										<span
											className={`text-white font-semibold text-base sm:text-lg text-center ${
												activeCategory === key ? "text-yellow-300" : ""
											}`}
										>
											{servicesData[key].title}
										</span>
									</div>
								</button>
							</motion.div>
						))}
					</div>
				</div>
			</motion.div>

			<AnimatePresence>
				{showServices && (
					<motion.div
						id="services-section"
						className="pt-26"
						initial={{ y: 0, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 50, opacity: 0 }}
						transition={{ duration: 0.5 }}
					>
						<motion.div
							className="relative mb-6 sm:mb-8"
							initial={{ x: -50, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<Swiper
								slidesPerView="auto"
								centeredSlides={false}
								className="w-[90%] max-w-7xl"
							>
								<div className="flex justify-center">
									{categories.map((key, index) => (
										<SwiperSlide key={key} className="!w-auto mx-auto">
											<motion.button
												onClick={() => setActiveCategory(key)}
												className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border transition-all duration-300 ${
													activeCategory === key
														? "bg-[#f3dbc1]/50 text-black border-[#e5c9af] shadow-sm"
														: "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
												}`}
												initial={{ scale: 0.9, opacity: 0 }}
												animate={{ scale: 1, opacity: 1 }}
												transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
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
											</motion.button>
										</SwiperSlide>
									))}
								</div>
							</Swiper>
						</motion.div>

						<motion.div
							className="grid grid-cols-1 lg:grid-cols-12 bg-white px-4 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-12"
							style={{
								backgroundImage: `url(/background.png)`,
								backgroundPosition: "center",
							}}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<div className="lg:col-span-5 w-full">
								<motion.div
									initial={{ scale: 0.9, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									transition={{ duration: 0.5, delay: 0.5 }}
								>
									<Image
										src={servicesData[activeCategory].image}
										alt={servicesData[activeCategory].title}
										width={700}
										height={800}
										className="bg-white object-cover rounded-2xl w-[300px] sm:w-[400px] aspect-[7/8]"
										priority
									/>
								</motion.div>
								{servicesData[activeCategory].imagePage && (
									<motion.div
										initial={{ scale: 0.9, opacity: 0 }}
										animate={{ scale: 1, opacity: 1 }}
										transition={{ duration: 0.5, delay: 0.6 }}
									>
										<Image
											src={servicesData[activeCategory].imagePage}
											alt={servicesData[activeCategory].title}
											width={700}
											height={800}
											className="bg-white object-cover rounded-2xl w-[300px] sm:w-[400px] aspect-[7/8] mt-24 ml-8"
											priority
										/>
									</motion.div>
								)}
							</div>
							<motion.div
								className="lg:col-span-7"
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ duration: 0.5, delay: 0.7 }}
							>
								<h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
									{servicesData[activeCategory].title} Services
								</h3>
								<ul className="space-y-1 sm:space-y-2">
									{servicesData[activeCategory].items.map((item, idx) => (
										<motion.li
											key={idx}
											className="flex items-center justify-between border-b py-3 gap-2"
											initial={{ y: 20, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											transition={{ duration: 0.3, delay: 0.8 + idx * 0.1 }}
										>
											<div>
												<span className="text-base sm:text-lg text-gray-700">
													{item.name}
												</span>
												{item.description && (
													<p className="text-sm text-gray-500">
														{item.description}
													</p>
												)}
											</div>
											<div className="flex items-center gap-4">
												<span className="text-base font-bold text-gray-500">
													{typeof item.price === "number"
														? `$${item.price}`
														: item.price}
												</span>
											</div>
										</motion.li>
									))}
								</ul>
							</motion.div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ServicePageContent;
