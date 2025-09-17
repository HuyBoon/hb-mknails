"use client";
import React, { useEffect, useState, useRef } from "react";
import HeaderTitle from "@/components/admin/HeaderTitle";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { ImageData } from "@/types/interface";
import ImageComponent from "@/components/admin/image/ImageComponent";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";

interface Item {
	details: { description: string };
	image: { url: string; public_id: string };
}

interface PromotionForm {
	title: string;
	items: Item[];
}

const PromotionAdmin = () => {
	const {
		control,
		handleSubmit,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm<PromotionForm>({
		defaultValues: {
			title: "",
			items: [],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "items",
	});

	const [expandedItems, setExpandedItems] = useState<boolean[]>([]);
	const imageComponentRefs = useRef<
		Array<{ selectedFiles: File[]; handleUpload: () => Promise<void> }>
	>([]);

	// Fetch existing promotion on mount
	useEffect(() => {
		const fetchPromotion = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/promotion`,
					{
						cache: "no-store",
					}
				);
				const result = await res.json();
				if (res.ok && result.success && result.data) {
					reset({
						title: result.data.title,
						items: result.data.items || [],
					});
					setExpandedItems(new Array(result.data.items.length).fill(true));
					imageComponentRefs.current = new Array(result.data.items.length).fill(
						{
							selectedFiles: [],
							handleUpload: async () => {},
						}
					);
				} else {
					toast.error("Failed to load promotion");
				}
			} catch (error) {
				console.error("Fetch promotion error:", error);
				toast.error("Server error while loading promotion");
			}
		};
		fetchPromotion();
	}, [reset]);

	// Toggle expand/collapse for an item
	const toggleExpand = (index: number) => {
		setExpandedItems((prev) => {
			const newExpanded = [...prev];
			newExpanded[index] = !newExpanded[index];
			return newExpanded;
		});
	};

	// Register ImageComponent instance
	const registerImageComponent = (
		index: number,
		selectedFiles: File[],
		handleUpload: () => Promise<void>
	) => {
		imageComponentRefs.current[index] = { selectedFiles, handleUpload };
	};

	// Handle image upload
	const handleImageUploaded = (images: ImageData[], index: number) => {
		if (images.length > 0) {
			const { url, publicId } = images[0];
			setValue(`items.${index}.image.url`, url);
			setValue(`items.${index}.image.public_id`, publicId);
			toast.info("Image uploaded successfully");
		}
	};

	// Handle item deletion
	const handleRemoveImage = async (index: number) => {
		const item = watch(`items.${index}`);
		const hasData = item.image.url || item.details.description;

		// Silent deletion for empty items
		if (!hasData) {
			remove(index);
			setExpandedItems((prev) => prev.filter((_, i) => i !== index));
			imageComponentRefs.current.splice(index, 1);
			return;
		}

		// Confirmation for items with data
		const confirmDelete = window.confirm("Are you sure you want to delete this item?");
		if (!confirmDelete) return;

		const publicId = item.image.public_id;
		try {
			// Delete image from Cloudinary if it exists
			if (publicId) {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/deleteImages`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ publicIds: [publicId] }),
					}
				);
				const result = await response.json();
				if (!response.ok || !result.success) {
					throw new Error(result.message || "Failed to delete image");
				}
			}

			// Remove item from database
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/promotion`,
				{
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ itemIndex: index }),
				}
			);
			const result = await res.json();
			if (!res.ok) throw new Error(result.message || "Failed to delete item");

			// Update form state
			remove(index);
			setExpandedItems((prev) => prev.filter((_, i) => i !== index));
			imageComponentRefs.current.splice(index, 1);
			toast.success("Item deleted successfully");
		} catch (error: any) {
			console.error("Remove item error:", error);
			toast.error(error.message || "Unable to delete item");
		}
	};

	// Handle form submission with automatic image upload
	const onSubmit = async (data: PromotionForm) => {
		try {
			// Check for pending images and upload them
			for (let index = 0; index < fields.length; index++) {
				const ref = imageComponentRefs.current[index];
				if (ref && ref.selectedFiles.length > 0) {
					await ref.handleUpload();
				}
			}

			// Submit updated form data
			const updatedData = watch();
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/promotion`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(updatedData),
				}
			);
			const result = await res.json();
			if (!res.ok) throw new Error(result.message || "Failed to save promotion");

			toast.success("Promotion saved successfully!");
		} catch (err: any) {
			console.error(err);
			toast.error(err.message || "An error occurred");
		}
	};

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
			<HeaderTitle title="Promotions Management" path="" addItem="" />
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="mt-4 space-y-4 shadow-md rounded-lg p-3 bg-white"
			>
				<div>
					<label className="block mb-1 text-sm font-semibold">
						Promotion Title
					</label>
					<Controller
						name="title"
						control={control}
						rules={{ required: "Please enter a title" }}
						render={({ field }) => (
							<input
								{...field}
								className="w-full border rounded-lg p-1.5 text-sm"
								placeholder="Promotion title"
							/>
						)}
					/>
					{errors.title && (
						<p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
					)}
				</div>

				<div className="space-y-4">
					{fields.map((field, index) => {
						const imageUrl = watch(`items.${index}.image.url`);
						const isExpanded = expandedItems[index] ?? true;
						return (
							<div
								key={field.id}
								className="border rounded-lg p-3 space-y-3 bg-gray-50"
							>
								<div className="flex items-center justify-between">
									<h3 className="font-semibold text-base">{`Promotion ${
										index + 1
									}`}</h3>
									<div className="flex items-center gap-2">
										<button
											type="button"
											onClick={() => toggleExpand(index)}
											className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
											aria-label={isExpanded ? "Collapse" : "Expand"}
											title={isExpanded ? "Collapse" : "Expand"}
										>
											{isExpanded ? (
												<ChevronUp size={16} />
											) : (
												<ChevronDown size={16} />
											)}
											{isExpanded ? "Collapse" : "Expand"}
										</button>
									</div>
								</div>

								{isExpanded && (
									<>
										<div>
											<label className="block mb-1 text-sm font-semibold">
												Discount Description
											</label>
											<Controller
												name={`items.${index}.details.description`}
												control={control}
												render={({ field }) => (
													<textarea
														{...field}
														className="w-full border rounded-lg p-1.5 text-sm"
														placeholder="e.g., 10% off foot..."
														rows={3}
													/>
												)}
											/>
										</div>

										<div className="space-y-3">
											{!imageUrl ? (
												<ImageComponent
													setImagePublicIds={(imgs) =>
														handleImageUploaded(imgs, index)
													}
													maxFiles={1}
													category="promotion"
													registerImageComponent={(
														selectedFiles,
														handleUpload
													) =>
														registerImageComponent(
															index,
															selectedFiles,
															handleUpload
														)
													}
												/>
											) : (
												<div className="relative w-48">
													<img
														src={imageUrl}
														alt={`Promotion image ${index + 1}`}
														className="w-full h-32 object-cover rounded"
													/>
													<button
														type="button"
														onClick={() => handleRemoveImage(index)}
														className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
														aria-label="Delete image"
														title="Delete image"
													>
														<Trash2 size={14} />
													</button>
												</div>
											)}
										</div>
									</>
								)}

								<button
									type="button"
									onClick={() => handleRemoveImage(index)}
									className="px-2 py-1 bg-red-600 text-white rounded-lg text-sm flex items-center gap-1"
									aria-label="Delete item"
									title="Delete item"
								>
									<Trash2 size={14} /> Delete Item
								</button>
							</div>
						);
					})}
				</div>

				<button
					type="button"
					onClick={() => {
						append({
							details: { description: "" },
							image: { url: "", public_id: "" },
						});
						setExpandedItems((prev) => [...prev, true]);
						imageComponentRefs.current.push({
							selectedFiles: [],
							handleUpload: async () => {},
						});
					}}
					className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm"
				>
					+ Add Item
				</button>

				<div>
					<button
						type="submit"
						className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm"
					>
						Save Promotion
					</button>
				</div>
			</form>
		</div>
	);
};

export default PromotionAdmin;