"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useUser } from "@/components/context/AppContext";
import { uploadAvatar } from "@/libs/cloudinaryConnect";
import Image from "next/image";
import { toast } from "sonner";
import AddressForm from "@/components/guestmodal/AddressForm";

type FormDataType = {
	name: string;
	phone: string;
	avatar: string;
	address: {
		houseNumber: string;
		street: string;
		city: string;
		district: string;
		ward: string;
	};
};

export default function EditProfile() {
	const { user, updateUserProfile } = useUser();
	const router = useRouter();
	const { id } = useParams();

	const [formData, setFormData] = useState<FormDataType>({
		name: "",
		phone: "",
		avatar: "",
		address: {
			houseNumber: "",
			street: "",
			city: "",
			district: "",
			ward: "",
		},
	});

	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name || "",
				phone: user.phone || "",
				avatar: user.avatar || "",
				address: {
					houseNumber: user.address?.houseNumber || "",
					street: user.address?.street || "",
					city: user.address?.city || "",
					district: user.address?.district || "",
					ward: user.address?.ward || "",
				},
			});
		}
	}, [user]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		if (name in formData.address) {
			setFormData((prev) => ({
				...prev,
				address: {
					...prev.address,
					[name]: value,
				},
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		try {
			const uploadedUrl = await uploadAvatar(file);
			setFormData((prev) => ({ ...prev, avatar: uploadedUrl }));
		} catch (error) {
			toast.error("Lỗi khi tải ảnh đại diện.");
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/profile/${user?._id}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(formData),
				}
			);

			if (res.ok) {
				toast.success("Cập nhật thông tin thành công!");
				await updateUserProfile();
				router.push("/account");
			} else {
				const data = await res.json();
				toast.error(data.message || "Có lỗi xảy ra.");
			}
		} catch (error) {
			toast.error("Không thể kết nối đến máy chủ.");
		}
	};

	return (
		<div className="flex flex-col justify-start">
			<h2 className="text-xl font-bold mb-4">Cập Nhật Thông Tin Cá Nhân</h2>
			<form onSubmit={handleSubmit} className="space-y-5 text-gray-900">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<label className="block font-medium">Tên khách hàng</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							className="mt-1 block w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
							required
						/>
					</div>
					<div>
						<label className="block font-medium">Số điện thoại</label>
						<input
							type="text"
							name="phone"
							value={formData.phone}
							onChange={handleInputChange}
							className="mt-1 block w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
						/>
					</div>
				</div>

				{/* Địa chỉ */}
				<AddressForm
					formData={formData}
					handleInputChange={handleInputChange}
				/>

				<div>
					<label className="block font-medium">Ảnh đại diện</label>
					<div className="flex items-center justify-start gap-4">
						<input
							type="file"
							onChange={handleAvatarChange}
							className="w-[40%] p-2"
						/>
						{formData.avatar && (
							<Image
								src={formData.avatar}
								alt="Avatar preview"
								width={80}
								height={80}
								className="rounded-full"
							/>
						)}
					</div>
				</div>

				<button
					type="submit"
					className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition"
				>
					Cập Nhật
				</button>
			</form>
		</div>
	);
}
