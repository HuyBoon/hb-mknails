"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/AppContext";
import { User, Edit, ShoppingBag, Heart, Lock, Repeat } from "lucide-react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import Image from "next/image";

export default function AsideCustomer({ onSelect }: { onSelect?: () => void }) {
	const pathname = usePathname();
	const { user } = useUser();
	const [collapsed, setCollapsed] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(false);

	// Check screen size on mount
	useEffect(() => {
		const checkScreen = () => {
			setIsSmallScreen(window.innerWidth < 640); // sm = 640px
		};

		checkScreen();
		window.addEventListener("resize", checkScreen);
		return () => window.removeEventListener("resize", checkScreen);
	}, []);

	// Force collapse on small screens
	useEffect(() => {
		if (isSmallScreen) {
			setCollapsed(true);
		}
	}, [isSmallScreen]);

	const navItems = [
		{
			label: "Thông tin tài khoản",
			href: `/account`,
			matchPath: "/account$",
			icon: <User size={20} />,
		},
		{
			label: "Chỉnh sửa tài khoản",
			href: `/account/edit/${user?.id}`,
			matchPath: "/account/edit",
			icon: <Edit size={20} />,
		},
		{
			label: "Quản lý đơn hàng",
			href: "/sales/orders",
			matchPath: "/sales/orders",
			icon: <ShoppingBag size={20} />,
		},
		{
			label: "Danh sách yêu thích",
			href: "/wishlist",
			matchPath: "/wishlist",
			icon: <Heart size={20} />,
		},
		{
			label: "Mua lại",
			href: "/sales/repeat-order",
			matchPath: "/sales/repeat-order",
			icon: <Repeat size={20} />,
		},
	];

	const isActive = (matchPath: string) => {
		const regex = new RegExp(matchPath);
		return regex.test(pathname || "");
	};

	return (
		<aside
			className={`relative min-h-screen transition-all duration-300 ease-in-out ${
				collapsed ? "w-16" : "w-64"
			} p-4 border-r-4`}
		>
			{/* Toggle button: ẩn khi nhỏ hơn sm */}
			{!isSmallScreen && (
				<span
					onClick={() => setCollapsed(!collapsed)}
					className={`absolute top-0 cursor-pointer p-1 hover:scale-105 transition-all ${
						collapsed ? "left-1/2 -translate-x-1/2" : "right-0"
					}`}
				>
					{collapsed ? (
						<AiOutlineMenuUnfold size={22} />
					) : (
						<AiOutlineMenuFold size={22} />
					)}
				</span>
			)}

			{/* Avatar */}
			<div className="text-center mb-4 mx-auto">
				<div
					className={`mx-auto rounded-full overflow-hidden transition-all duration-300 ${
						collapsed ? "w-8 h-8 mt-6" : "w-12 h-12"
					}`}
				>
					<Image
						src={user?.avatar || "/defaultAvatar.png"}
						alt="Avatar"
						width={48}
						height={48}
						className="object-cover w-full h-full"
					/>
				</div>

				{!collapsed && (
					<p className="mt-2 text-sm font-medium truncate max-w-[140px] mx-auto">
						{user?.name || "Khách hàng"}
					</p>
				)}
			</div>

			{/* Navigation */}
			<ul className="space-y-2">
				{navItems.map((item) => (
					<li key={item.href} className="relative group">
						<Link
							href={item.href}
							onClick={onSelect}
							className={`flex items-center ${
								collapsed ? "justify-center py-3" : "gap-3 px-2 py-3"
							} rounded-md transition-colors ${
								isActive(item.matchPath)
									? "text-secondary font-semibold"
									: "hover:scale-[1.01] text-gray-700"
							}`}
						>
							{item.icon}
							{!collapsed && (
								<span className="hidden sm:block">{item.label}</span>
							)}
						</Link>

						{/* Tooltip khi collapsed */}
						{collapsed && (
							<div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:block whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded shadow-lg z-10">
								{item.label}
							</div>
						)}
					</li>
				))}
			</ul>
		</aside>
	);
}
