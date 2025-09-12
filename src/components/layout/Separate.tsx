"use client";

import Image from "next/image";

export default function Separate() {
	return (
		<div className="max-w-[1200px] mx-auto rounded-full overflow-hidden bg-transparent">
			<div className="w-[90%] mx-auto">
				<Image
					src="/shoping.png"
					alt="Desktop Banner"
					width={1400}
					height={300}
					className="object-cover  object-center mx-auto"
					priority
				/>
			</div>
		</div>
	);
}
