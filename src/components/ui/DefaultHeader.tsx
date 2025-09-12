"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
	CircleUser,
	LayoutGrid,
	Plane,
	Search,
	Sprout,
	TreePalm,
	User,
} from "lucide-react";
import { usePathname } from "next/navigation";
import MobileNav from "../layout/MobileNav";
import LoginModal from "../layout/LoginModal";

export default function DefaultHeader() {
	const pathname = usePathname();
	const [navbar, setNavbar] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [sidebar, setSidebar] = useState(false);
	const [modalLogin, setModalLogin] = useState(false);

	const navLinks = [
		{ href: `/services`, label: "Services" },
		{ href: `/aboutus`, label: "About Us" },
		{ href: `/contact`, label: "Contact Us" },
	];

	const changeBackground = () => {
		setNavbar(window.scrollY >= 10);
	};

	useEffect(() => {
		window.addEventListener("scroll", changeBackground);
		return () => window.removeEventListener("scroll", changeBackground);
	}, []);

	return (
		<header
			className={`fixed w-full left-0 z-[999] transition-all duration-900`}
		>
			<div className="w-full mx-auto flex items-center justify-between px-[20px] xl:px-[2%] transition-all bg-header-dark backdrop-blur-[1.5px] h-16 sm:h-18">
				<Link
					href="/"
					className="min-w-[150px] flex items-center text-xl font-bold text-primary flex-shrink-0"
				>
					<Image
						src={"/logoName.png"}
						alt="mknails logo"
						width={200}
						height={40}
						className="w-[150px] sm:w-[180px] lg:w-[200px] object-cover "
					/>
					{/* <div className="h-16 flex items-center text-white text-xl font-bold whitespace-nowrap">
						MK NAILS & SPA
					</div> */}
				</Link>

				<div className="w-full flex items-center justify-end gap-6 md:gap-10">
					{/* Desktop Nav */}
					<nav className="hidden lg:flex items-center gap-4 text-white">
						{navLinks.map((link) => (
							<Link
								key={link.label}
								href={link.href}
								className={`hover:bg-[#e5c9af] hover:text-black transition-colors uppercase text-base font-medium px-[20px] py-[5px] rounded-2xl border border-white ${
									pathname === link.href
										? "text-black bg-[#e5c9af]"
										: navbar
										? "text-white bg-btn"
										: "text-white bg-btn"
								}`}
							>
								{link.label}
							</Link>
						))}
					</nav>

					{/* Right placeholder */}
					<div className="flex items-center justify-between gap-4 px-[10px] sm:px-[20px] py-[5px] rounded-2xl bg-btn border border-white">
						<div className="flex items-center">
							<Search
								size={25}
								className="w-[20px] sm:w-full cursor-pointer hover:text-[#e5c9af] text-white"
								onClick={() => setSidebar(!sidebar)}
							/>
						</div>
						<div className="flex items-center">
							<User
								size={25}
								className="w-[20px] sm:w-full cursor-pointer hover:text-[#e5c9af] text-white"
								onClick={() => setModalLogin(!modalLogin)}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Nav */}
			{mobileOpen && <MobileNav onClose={() => setMobileOpen(false)} />}
			{/* Login modal */}
			{modalLogin && <LoginModal onClose={() => setModalLogin(false)} />}
		</header>
	);
}
