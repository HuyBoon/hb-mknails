import Image from "next/image";
import React from "react";

const AboutMK = () => {
	const images = [
		{ id: 1, src: "/shop/6.jpg", alt: "Spa Interior 1" },
		{ id: 2, src: "/shop/2.jpg", alt: "Spa Interior 2" },
		{ id: 3, src: "/shop/4.jpg", alt: "Spa Interior 3" },
	];

	return (
		<section className="w-full">
			<div
				className="w-full bg-cover bg-center bg-no-repeat aspect-[1440/400] min-h-[400px] flex items-center"
				style={{ backgroundImage: `url(/backgroundbanner.svg)` }}
			>
				<div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
					<div className="lg:col-span-5 h-full">
						<div className="grid grid-cols-3 grid-rows-2 gap-4 min-h-[300px] h-full">
							<div className="col-span-2 row-span-2 relative overflow-hidden rounded-2xl shadow-md">
								<Image
									src={images[0].src}
									alt={images[0].alt}
									fill
									className="object-cover"
								/>
							</div>

							{images.slice(1, 3).map((image) => (
								<div
									key={image.id}
									className="relative overflow-hidden rounded-2xl shadow-md"
								>
									<Image
										src={image.src}
										alt={image.alt}
										fill
										className="object-cover"
									/>
								</div>
							))}
						</div>
					</div>

					<div className="lg:col-span-7 text-center lg:text-left flex flex-col justify-center">
						<h2 className="font-baloo text-center text-2xl sm:text-3xl lg:text-5xl font-bold text-primary mb-2">
							MK NAILS & SPA
						</h2>
						<h2 className=" text-center font-baloo text-xl sm:text-2xl lg:text-3xl font-semibold text-primary mb-4">
							WELCOME
						</h2>
						<h3 className="text-center font-bold font-baloo text-2xl text-primary mb-4">
							We offer a wide range of services, including:
						</h3>
						<div className="flex items-center justify-center gap-4">
							<ul className="font-baloo font-bold items-center text-left list-disc list-inside text-primary text-lg ">
								<li>Hand</li>
								<li>Nail Extensions</li>
								<li>Foot</li>
							</ul>
							<ul className="font-baloo font-bold items-center text-left list-disc list-inside text-primary text-lg">
								<li>Head Spa</li>
								<li>Packages</li>
								<li>Waxing</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutMK;
