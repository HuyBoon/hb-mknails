"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AsideCustomer from "@/components/customer/AsideCustomer";

export default function CustomerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/login"); // hoặc trang nào đó tùy bạn
		}
	}, [status, router]);

	// if (status === "loading") {
	// 	return <div className="p-4">Đang kiểm tra đăng nhập...</div>;
	// }

	if (status === "unauthenticated") {
		return null; // Tránh chớp nội dung khi redirect
	}

	return (
		<div
			className="flex min-h-screen w-full bg-cover bg-center border-b-4"
			style={{ backgroundImage: "url('/background1.webp')" }}
		>
			<AsideCustomer />
			<main className="flex-1 p-4">{children}</main>
		</div>
	);
}
