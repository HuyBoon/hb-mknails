"use client";

import { useState } from "react";
import AsideCustomer from "./AsideCustomer";
import AdminHeader from "./AdminHeader";

export default function ClientLayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<div className="relative ">
			<AsideCustomer collapsed={collapsed} setCollapsed={setCollapsed} />

			<AdminHeader collapsed={collapsed} />
			<main
				className={`transition-all duration-300 ${
					collapsed ? "ml-16" : "ml-64"
				} pt-[90px] px-8 min-h-screen`}
			>
				{children}
			</main>
		</div>
	);
}
