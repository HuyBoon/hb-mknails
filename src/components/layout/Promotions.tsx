"use client";

import Image from "next/image";
import React from "react";

export default function PromotionsSection() {
	return (
		<section
			className="w-full mx-auto py-24 px-4 md:px-16 bg-cover bg-center"
			style={{
				backgroundImage: `url(/separate.png)`,
			}}
		>
			<div className="relative mx-auto max-w-[1440px]">
				<div className="w-full mx-auto grid grid-cols-1 md:grid-cols-12">
					<div className="w-full md:col-span-5 flex flex-col items-center">
						<div className="text-center px-10 py-5 rounded-2xl bg-btn border border-white mb-12">
							<h2 className="text-white uppercase text-[50px] font-bold">
								Promotions
							</h2>
						</div>
						<div className="rounded-xl overflow-hidden">
							<Image
								src="/promotions/allpack.png"
								alt="All Packages"
								width={800}
								height={600}
								className="w-[400px] aspect-[4/3]"
							/>
						</div>
					</div>
					<div className="w-full md:col-span-7 flex flex-col">
						<div className="ml-24  overflow-hidden mb-12">
							<Image
								src="/promotions/headspa.png"
								alt="Head Spa"
								width={800}
								height={600}
								className="w-[400px]  aspect-[4/3] rounded-xl"
							/>
						</div>
						<div className="ml-48 overflow-hidden">
							<Image
								src="/promotions/waxing.png"
								alt="Waxing"
								width={800}
								height={600}
								className="w-[400px] aspect-[4/3] rounded-xl"
							/>
						</div>
					</div>
				</div>
				<div className="absolute bottom-[-15%] left-[15%]">
					<Image
						src="/package.png"
						alt="Spa items"
						width={800}
						height={600}
						className="w-[450px] object-cover  aspect-[4/3]"
					/>
				</div>
			</div>
		</section>
	);
}
