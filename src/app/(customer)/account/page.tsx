"use client";

import React from "react";
import { useUser } from "@/components/context/AppContext";
import Image from "next/image";
import Loading from "@/components/Loading";
import Link from "next/link";
import { AiOutlineFacebook, AiOutlineGoogle } from "react-icons/ai";

const AccountPage = () => {
	const { user } = useUser();

	const detailAddress = [
		user?.address?.houseNumber,
		user?.address?.street,
		user?.address?.ward,
		user?.address?.district,
		user?.address?.city,
	]
		.filter(Boolean)
		.join(", ");

	if (!user) {
		return <Loading />;
	}

	return (
		<div className="flex flex-col justify-start">
			<h1 className="text-xl md:text-2xl font-semibold mb-6">
				Thông tin tài khoản
			</h1>

			<div className="p-4 rounded-2xl flex gap-3">
				<div className="flex-1 space-y-4">
					<div className="flex items-center gap-4">
						<p className="text-sm sm:text-base text-gray-500">Họ và tên:</p>
						<p className="text-sm sm:text-base font-medium text-gray-800">
							{user.name || "Chưa cập nhật"}
						</p>
					</div>

					<div className="flex items-center gap-4">
						<p className="text-sm sm:text-base text-gray-500">Email:</p>
						<p className="text-sm sm:text-base font-medium text-gray-800">
							{user.email}
						</p>
					</div>

					<div className="flex items-center gap-4">
						<p className="text-sm sm:text-base text-gray-500">Số điện thoại:</p>
						<p className="text-sm sm:text-base font-medium text-gray-800">
							{user.phone || "Chưa cập nhật"}
						</p>
					</div>
					<div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
						<p className="text-sm sm:text-base text-gray-500">
							Địa chỉ nhận hàng:
						</p>
						<p className="text-sm sm:text-base font-medium text-gray-800">
							{detailAddress || "Chưa cập nhật"}
						</p>
					</div>
				</div>
			</div>

			<div className="mt-6">
				<Link
					href={`/account/edit/${user._id}`}
					className="bg-primary  w-full text-white px-6 py-2 rounded hover:bg-secondary transition"
				>
					Chỉnh sửa thông tin
				</Link>
			</div>
		</div>
	);
};

export default AccountPage;
