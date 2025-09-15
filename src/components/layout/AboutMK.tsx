"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const AboutMK = () => {
	const images = [
		{ id: 1, src: "/shop/6.jpg", alt: "Spa Interior 1" },
		{ id: 2, src: "/shop/2.jpg", alt: "Spa Interior 2" },
		{ id: 3, src: "/shop/4.jpg", alt: "Spa Interior 3" },
	];

	// Animation variants for images
	const imageVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: (i: any) => ({
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.6,
				delay: i * 0.2,
			},
		}),
	};

	return (
		<section className="w-full">
			<div
				className="w-full bg-cover bg-center bg-no-repeat mx-auto"
				style={{ backgroundImage: `url(/bg-default.png)` }}
			>
				<div className="max-w-[1400px] py-8 px-4 sm:px-6 md:px-12 w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-center">
					<motion.div
						initial={{ opacity: 0, x: -10 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: false, amount: 0.3 }}
						transition={{ duration: 0.8 }}
						className="lg:col-span-5 h-full  flex"
					>
						<div className="grid grid-cols-3 grid-rows-2 gap-4 w-full h-full">
							{/* Ảnh lớn */}
							<motion.div
								className="col-span-2 row-span-2 relative overflow-hidden rounded-2xl shadow-md group "
								variants={imageVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: false, amount: 0.3 }}
								custom={2}
							>
								<Image
									src={images[0].src}
									alt={images[0].alt}
									fill
									className="h-full object-cover transition-transform duration-500 group-hover:scale-110"
								/>
							</motion.div>

							{/* Ảnh nhỏ 1 */}
							<motion.div
								className="col-start-3 row-start-1 relative overflow-hidden rounded-2xl shadow-md group aspect-[1/1]"
								variants={imageVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: false, amount: 0.3 }}
								custom={0}
							>
								<Image
									src={images[1].src}
									alt={images[1].alt}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-110"
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 25vw, 16vw"
								/>
							</motion.div>

							{/* Ảnh nhỏ 2 */}
							<motion.div
								className="col-span-1 sm:col-start-3 sm:row-start-2 relative overflow-hidden rounded-2xl shadow-md group aspect-[1/1]"
								variants={imageVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: false, amount: 0.3 }}
								custom={1}
							>
								<Image
									src={images[2].src}
									alt={images[2].alt}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-110"
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 25vw, 16vw"
								/>
							</motion.div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 10 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: false, amount: 0.3 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="lg:col-span-7 text-center lg:text-left flex flex-col justify-center"
					>
						<div className="overflow-hidden rounded-2xl shadow-md aspect-[725/300] w-full max-w-[725px] mx-auto lg:mx-0">
							<Image
								src={"/sologan.png"}
								alt="Sologan-MK NAL & SPA"
								width={725}
								height={300}
								className="w-full h-full object-cover"
								sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 725px"
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default AboutMK;
