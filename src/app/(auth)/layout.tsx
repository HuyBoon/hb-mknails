"use client";

import Footer from "@/components/layout/Footer";
import DefaultHeader from "@/components/ui/DefaultHeader";
import React from "react";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<DefaultHeader />
			<main>{children}</main>
			<Footer />
		</>
	);
}
