"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Separate() {
	return (
		<div className="max-w-[1200px] mx-auto rounded-2xl overflow-hidden bg-transparent relative">
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
				viewport={{ once: false }}
				className="w-[90%] mx-auto relative"
			>
				<Image
					src="/bannerMiddle.png"
					alt="Desktop Banner"
					width={1920}
					height={400}
					className="w-full h-[90px] sm:h-full object-cover aspect-[1920/400] rounded-tl-2xl sm:rounded-tl-[35px] rounded-br-2xl sm:rounded-br-[35px] border-2 border-white shadow-lg object-center mx-auto"
					priority
				/>

				{/* Overlay chữ */}
				<div className="absolute inset-0 flex flex-col  justify-center text-white px-4">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: false }}
						className="mt-4 ml-[5%] xl:ml-[10%] font-mrDafoe text-2xl sm:text-4xl xl:text-[60px] text-[#564229] font-semibold text-left"
					>
						We are here
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.5 }}
						viewport={{ once: false }}
						className="ml-[5%] xl:ml-[10%]  font-mrDafoe text-[#564229]  text-sm sm:text-xl text-left xl:text-[40px] max-w-[1200px]"
					>
						to make every visit a comfortable and confidence-boosting experience
					</motion.p>
				</div>
			</motion.div>
		</div>
	);
}
