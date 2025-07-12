import React from "react";
import Image from "next/image";

const Promotions = () => {
	return (
		<section className="relative container mx-auto mt-[-40%] py-10 px-4 md:px-16">
			<div className="grid grid-cols-1 md:grid-cols-12">
				<div className="w-full md:col-span-5 flex flex-col items-center">
					<div className=" bg-btn  px-6 py-2 rounded-full shadow-md mb-12">
						<h2 className="text-xl text-white font-semibold">Promotions</h2>
					</div>
					<div className="rounded-xl overflow-hidden ">
						<Image
							src="/promotions/allpack.png"
							alt="All Packages"
							width={800}
							height={600}
							className="w-[400px] h-auto aspect-[4/3] "
						/>
					</div>
				</div>
				<div className="w-full md:col-span-7 flex flex-col">
					<div className="ml-24 rounded-xl overflow-hidden mb-12">
						<Image
							src="/promotions/headspa.png"
							alt="Head Spa"
							width={800}
							height={600}
							className="w-[400px] h-auto aspect-[4/3]"
						/>
					</div>
					<div className="ml-48 rounded-xl overflow-hidden ">
						<Image
							src="/promotions/waxing.png"
							alt="Waxing"
							width={800}
							height={600}
							className="w-[400px] h-auto aspect-[4/3]"
						/>
					</div>
				</div>
			</div>
			<div className="absolute bottom-[0] left-[200px]">
				<Image
					src="/package.png"
					alt="Spa items"
					width={400}
					height={300}
					className="mx-auto mt-4"
				/>
			</div>
		</section>
	);
};

export default Promotions;
