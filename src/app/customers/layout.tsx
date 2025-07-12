"use client";

import React from "react";

export default function CustomersLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<main>{children}</main>
		</>
	);
}
