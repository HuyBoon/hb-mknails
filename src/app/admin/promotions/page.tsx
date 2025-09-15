"use client";
import React, { useEffect } from "react";
import HeaderTitle from "@/components/admin/HeaderTitle";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { ImageData } from "@/types/interface";
import ImageComponent from "@/components/admin/image/ImageComponent";
import { toast } from "sonner";

interface Image {
    url: string;
    public_id: string;
}

interface PromotionForm {
    title: string;
    images: Image[];
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
            images: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "images",
    });

    // Fetch existing promotion on mount
    useEffect(() => {
        const fetchPromotion = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/promotion`);
                const result = await res.json();
                if (res.ok && result.success && result.data) {
                    reset({
                        title: result.data.title,
                        images: result.data.images || [],
                    });
                }
            } catch (error) {
                console.error("Fetch promotion error:", error);
                toast.error("Không thể tải promotion");
            }
        };
        fetchPromotion();
    }, [reset]);

    // Handle image upload
    const handleImageUploaded = (images: ImageData[], index: number) => {
        if (images.length > 0) {
            const { url, publicId } = images[0];
            setValue(`images.${index}.url`, url);
            setValue(`images.${index}.public_id`, publicId);
            toast.info("Ảnh đã được tải lên, nhấn Lưu để xác nhận");
        }
    };

    // Handle image removal
    const handleRemoveImage = async (index: number) => {
        const publicId = watch(`images.${index}.public_id`);
        if (!publicId) {
            remove(index);
            return;
        }

        try {
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
                throw new Error(result.message || "Xóa ảnh thất bại");
            }

            remove(index);
            toast.success("Đã xóa ảnh");
        } catch (error: any) {
            console.error("Remove image error:", error);
            toast.error(error.message || "Không thể xóa ảnh");
        }
    };

    const onSubmit = async (data: PromotionForm) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/promotion`,
                {
                    method: "PUT", // Always use PUT to create or update
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            );
            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Lưu promotion thất bại");

            toast.success("Lưu promotion thành công!");
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Có lỗi xảy ra");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <HeaderTitle title="Promotions Management" path="" addItem="" />

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                <div>
                    <label className="block mb-1 font-semibold">Promotion Title</label>
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: "Vui lòng nhập tiêu đề" }}
                        render={({ field }) => (
                            <input
                                {...field}
                                className="w-full border rounded-lg p-2"
                                placeholder="Tiêu đề promotion"
                            />
                        )}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm">{errors.title.message}</p>
                    )}
                </div>

                <div className="space-y-6">
                    {fields.map((field, index) => {
                        const imageUrl = watch(`images.${index}.url`);
                        return (
                            <div
                                key={field.id}
                                className="border rounded-lg p-4 space-y-4 bg-gray-50"
                            >
                                <div className="space-y-4">
                                    {!imageUrl ? (
                                        <ImageComponent
                                            setImagePublicIds={(imgs) =>
                                                handleImageUploaded(imgs, index)
                                            }
                                            maxFiles={1}
                                            category="promotion"
                                        />
                                    ) : (
                                        <div className="relative w-64">
                                            <img
                                                src={imageUrl}
                                                alt="Ảnh promotion"
                                                className="w-full h-40 object-cover rounded"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="px-3 py-2 bg-red-500 text-white rounded-lg"
                                >
                                    Xóa ảnh
                                </button>
                            </div>
                        );
                    })}
                </div>

                <button
                    type="button"
                    onClick={() => append({ url: "", public_id: "" })}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                    + Thêm Ảnh
                </button>

                <div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                    >
                        Lưu Promotion
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PromotionAdmin;