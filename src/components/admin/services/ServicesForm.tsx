"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { ServiceCategory, ServiceItem } from "@/types/types";
import ImageComponent from "@/components/admin/image/ImageComponent";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ImageData {
	url: string;
	publicId: string;
}

interface ImageComponentRef {
	selectedFiles: File[];
	handleUpload: () => Promise<void>;
}

interface ServicesFormProps {
	service?: ServiceCategory;
	itemIndex?: number;
}

const ServicesForm: React.FC<ServicesFormProps> = ({ service, itemIndex }) => {
	const router = useRouter();
	const {
		control,
		handleSubmit,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm<ServiceCategory>({
		defaultValues: service || {
			key: `category_${Date.now()}`,
			title: "",
			imageHome: "",
			image: "",
			imagePage: "",
			items: [],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "items",
	});

	const [expandedItems, setExpandedItems] = useState<boolean[]>([]);
	const imageComponentRefs = useRef<Record<string, ImageComponentRef>>({
		imageHome: { selectedFiles: [], handleUpload: async () => {} },
		image: { selectedFiles: [], handleUpload: async () => {} },
		imagePage: { selectedFiles: [], handleUpload: async () => {} },
	});

	// Initialize form and expanded state
	useEffect(() => {
		if (service) {
			reset(service);
			setExpandedItems(new Array(service.items.length).fill(true));
			if (itemIndex !== undefined) {
				setExpandedItems((prev) =>
					prev.map((val, idx) => (idx === itemIndex ? true : val))
				);
			}
		}
	}, [service, itemIndex, reset]);

	// Register ImageComponent instance
	const registerImageComponent = (
		field: "imageHome" | "image" | "imagePage",
		selectedFiles: File[],
		handleUpload: () => Promise<void>
	) => {
		imageComponentRefs.current[field] = { selectedFiles, handleUpload };
	};

	// Handle image upload
	const handleImageUploaded = (
		images: ImageData[],
		field: "imageHome" | "image" | "imagePage"
	) => {
		if (images.length > 0) {
			setValue(field, images[0].url);
			toast.info(`Ảnh ${field} đã được tải lên`);
		}
	};

	// Handle image deletion
	const handleRemoveImage = async (
		field: "imageHome" | "image" | "imagePage"
	) => {
		const imageUrl = watch(field);
		if (!imageUrl) return;

		const confirmDelete = window.confirm(`Bạn có chắc muốn xóa ảnh ${field}?`);
		if (!confirmDelete) return;

		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/deleteImages`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						publicIds: [imageUrl.split("/").pop()?.split(".")[0]],
					}),
				}
			);
			const result = await res.json();
			if (!res.ok || !result.success) {
				throw new Error(result.message || `Xóa ảnh ${field} thất bại`);
			}

			setValue(field, "");
			toast.success(`Xóa ảnh ${field} thành công`);
		} catch (error: any) {
			console.error(`Remove ${field} error:`, error);
			toast.error(error.message || `Không thể xóa ảnh ${field}`);
		}
	};

	// Handle item deletion
	const handleRemoveItem = async (index: number) => {
		const item = watch(`items.${index}`);
		const hasData = item.name || item.description || item.price;

		if (!hasData) {
			remove(index);
			setExpandedItems((prev) => prev.filter((_, i) => i !== index));
			return;
		}

		const confirmDelete = window.confirm("Bạn có chắc muốn xóa item này?");
		if (!confirmDelete) return;

		try {
			remove(index);
			setExpandedItems((prev) => prev.filter((_, i) => i !== index));
			toast.success("Xóa item thành công");
		} catch (error: any) {
			console.error("Remove item error:", error);
			toast.error(error.message || "Không thể xóa item");
		}
	};

	// Handle form submission
	const onSubmit = async (data: ServiceCategory) => {
		try {
			// Upload pending images
			for (const field of ["imageHome", "image", "imagePage"] as const) {
				const ref = imageComponentRefs.current[field];
				if (ref && ref.selectedFiles.length > 0) {
					await ref.handleUpload();
				}
			}

			// Submit form data
			const method = service ? "PUT" : "POST";
			const url = service
				? `${process.env.NEXT_PUBLIC_API_URL}/api/service/${data.key}`
				: `${process.env.NEXT_PUBLIC_API_URL}/api/service`;

			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			const result = await res.json();
			if (!res.ok) throw new Error(result.message || "Lưu danh mục thất bại");

			toast.success(
				service ? "Cập nhật danh mục thành công" : "Thêm danh mục thành công"
			);
			router.push("/admin/services");
		} catch (err: any) {
			console.error(err);
			toast.error(err.message || "Có lỗi xảy ra");
		}
	};

	// Toggle item expansion
	const toggleExpand = (index: number) => {
		setExpandedItems((prev) => {
			const newExpanded = [...prev];
			newExpanded[index] = !newExpanded[index];
			return newExpanded;
		});
	};

	const imageFields = ["imageHome", "image", "imagePage"] as const;

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div className="hidden">
				<label className="block mb-1 font-semibold">Key</label>
				<Controller
					name="key"
					control={control}
					rules={{ required: "Vui lòng nhập key" }}
					render={({ field }) => (
						<input
							{...field}
							className="w-full border rounded-lg p-2"
							placeholder="Key (e.g., hand, foot)"
							disabled={!!service}
						/>
					)}
				/>
				{errors.key && (
					<p className="text-red-500 text-sm">{errors.key.message}</p>
				)}
			</div>

			<div>
				<label className="block mb-1 font-semibold">Category Title</label>
				<Controller
					name="title"
					control={control}
					rules={{ required: "Vui lòng nhập tiêu đề" }}
					render={({ field }) => (
						<input
							{...field}
							className="w-full border rounded-lg p-2"
							placeholder="Tiêu đề danh mục"
						/>
					)}
				/>
				{errors.title && (
					<p className="text-red-500 text-sm">{errors.title.message}</p>
				)}
			</div>

			{imageFields.map((field) => (
				<div key={field}>
					<label className="block mb-1 font-semibold">
						{field === "imageHome"
							? "Image Home"
							: field === "image"
							? "Image"
							: "Image Page (Optional)"}
					</label>
					{watch(field) ? (
						<div className="relative w-64">
							<img
								src={watch(field)}
								alt={`${field} preview`}
								className="w-full h-40 object-cover rounded"
							/>
							<button
								type="button"
								onClick={() => handleRemoveImage(field)}
								className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded"
							>
								Xóa
							</button>
						</div>
					) : (
						<ImageComponent
							setImagePublicIds={(imgs) => handleImageUploaded(imgs, field)}
							maxFiles={1}
							category="services"
							registerImageComponent={(selectedFiles, handleUpload) =>
								registerImageComponent(field, selectedFiles, handleUpload)
							}
						/>
					)}
				</div>
			))}

			<div className="space-y-6">
				<h3 className="text-lg font-semibold">Items</h3>
				{fields.map((field, index) => {
					const isExpanded = expandedItems[index] ?? true;
					return (
						<div key={field.id} className="border rounded-lg p-4 bg-gray-50">
							<div className="flex items-center justify-between">
								<h4 className="font-semibold">{`Item ${index + 1}`}</h4>
								<button
									type="button"
									onClick={() => toggleExpand(index)}
									className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
								>
									{isExpanded ? (
										<>
											<ChevronUp size={20} /> Thu gọn
										</>
									) : (
										<>
											<ChevronDown size={20} /> Mở rộng
										</>
									)}
								</button>
							</div>

							{isExpanded && (
								<>
									<div>
										<label className="block mb-1 font-semibold">
											Item Name
										</label>
										<Controller
											name={`items.${index}.name`}
											control={control}
											rules={{ required: "Vui lòng nhập tên item" }}
											render={({ field }) => (
												<input
													{...field}
													className="w-full border rounded-lg p-2"
													placeholder="Tên item"
												/>
											)}
										/>
										{errors.items?.[index]?.name && (
											<p className="text-red-500 text-sm">
												{errors.items[index]?.name?.message}
											</p>
										)}
									</div>

									<div>
										<label className="block mb-1 font-semibold">
											Description
										</label>
										<Controller
											name={`items.${index}.description`}
											control={control}
											render={({ field }) => (
												<textarea
													{...field}
													className="w-full border rounded-lg p-2"
													placeholder="Mô tả..."
												/>
											)}
										/>
									</div>

									<div>
										<label className="block mb-1 font-semibold">Price</label>
										<Controller
											name={`items.${index}.price`}
											control={control}
											rules={{ required: "Vui lòng nhập giá" }}
											render={({ field }) => (
												<input
													{...field}
													className="w-full border rounded-lg p-2"
													placeholder="Giá (e.g., 30 hoặc From $30)"
												/>
											)}
										/>
										{errors.items?.[index]?.price && (
											<p className="text-red-500 text-sm">
												{errors.items[index]?.price?.message}
											</p>
										)}
									</div>

									<button
										type="button"
										onClick={() => handleRemoveItem(index)}
										className="px-3 py-2 bg-red-600 text-white rounded-lg mt-2"
									>
										Xóa Item
									</button>
								</>
							)}
						</div>
					);
				})}
				<button
					type="button"
					onClick={() => {
						append({ name: "", description: "", price: "" });
						setExpandedItems((prev) => [...prev, true]);
					}}
					className="px-4 py-2 bg-green-600 text-white rounded-lg"
				>
					+ Thêm Item
				</button>
			</div>

			<div>
				<button
					type="submit"
					className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
				>
					{service ? "Cập nhật danh mục" : "Thêm danh mục"}
				</button>
			</div>
		</form>
	);
};

export default ServicesForm;
