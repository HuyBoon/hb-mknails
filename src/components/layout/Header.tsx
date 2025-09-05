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
import { Settings, Bell, Heart, LogOut, ShoppingBag } from "lucide-react";

import { usePathname } from "next/navigation";
import LoginModal from "./LoginModal";
import MobileNav from "./MobileNav";
import { useUser } from "../contexts/AppContext";
import { signOut } from "next-auth/react";

export default function Header() {
	const pathname = usePathname();
	const [navbar, setNavbar] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [sidebar, setSidebar] = useState(false);
	const [modalLogin, setModalLogin] = useState(false);
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

	const navLinks = [
		{ href: `/services`, label: "Services" },
		{ href: `/aboutus`, label: "About Us" },
		{ href: `/contact`, label: "Contact Us" },
	];
	const { user, status } = useUser();
	const changeBackground = () => {
		setNavbar(window.scrollY >= 10);
	};

	useEffect(() => {
		window.addEventListener("scroll", changeBackground);
		return () => window.removeEventListener("scroll", changeBackground);
	}, []);

	const handleMouseEnter = () => {
		if (hoverTimeout) clearTimeout(hoverTimeout);
		setDropdownOpen(true);
	};

	const handleMouseLeave = () => {
		const timeout = setTimeout(() => setDropdownOpen(false), 200);
		setHoverTimeout(timeout);
	};
	const dropdownItems = [
		{
			label: "Tài khoản của bạn",
			href: "/account",
			icon: <Settings size={16} />,
		},
		{
			label: "Quản lý đơn hàng",
			href: "/sales/orders",
			icon: <ShoppingBag size={16} />,
		},
		{
			label: "Sản phẩm yêu thích",
			href: "/wishlist",
			icon: <Heart size={16} />,
		},
		{
			label: "Đăng xuất",
			action: () => signOut({ callbackUrl: "/" }),
			icon: <LogOut size={16} />,
			isButton: true,
		},
	];
	return (
		<header
			className={`fixed w-full left-0 z-[999] transition-all duration-900`}
		>
			<div
				className={`w-full mx-auto flex items-center justify-between px-[20px] xl:px-[2%] transition-all ${
					navbar
						? "bg-header-dark backdrop-blur-[1.5px] h-18"
						: "bg-transparent w-full backdrop-blur-[1.5px]"
				}`}
			>
				<Link
					href="/"
					className="min-w-[150px] flex items-center text-xl font-bold text-primary flex-shrink-0"
				>
					{navbar ? (
						<Image
							src={"/logoName.png"}
							alt="mknails logo"
							width={200}
							height={40}
							className="object-cover"
						/>
					) : (
						<Image
							src={"/logo.png"}
							alt="mknails logo"
							width={120}
							height={80}
							className="object-cover"
						/>
					)}
				</Link>

				<div className="w-full flex items-center justify-end gap-6 md:gap-10">
					{/* Desktop Nav */}
					<nav className="hidden lg:flex items-center gap-4 text-white">
						{navLinks.map((link) => (
							<Link
								key={link.label}
								href={link.href}
								className={`hover:bg-[#e5c9af] hover:text-black transition-colors uppercase text-base font-medium px-[20px] py-[5px] rounded-2xl bg-btn border border-white ${
									pathname === link.href
										? "text-primary"
										: navbar
										? "text-white"
										: "text-white"
								}`}
							>
								{link.label}
							</Link>
						))}
					</nav>

					{/* Right placeholder */}
					<div className="flex items-center justify-between gap-4 px-[20px] py-[5px] rounded-2xl bg-btn border border-white">
						<div className="flex items-center">
							<Search
								size={25}
								className="cursor-pointer hover:text-[#e5c9af] text-white"
								onClick={() => setSidebar(!sidebar)}
							/>
						</div>
						<div className="flex items-center">
							<div className="relative">
								{user ? (
									<div
										className="relative flex items-center space-x-4"
										onMouseEnter={handleMouseEnter}
										onMouseLeave={handleMouseLeave}
									>
										<Image
											src={user?.avatar || "/logo.png"}
											alt="User Avatar"
											width={40}
											height={40}
											className="h-6 w-6 rounded-full cursor-pointer border-2 border-gray-400 object-cover"
										/>
										{isDropdownOpen && (
											<div className="absolute -right-2 top-8 z-40 w-48 bg-white shadow-lg rounded-lg">
												<div className="absolute -top-1 right-3 w-4 h-4 rotate-45 bg-white"></div>
												<ul className="text-sm overflow-hidden rounded-lg">
													<li className="px-3 py-2 text-center font-semibold text-gray-800">
														{user.name}
													</li>
													<hr className="border-gray-200" />
													{dropdownItems.map((item, idx) =>
														item.isButton ? (
															<li key={idx}>
																<button
																	onClick={item.action}
																	className="w-full flex items-center py-1 px-3 text-gray-700 hover:bg-gray-100"
																>
																	{item.icon}
																	<span className="ml-3">{item.label}</span>
																</button>
															</li>
														) : (
															<li key={idx}>
																<Link
																	href={item.href || "#"}
																	className="flex items-center px-3 py-1 text-gray-700 hover:bg-gray-100"
																>
																	{item.icon}
																	<span className="ml-3">{item.label}</span>
																</Link>
															</li>
														)
													)}
												</ul>
											</div>
										)}
									</div>
								) : (
									<User
										size={25}
										className="cursor-pointer hover:text-[#e5c9af] text-white"
										onClick={() => setModalLogin(!modalLogin)}
									/>
								)}
							</div>
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
