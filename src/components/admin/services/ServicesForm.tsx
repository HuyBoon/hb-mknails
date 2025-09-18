"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { ServiceCategory, ServiceItem } from "@/types/types";
import ImageComponent from "@/components/admin/image/ImageComponent";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Save, Trash2 } from "lucide-react";

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
	const itemRefs = useRef<React.RefObject<HTMLDivElement | null>[]>([]);

	useEffect(() => {
		if (service) {
			reset(service);
			const initialExpanded = new Array(service.items.length).fill(false);
			itemRefs.current = Array(service.items.length)
				.fill(null)
				.map(() => React.createRef<HTMLDivElement>());
			if (
				itemIndex !== undefined &&
				itemIndex >= 0 &&
				itemIndex < service.items.length
			) {
				initialExpanded[itemIndex] = true;
				// Scroll to and focus the specified item
				setTimeout(() => {
					const itemElement = itemRefs.current[itemIndex]?.current;
					if (itemElement) {
						itemElement.scrollIntoView({ behavior: "smooth", block: "start" });
						const firstInput = itemElement.querySelector("input");
						if (firstInput) {
							firstInput.focus();
						}
					}
				}, 100);
			} else if (service.items.length > 0) {
				initialExpanded[0] = true;
			}
			setExpandedItems(initialExpanded);
		}
	}, [service, itemIndex, reset]);

	const registerImageComponent = (
		field: "imageHome" | "image" | "imagePage",
		selectedFiles: File[],
		handleUpload: () => Promise<void>
	) => {
		imageComponentRefs.current[field] = { selectedFiles, handleUpload };
	};

	const handleImageUploaded = (
		images: ImageData[],
		field: "imageHome" | "image" | "imagePage"
	) => {
		if (images.length > 0) {
			setValue(field, images[0].url);
			toast.info(`Image ${field} uploaded successfully`);
		}
	};

	const handleRemoveImage = async (
		field: "imageHome" | "image" | "imagePage"
	) => {
		const imageUrl = watch(field);
		if (!imageUrl) return;

		const confirmDelete = window.confirm(
			`Are you sure you want to delete the ${field} image?`
		);
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
				throw new Error(result.message || `Failed to delete ${field} image`);
			}

			setValue(field, "");
			toast.success(`Image ${field} deleted successfully`);
		} catch (error: any) {
			console.error(`Remove ${field} error:`, error);
			toast.info(
				error.message || `Unable to delete ${field} image. Please try again.`
			);
		}
	};

	const handleRemoveItem = async (index: number) => {
		const item = watch(`items.${index}`);
		const hasData = item.name || item.description || item.price;

		if (!hasData) {
			remove(index);
			setExpandedItems((prev) => prev.filter((_, i) => i !== index));
			itemRefs.current = itemRefs.current.filter((_, i) => i !== index);
			return;
		}

		const confirmDelete = window.confirm(
			"Are you sure you want to delete this service?"
		);
		if (!confirmDelete) return;

		try {
			remove(index);
			setExpandedItems((prev) => prev.filter((_, i) => i !== index));
			itemRefs.current = itemRefs.current.filter((_, i) => i !== index);
			toast.success("Service deleted successfully");
		} catch (error: any) {
			console.error("Remove service error:", error);
			toast.info(
				error.message || "Unable to delete service. Please try again."
			);
		}
	};

	const handleSaveItem = async (index: number) => {
		const item = watch(`items.${index}`);
		const categoryKey = watch("key");
		if (!categoryKey) {
			toast.info("Category key is missing. Please save the category first.");
			return;
		}

		try {
			const currentItems = watch("items");
			const updatedItems = [...currentItems];
			updatedItems[index] = item;

			const categoryData: ServiceCategory = {
				...service,
				key: categoryKey,
				title: watch("title"),
				imageHome: watch("imageHome"),
				image: watch("image"),
				imagePage: watch("imagePage"),
				items: updatedItems,
			};

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/service/${categoryKey}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(categoryData),
				}
			);
			const result = await res.json();
			if (!res.ok) throw new Error(result.message || "Failed to save service");

			toast.success("Service saved successfully");
			router.push("/admin/services");
		} catch (error: any) {
			console.error("Save service error:", error);
			toast.info(error.message || "Unable to save service. Please try again.");
		}
	};

	const onSubmit = async (data: ServiceCategory) => {
		try {
			for (const field of ["imageHome", "image", "imagePage"] as const) {
				const ref = imageComponentRefs.current[field];
				if (ref && ref.selectedFiles.length > 0) {
					await ref.handleUpload();
				}
			}

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
			if (!res.ok) throw new Error(result.message || "Failed to save category");

			toast.success(
				service
					? "Category updated successfully"
					: "Category added successfully"
			);
			router.push("/admin/services");
		} catch (err: any) {
			console.error(err);
			toast.info(err.message || "An error occurred. Please try again.");
		}
	};

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
					rules={{ required: "Please enter a key" }}
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
					rules={{ required: "Please enter a title" }}
					render={({ field }) => (
						<input
							{...field}
							className="w-full border rounded-lg p-2"
							placeholder="Category title"
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
								Delete
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
				<h3 className="text-lg font-semibold">Services</h3>
				{fields.map((field, index) => {
					const isExpanded = expandedItems[index] ?? true;
					return (
						<div
							key={field.id}
							className="border rounded-lg p-4 bg-gray-50"
							ref={itemRefs.current[index]}
						>
							<div className="flex items-center justify-between">
								<h4 className="font-semibold">{`Service ${index + 1}`}</h4>
								<button
									type="button"
									onClick={() => toggleExpand(index)}
									className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
								>
									{isExpanded ? (
										<>
											<ChevronUp size={20} /> Collapse
										</>
									) : (
										<>
											<ChevronDown size={20} /> Expand
										</>
									)}
								</button>
							</div>

							{isExpanded && (
								<>
									<div>
										<label className="block mb-1 font-semibold">
											Service Name
										</label>
										<Controller
											name={`items.${index}.name`}
											control={control}
											rules={{ required: "Please enter service name" }}
											render={({ field }) => (
												<input
													{...field}
													className="w-full border rounded-lg p-2"
													placeholder="Service name"
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
													placeholder="Description..."
												/>
											)}
										/>
									</div>

									<div>
										<label className="block mb-1 font-semibold">Price</label>
										<Controller
											name={`items.${index}.price`}
											control={control}
											rules={{ required: "Please enter price" }}
											render={({ field }) => (
												<input
													{...field}
													className="w-full border rounded-lg p-2"
													placeholder="Price (e.g., 30 or From $30)"
												/>
											)}
										/>
										{errors.items?.[index]?.price && (
											<p className="text-red-500 text-sm">
												{errors.items[index]?.price?.message}
											</p>
										)}
									</div>

									<div className="flex gap-2 mt-2">
										<button
											type="button"
											onClick={() => handleRemoveItem(index)}
											className="px-3 py-2 bg-red-600 text-white rounded-lg"
											title="Delete Service"
										>
											<Trash2 size={14} />
										</button>
										<button
											type="button"
											onClick={() => handleSaveItem(index)}
											className="px-3 py-2 bg-blue-600 text-white rounded-lg"
											title="Save Service"
										>
											<Save size={14} />
										</button>
									</div>
								</>
							)}
						</div>
					);
				})}
				<button
					type="button"
					onClick={() => {
						append({ name: "", description: "", price: "" });
						setExpandedItems((prev) => [...prev, false]);
						itemRefs.current.push(React.createRef<HTMLDivElement>());
					}}
					className="px-4 py-2 bg-green-600 text-white rounded-lg"
				>
					+ Add Service
				</button>
			</div>

			<div>
				<button
					type="submit"
					className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
				>
					{service ? "Update Category" : "Add Category"}
				</button>
			</div>
		</form>
	);
};

export default ServicesForm;
