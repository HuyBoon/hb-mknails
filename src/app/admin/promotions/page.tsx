"use client";
import React, { useState, useEffect } from "react";
import HeaderTitle from "@/components/admin/HeaderTitle";

import { Trash2, Plus } from "lucide-react";

interface Item {
	details: {
		description: string;
	};
	image: {
		url: string;
		public_id: string;
	};
}

interface Promotion {
	_id?: string;
	title: string;
	items: Item[];
}

const PromotionAdmin = () => {
	const [promotion, setPromotion] = useState<Promotion>({
		title: "",
		items: [],
	});
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		fetchPromotion();
	}, []);

	const fetchPromotion = async () => {
		try {
			const response = await fetch("/api/promotion");
			const data = await response.json();
			if (data.success && data.data) {
				setPromotion(data.data);
				setIsEditing(true);
			}
		} catch (error) {
			console.error("Error fetching promotion:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPromotion({ ...promotion, title: e.target.value });
	};

	const handleItemChange = (
		index: number,
		field: keyof Item | keyof Item["details"] | keyof Item["image"],
		subfield?: "details" | "image",
		value?: any
	) => {
		const newItems = [...promotion.items];
		if (subfield === "details") {
			newItems[index].details = { ...newItems[index].details, [field]: value };
		} else if (subfield === "image") {
			newItems[index].image = { ...newItems[index].image, [field]: value };
		}
		setPromotion({ ...promotion, items: newItems });
	};

	const addItem = () => {
		setPromotion({
			...promotion,
			items: [
				...promotion.items,
				{
					details: { description: "" },
					image: { url: "", public_id: "" },
				},
			],
		});
	};

	const removeItem = (index: number) => {
		const newItems = promotion.items.filter((_, i) => i !== index);
		setPromotion({ ...promotion, items: newItems });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const method = isEditing ? "PUT" : "POST";
			const response = await fetch("/api/promotion", {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(promotion),
			});
			if (response.ok) {
				const data = await response.json();
				setPromotion(data.data);
				setIsEditing(true);
				alert("Promotion saved successfully");
			} else {
				alert("Error saving promotion");
			}
		} catch (error) {
			console.error("Error submitting promotion:", error);
			alert("Error saving promotion");
		}
	};

	const handleDelete = async () => {
		if (!confirm("Are you sure you want to delete the promotion?")) return;
		try {
			const response = await fetch("/api/promotion", { method: "DELETE" });
			if (response.ok) {
				setPromotion({ title: "", items: [] });
				setIsEditing(false);
				alert("Promotion deleted successfully");
			}
		} catch (error) {
			console.error("Error deleting promotion:", error);
		}
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div className="container mx-auto p-6">
			<HeaderTitle title="Promotions Management" path="" addItem="" />
			<form onSubmit={handleSubmit} className="mt-6 space-y-6">
				<div>
					<label htmlFor="title">Title</label>
					<input
						id="title"
						value={promotion.title}
						onChange={handleTitleChange}
						required
					/>
				</div>

				<div>
					<div className="flex justify-between items-center mb-2">
						<label>Items</label>
						<button type="button" onClick={addItem}>
							<Plus size={16} className="mr-2" /> Add Item
						</button>
					</div>
					{promotion.items.map((item, index) => (
						<div key={index} className="border rounded-lg p-4 mb-4 space-y-4">
							<div>
								<label>Description</label>
								<input
									value={item.details.description}
									onChange={(e) =>
										handleItemChange(
											index,
											"description",
											"details",
											e.target.value
										)
									}
									required
								/>
							</div>

							<div>
								<label>Image URL</label>
								<input
									value={item.image.url}
									onChange={(e) =>
										handleItemChange(index, "url", "image", e.target.value)
									}
									required
								/>
							</div>
							<div>
								<label>Image Public ID</label>
								<input
									value={item.image.public_id}
									onChange={(e) =>
										handleItemChange(
											index,
											"public_id",
											"image",
											e.target.value
										)
									}
									required
								/>
							</div>
							<button type="button" onClick={() => removeItem(index)}>
								<Trash2 size={16} className="mr-2" /> Remove Item
							</button>
						</div>
					))}
				</div>

				<div className="flex gap-4">
					<button type="submit">
						{isEditing ? "Update" : "Create"} Promotion
					</button>
					{isEditing && (
						<button type="button" onClick={handleDelete}>
							Delete Promotion
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default PromotionAdmin;
