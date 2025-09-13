"use client";

import Footer from "@/components/layout/Footer";
import DefaultHeader from "@/components/ui/DefaultHeader";
import React from "react";

export default function GuestLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col min-h-screen">
			<DefaultHeader />
			<main className=" flex-1 pt-16 sm:pt-18 min-h-screen ">{children}</main>
			<Footer />
		</div>
	);
}
