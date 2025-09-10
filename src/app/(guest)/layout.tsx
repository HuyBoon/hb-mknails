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
		<>
			<DefaultHeader />
			<main className="pt-16 sm:pt-18 min-h-screen ">{children}</main>
			<Footer />
		</>
	);
}
