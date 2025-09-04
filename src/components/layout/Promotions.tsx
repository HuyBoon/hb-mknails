"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type Img = { src: string; alt?: string };

const fallbackImages: Img[] = [
	{ src: "/promotions/allpack.png", alt: "All Packages" },
	{ src: "/promotions/headspa.png", alt: "Head Spa" },
	{ src: "/promotions/waxing.png", alt: "Waxing" },
	{ src: "/services/hand.png", alt: "Image 1" },
	{ src: "/services/foot.png", alt: "Image 2" },
	{ src: "/services/packages.png", alt: "Image 3" },
	{ src: "/services/nailExtensions.png", alt: "Image 4" },
	{ src: "/services/headSpa.png", alt: "Image 5" },
	{ src: "/services/waxing.png", alt: "Image 6" },
];

interface PromotionsSectionProps {
	images?: Img[];
	fetchUrl?: string;
	initialIndex?: number;
	className?: string;
}

export default function PromotionsSection({
	images: imagesProp,
	fetchUrl = "/api/promotions",
	initialIndex = 0,
	className = "",
}: PromotionsSectionProps) {
	const [images, setImages] = useState<Img[]>(imagesProp ?? fallbackImages);
	const [start, setStart] = useState<number>(Math.max(0, initialIndex));
	const [loading, setLoading] = useState<boolean>(!imagesProp);

	useEffect(() => {
		if (imagesProp) {
			setImages(imagesProp);
			setStart(
				Math.max(0, Math.min(initialIndex, Math.max(0, imagesProp.length - 3)))
			);
			setLoading(false);
			return;
		}

		let mounted = true;
		setLoading(true);

		(async () => {
			try {
				const res = await fetch(fetchUrl);
				if (!res.ok) throw new Error("Fetch failed");
				const data = await res.json();
				if (!mounted) return;
				const normalized: Img[] = Array.isArray(data)
					? data.map((it: any) =>
							typeof it === "string"
								? { src: it, alt: "" }
								: { src: it.src, alt: it.alt ?? "" }
					  )
					: [];
				setImages(normalized.length ? normalized : fallbackImages);
				setStart((prev) =>
					Math.max(
						0,
						Math.min(
							prev,
							Math.max(
								0,
								(normalized.length ? normalized : fallbackImages).length - 3
							)
						)
					)
				);
			} catch (e) {
				console.warn("PromotionsSection fetch error:", e);
				setImages(fallbackImages);
			} finally {
				if (mounted) setLoading(false);
			}
		})();

		return () => {
			mounted = false;
		};
	}, [imagesProp, fetchUrl, initialIndex]);

	const maxStart = Math.max(0, images.length - 3);
	useEffect(() => {
		if (start > maxStart) setStart(maxStart);
	}, [maxStart, start]);

	const leftImg = images[start];
	const topRightImg = images[start + 1];
	const bottomRightImg = images[start + 2];

	const canPrev = start > 0;
	const canNext = start < maxStart && images.length >= 3;

	const onPrev = () => {
		if (!canPrev) return;
		setStart((s) => Math.max(0, s - 1));
	};
	const onNext = () => {
		if (!canNext) return;
		setStart((s) => Math.min(maxStart, s + 1));
	};

	return (
		<section
			className={`relative w-full mx-auto py-24 px-4 md:px-16 bg-cover bg-center ${className}`}
			style={{ backgroundImage: `url(/separate.png)` }}
		>
			<div className="relative w-full mx-auto max-w-[1440px]">
				<div className="w-full mx-auto grid grid-cols-1 md:grid-cols-12 px-14">
					<div className="w-full md:col-span-5 flex flex-col items-start ">
						<div className="text-center px-10 py-5 rounded-2xl bg-btn border border-white mb-12">
							<h2 className="text-white uppercase text-[50px] font-bold">
								Promotions
							</h2>
						</div>

						<div className="rounded-xl overflow-hidden w-[400px] aspect-[4/3]">
							{!leftImg && (
								<div className="w-full h-full bg-gray-100 flex items-center justify-center">
									{loading ? "Loading..." : "No image"}
								</div>
							)}

							{leftImg && (
								<Image
									key={leftImg.src}
									src={leftImg.src}
									alt={leftImg.alt ?? ""}
									width={800}
									height={600}
									sizes="(max-width: 768px) 100vw, 40vw"
									className="w-full h-full object-cover rounded-xl transition-opacity duration-300"
								/>
							)}
						</div>
					</div>

					<div className="w-full md:col-span-7 flex flex-col items-end justify-end  ">
						<div className="mr-[30%] overflow-hidden mb-12 w-[400px] aspect-[4/3] rounded-xl">
							{!topRightImg && (
								<div className="w-full h-full bg-gray-100 flex items-center justify-center">
									{loading ? "Loading..." : ""}
								</div>
							)}
							{topRightImg && (
								<Image
									key={topRightImg.src}
									src={topRightImg.src}
									alt={topRightImg.alt ?? ""}
									width={800}
									height={600}
									sizes="(max-width: 768px) 100vw, 35vw"
									className="w-full h-full object-cover rounded-xl transition-opacity duration-300"
								/>
							)}
						</div>

						<div className="overflow-hidden w-[400px] aspect-[4/3] rounded-xl">
							{!bottomRightImg && (
								<div className="w-full h-full bg-gray-100 flex items-center justify-center">
									{loading ? "Loading..." : ""}
								</div>
							)}
							{bottomRightImg && (
								<Image
									key={bottomRightImg.src}
									src={bottomRightImg.src}
									alt={bottomRightImg.alt ?? ""}
									width={800}
									height={600}
									sizes="(max-width: 768px) 100vw, 35vw"
									className="w-full h-full object-cover rounded-xl transition-opacity duration-300"
								/>
							)}
						</div>
					</div>
				</div>

				<div className="pointer-events-none select-none">
					<div className="absolute top-1/2 left-[5px] -translate-y-1/2 z-10">
						<button
							type="button"
							onClick={onPrev}
							disabled={!canPrev}
							aria-label="Previous"
							className="pointer-events-auto bg-white shadow-lg w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-btn"
						>
							<Image
								src="/arrow.png"
								alt="Prev"
								width={100}
								height={100}
								className="w-14 h-14 rotate-180 mr-1"
								draggable={false}
							/>
						</button>
					</div>

					<div className="absolute top-1/2 right-[5px] -translate-y-1/2 z-10">
						<button
							type="button"
							onClick={onNext}
							disabled={!canNext}
							aria-label="Next"
							className="pointer-events-auto bg-white shadow-lg w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-btn"
						>
							<Image
								src="/arrow.png"
								alt="Next"
								width={100}
								height={100}
								className="w-14 h-14 ml-1"
								draggable={false}
							/>
						</button>
					</div>
				</div>

				<div className="absolute bottom-[-15%] left-[15%]">
					<Image
						src="/package.png"
						alt="Spa items"
						width={800}
						height={600}
						sizes="(max-width: 768px) 100vw, 30vw"
						className="w-[clamp(300px,30vw,450px)] object-cover aspect-[4/3]"
					/>
				</div>
			</div>
		</section>
	);
}
