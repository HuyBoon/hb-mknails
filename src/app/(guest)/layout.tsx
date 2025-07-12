"use client";

import Footer from "@/components/layout/Footer";
import React from "react";

export default function GuestLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<main>{children}</main>
			<Footer />
		</>
	);
}
