import Image from "next/image";
import React from "react";

const Sologan = () => {
	const images = [
		{ id: 1, src: "/shop/8.jpg", alt: "Spa Interior 1" }, // ảnh lớn
		{ id: 2, src: "/shop/3.jpg", alt: "Spa Interior 2" },
		{ id: 3, src: "/shop/5.jpg", alt: "Spa Interior 3" },
	];

	return (
		<section className="w-full">
			<div
				className="w-full bg-cover bg-center bg-no-repeat aspect-[1440/400] min-h-[400px] flex items-center"
				style={{ backgroundImage: `url(/backgroundbanner1.svg)` }}
			>
				<div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
					{/* Text */}
					<div className="lg:col-span-7 text-center lg:text-left flex flex-col justify-center">
						<h2 className="font-baloo text-center text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-2">
							Visit us to embrace
						</h2>
						<h2 className="font-baloo text-center text-2xl sm:text-3xl lg:text-5xl font-bold text-white">
							beauty, comfort, and care
						</h2>
					</div>

					{/* Images */}
					<div className="lg:col-span-5 h-full">
						<div className="grid grid-cols-3 grid-rows-2 gap-4 min-h-[300px] h-full">
							{/* Ảnh lớn bên phải */}
							<div className="col-start-2 col-span-2 row-span-2 relative overflow-hidden rounded-2xl shadow-md">
								<Image
									src={images[0].src}
									alt={images[0].alt}
									fill
									className="object-cover"
								/>
							</div>

							{/* Ảnh nhỏ 1 bên trái trên */}
							<div className="col-start-1 row-start-1 relative overflow-hidden rounded-2xl shadow-md">
								<Image
									src={images[1].src}
									alt={images[1].alt}
									fill
									className="object-cover"
								/>
							</div>

							{/* Ảnh nhỏ 2 bên trái dưới */}
							<div className="col-start-1 row-start-2 relative overflow-hidden rounded-2xl shadow-md">
								<Image
									src={images[2].src}
									alt={images[2].alt}
									fill
									className="object-cover"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Sologan;
