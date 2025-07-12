"use client";

import Image from "next/image";

export default function GreenSlogan() {
	return (
		<div className="relative w-full h-auto">
			<div className="aspect-[16/9] overflow-hidden hidden md:block">
				<Image
					src="/separate.png"
					alt="Desktop Banner"
					width={1200}
					height={800}
					className=" w-full object-cover"
					priority
				/>
			</div>
		</div>
	);
}
