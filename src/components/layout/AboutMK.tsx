import Image from "next/image";
import React from "react";

const AboutMK = () => {
	const images = [
		{ id: 1, src: "/shop/1.jpg", alt: "Spa Interior 1" },
		{ id: 2, src: "/shop/2.jpg", alt: "Spa Interior 2" },
		{ id: 3, src: "/shop/3.jpg", alt: "Spa Interior 3" },
		{ id: 4, src: "/shop/4.jpg", alt: "Spa Interior 4" },
		{ id: 5, src: "/shop/5.jpg", alt: "Spa Interior 5" },
		{ id: 6, src: "/shop/6.jpg", alt: "Spa Interior 6" },
	];

	return (
		<section className="bg-[#f2ecdb] px-4 sm:px-6 lg:px-12 py-10 sm:py-14 lg:pt-20">
			<div className="max-w-7xl mx-auto space-y-16">
				{/* Section 1 */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
					{/* Left: Image collage */}
					<div className="flex gap-4">
						<div className="flex-1 overflow-hidden rounded-2xl shadow-md">
							<Image
								src={images[0].src}
								alt={images[0].alt}
								width={500}
								height={600}
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="flex flex-col gap-4 w-1/3">
							{images.slice(1, 3).map((image) => (
								<div
									key={image.id}
									className="overflow-hidden rounded-2xl shadow-md"
								>
									<Image
										src={image.src}
										alt={image.alt}
										width={300}
										height={200}
										className="w-full h-40 sm:h-48 object-cover"
									/>
								</div>
							))}
						</div>
					</div>

					{/* Right: Content */}
					<div className="text-center lg:text-left">
						<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
							Our Beauty Bar Services
						</h2>
						<ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
							<li>Manicures</li>
							<li>Pedicures</li>
							<li>Facial Treatments</li>
							<li>Massage Therapy</li>
							<li>Special Occasion Packages</li>
						</ul>
						<p className="mt-6 text-gray-700 leading-relaxed text-base sm:text-lg">
							With our talented team, enjoy a spa experience with delightful,
							personalized treatments — always including complimentary touches
							to make your visit unforgettable.
						</p>
					</div>
				</div>

				{/* Section 2 */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
					{/* Left: Text */}
					<div className="text-center lg:text-left">
						<h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
							We’re here to make every visit a comfortable and
							confidence-boosting experience
						</h3>
						<p className="text-gray-700 leading-relaxed text-base sm:text-lg">
							Our mission is to bring beauty, relaxation, and wellness together,
							ensuring you leave refreshed, confident, and glowing every time.
						</p>
					</div>

					{/* Right: Image collage */}
					<div className="flex gap-4">
						<div className="flex-1 overflow-hidden rounded-2xl shadow-md">
							<Image
								src={images[3].src}
								alt={images[3].alt}
								width={500}
								height={600}
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="flex flex-col gap-4 w-1/3">
							{images.slice(4, 6).map((image) => (
								<div
									key={image.id}
									className="overflow-hidden rounded-2xl shadow-md"
								>
									<Image
										src={image.src}
										alt={image.alt}
										width={300}
										height={200}
										className="w-full h-40 sm:h-48 object-cover"
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutMK;
