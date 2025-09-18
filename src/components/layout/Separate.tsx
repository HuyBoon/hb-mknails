"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Separate() {
	return (
		<motion.div
			initial={{ opacity: 0, x: -60 }}
			whileInView={{ opacity: 1, x: 0 }}
			transition={{ duration: 1 }}
			viewport={{ once: false }}
			className="mx-auto bg-[#f2ecdb]  overflow-hidden relative"
		>
			<Image
				src={"/sologannew.png"}
				width={1920}
				height={400}
				alt="sologan"
				className="object-cover aspect-[1920/400]"
			/>
		</motion.div>
	);
}
