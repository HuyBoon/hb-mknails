"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Separate() {
	return (
		<div className="mx-auto bg-[#f2ecdb]  overflow-hidden relative">
			<Image
				src={"/sologannew.png"}
				width={1920}
				height={400}
				alt="sologan"
				className="object-cover aspect-[1920/400]"
			/>
		</div>
	);
}
