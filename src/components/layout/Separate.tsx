"use client";

import Image from "next/image";

export default function Separate() {
	return (
		<div className="w-full ">
			<Image
				src="/shoping.png"
				alt="Desktop Banner"
				width={1400}
				height={300}
				className="object-cover object-center mx-auto"
				priority
			/>
		</div>
	);
}
