"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { servicesData } from "@/utils/data/servicesData";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { ServiceItem } from "@/types/types";
import { motion, AnimatePresence } from "framer-motion";

const ServicePageContent = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const categoryParam = searchParams.get("category");

	const [activeCategory, setActiveCategory] = useState<string | null>(
		categoryParam || null
	);
	const [showServices, setShowServices] = useState<boolean>(!!categoryParam);

	const servicesRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (categoryParam) {
			setActiveCategory(categoryParam);
			setShowServices(true);
		} else {
			setActiveCategory(null);
			setShowServices(false);
		}
	}, [categoryParam]);

	useEffect(() => {
		if (!showServices || !activeCategory) return;

		const tryScroll = () => {
			const el =
				servicesRef.current ?? document.getElementById("services-section");
			if (el) {
				el.scrollIntoView({ behavior: "smooth" });
				return true;
			}
			return false;
		};

		if (!tryScroll()) {
			const raf = requestAnimationFrame(() => tryScroll());
			const t = setTimeout(() => tryScroll(), 120);
			return () => {
				cancelAnimationFrame(raf);
				clearTimeout(t);
			};
		}
	}, [showServices, activeCategory]);

	const categories = Object.keys(servicesData);

	const handleCategoryClick = (key: string) => {
		setActiveCategory(key);
		setShowServices(true);

		const url = new URL(window.location.href);
		url.searchParams.set("category", key);
		router.replace(`${url.pathname}?${url.searchParams.toString()}`, {
			scroll: false,
		});
	};

	const handleAddToCart = (item: ServiceItem) => {
		console.log(`Added ${item.name} to cart`);
	};

	return (
		<div className="flex flex-col ">
			{/* Phần trên */}
			<motion.div
				className="w-full py-12 md:py-16 lg:py-24 px-4 sm:px-6 md:px-12 flex items-center justify-center"
				style={{
					backgroundImage: `url(/bannerservicepage.png)`,
					backgroundPosition: "center",
					backgroundSize: "cover",
				}}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<div className="max-w-[1400px] mx-auto ">
					<motion.h2
						className="text-2xl sm:text-4xl md:text-4xl font-bold text-btn mb-8 sm:mb-12 text-center font-cinzel-decorative"
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						Indulge in Luxury Nail & Spa Care
					</motion.h2>
					<div className="flex flex-wrap -mx-2 gap-y-4 justify-center">
						<motion.div
							className="px-2 w-1/2  sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-[250px] 2xl:w-[300px]"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.3 }}
						>
							<div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
								<Image
									src="/servicepage/mk.png"
									alt="MK's Services"
									width={1920}
									height={1080}
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
									className="object-cover w-full h-full aspect-[4/3]"
								/>
								<div className="absolute inset-0 flex items-center justify-center">
									<h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black uppercase text-center">
										Our Services
									</h2>
								</div>
							</div>
						</motion.div>

						{categories.map((key, index) => (
							<motion.div
								key={key}
								className="px-2  w-1/2  sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-[250px] 2xl:w-[300px]"
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
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
										className="object-cover w-full mx-auto transition-transform duration-300 group-hover:scale-105"
									/>
									<div
										className={`absolute inset-0 flex items-center justify-center transition-colors ${
											activeCategory === key ? "bg-black/30" : "bg-black/40"
										}`}
									>
										<span
											className={`text-white uppercase font-semibold text-xl sm:text-2xl md:text-3xl text-center ${
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

			{/* Section dưới */}
			{showServices && activeCategory && (
				<motion.div
					id="services-section"
					ref={servicesRef}
					className="pt-20 sm:pt-18 lg:pt-24 mt-[-48px]"
					initial={{ y: 0, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 1 }}
				>
					<motion.div
						className="relative mb-4 sm:mb-6 lg:mb-12"
						initial={{ x: -50, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<Swiper
							slidesPerView="auto"
							centeredSlides={false}
							spaceBetween={8}
							className="w-[90%] max-w-7xl mx-auto"
						>
							<div className="flex justify-center">
								{categories.map((key, index) => (
									<SwiperSlide key={key} className="!w-auto mx-auto">
										<motion.button
											onClick={() => handleCategoryClick(key)}
											className={`flex items-center gap-2 px-4 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full border transition-all duration-300 ${
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
												className="rounded-sm hidden sm:inline-block w-4 h-4 sm:w-5 sm:h-5"
												sizes="(max-width: 640px) 0vw, 5vw"
											/>
											<span className="font-medium text-sm sm:text-sm md:text-base">
												{servicesData[key].title}
											</span>
										</motion.button>
									</SwiperSlide>
								))}
							</div>
						</Swiper>
					</motion.div>

					<AnimatePresence mode="wait">
						<motion.div
							key={activeCategory}
							style={{
								backgroundImage: `url(/background.png)`,
								backgroundPosition: "center",
								backgroundSize: "cover",
							}}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
							transition={{ duration: 0.5 }}
						>
							<div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-12 px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-12">
								<div className=" lg:col-span-5 w-full flex flex-col gap-14">
									<motion.div
										initial={{ scale: 0.9, opacity: 0 }}
										animate={{ scale: 1, opacity: 1 }}
										transition={{ duration: 0.5 }}
									>
										<Image
											src={servicesData[activeCategory].image}
											alt={servicesData[activeCategory].title}
											width={600}
											height={800}
											sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
											className="aspect-[5/4] md:aspect-[3/4] object-cover rounded-2xl mx-auto shadow-2xl w-full max-w-[500px] lg:w-[350px] "
											priority
										/>
									</motion.div>
									{servicesData[activeCategory].imagePage && (
										<div className="relative hidden md:block">
											<motion.div
												initial={{ scale: 0.9, opacity: 0 }}
												animate={{ scale: 1, opacity: 1 }}
												transition={{ duration: 0.5, delay: 0.1 }}
												className="relative xl:pl-16"
											>
												<Image
													src={servicesData[activeCategory].imagePage}
													alt={servicesData[activeCategory].title}
													width={400}
													height={457}
													sizes="(min-width: 640px) (max-width: 1024px) 50vw, 33vw"
													className="aspect-[3/4] object-cover lg:w-[350px] shadow-2xl rounded-2xl "
													priority
												/>
											</motion.div>
											<div className="absolute bottom-[-70%] left-[-5%]">
												<Image
													src="/package.png"
													alt="package"
													width={800}
													height={600}
													sizes="(max-width: 1024px) 50vw, 33vw"
													className=" lg:w-[400px] h-auto object-cover rounded-xl transition-opacity duration-300 blur-[1px]"
												/>
											</div>
										</div>
									)}
								</div>
								<motion.div
									className="lg:col-span-7 mt-6 lg:mt-0"
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.5, delay: 0.2 }}
								>
									<h3 className="text-lg sm:text-2xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">
										{servicesData[activeCategory].title}
									</h3>
									<ul className="space-y-2 sm:space-y-3">
										{servicesData[activeCategory].items.map((item, idx) => (
											<motion.li
												key={idx}
												className="flex items-center justify-between border-b py-2 sm:py-3 gap-2"
												initial={{ y: 20, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												transition={{ duration: 0.3, delay: 0.3 + idx * 0.1 }}
											>
												<div>
													<span className="text-sm sm:text-lg md:text-lg text-gray-700">
														{item.name}
													</span>
													{item.description && (
														<p className="text-xs sm:text-base text-gray-500">
															{item.description}
														</p>
													)}
												</div>
												<div className="flex items-center gap-2 sm:gap-4">
													<span className="text-sm sm:text-lg md:text-lg font-bold text-gray-800">
														{typeof item.price === "number"
															? `$${item.price}`
															: item.price}
													</span>
												</div>
											</motion.li>
										))}
									</ul>
								</motion.div>
							</div>
						</motion.div>
					</AnimatePresence>
				</motion.div>
			)}
		</div>
	);
};

export default ServicePageContent;
