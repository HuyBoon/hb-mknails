"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { X, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface NavMobileProps {
	onClose: () => void;
}

const MobileNav = ({ onClose }: NavMobileProps) => {
	const pathname = usePathname();

	const [closing, setClosing] = useState(false);
	const [showSubMenu, setShowSubMenu] = useState(false);
	const navLinks = [
		{ href: `/services`, label: "Services" },
		{ href: `/promotions`, label: "Promotions" },
		{ href: `/aboutus`, label: "About us" },
		{ href: `/contact`, label: "Contact us" },
	];
	const handleClose = () => {
		setClosing(true);
	};

	useEffect(() => {
		if (closing) {
			const timer = setTimeout(() => {
				onClose();
			}, 400);
			return () => clearTimeout(timer);
		}
	}, [closing, onClose]);

	const toggleSubMenu = () => {
		setShowSubMenu(!showSubMenu);
	};

	// Animation variants for submenu
	const subMenuVariants = {
		hidden: { opacity: 0, height: 0, y: -10 },
		visible: { opacity: 1, height: "auto", y: 0 },
		exit: { opacity: 0, height: 0, y: -10 },
	};

	return (
		<div className="fixed inset-0 z-[9999] lg:hidden">
			{/* Overlay */}
			<div
				className="absolute inset-0 bg-black/60 backdrop-blur-sm h-screen"
				onClick={handleClose}
			/>

			{/* Menu */}
			<div
				className={`absolute left-0 top-0 flex flex-col min-h-screen w-[300px] bg-[#5c412e] text-white px-[20px] py-[30px] shadow-xl transition-transform duration-400 overflow-y-auto ${
					closing ? "animate-slideOut" : "animate-slideIn"
				}`}
			>
				{/* Header */}
				<div className="flex items-center justify-between">
					<Link href={`/`}>
						<Image
							src={"/logoName.png"}
							alt="mknails logo"
							width={200}
							height={40}
							className="w-[150px] sm:w-[180px] lg:w-[200px] object-cover "
						/>
					</Link>
					<button
						onClick={handleClose}
						aria-label="Close Menu"
						className="w-[30px] h-[30px] border flex items-center justify-center rounded-full transition-all duration-300 bg-transparent hover:bg-[#e5c9af] cursor-pointer"
					>
						<X size={20} />
					</button>
				</div>

				<div className=" min-h-[50vh]">
					<ul className="mt-[50px] text-left uppercase">
						{navLinks.map((item, idx) => {
							const isActive =
								pathname === item.href ||
								(item.href === `/` && pathname === `/`);

							return (
								<li key={idx} className="relative px-[5px] py-[10px]">
									<div className="flex items-center justify-between">
										<Link
											onClick={handleClose}
											href={item.href}
											className={`flex-1 transition-all duration-400 ${
												isActive ? "text-primary" : "text-white"
											} hover:text-[#e5c9af] hover:translate-x-1`}
										>
											{item.label}
										</Link>
									</div>
								</li>
							);
						})}
					</ul>
				</div>

				{/* Hotline */}
				<div className="mt-6 flex items-center gap-4 border-t border-gray-700 pt-4">
					<div className="bg-[] border border-title p-2 rounded-full">
						<Phone size={20} className="text-white" />
					</div>
					<div>
						<span className="block text-xs text-white">To More Inquiry</span>
						<h6 className="text-sm font-bold text-gray-800">
							<Link
								href="(519) 429 2637"
								className="text-white text-[18px] leading-[20px] font-[600]"
							>
								(519) 429 2637
							</Link>
						</h6>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MobileNav;
