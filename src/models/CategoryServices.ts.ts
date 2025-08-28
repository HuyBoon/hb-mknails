import { model, models, Schema, Document, Types } from "mongoose";

// Interface for ServiceCategory document
export interface IServiceCategory extends Document {
    name: string;
    slug: string;
    description?: string;
    thumbnail?: { url: string; public_id: string };
    type: "hand" | "foot" | "nail_extensions" | "head_spa" | "waxing" | "other";
    parent?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ServiceCategorySchema = new Schema<IServiceCategory>(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            trim: true,
            maxlength: [100, "Category name cannot exceed 100 characters"],
        },
        slug: {
            type: String,
            required: [true, "Slug is required"],
            unique: true,
            trim: true,
            match: [/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"],
        },
        thumbnail: {
            url: { type: String, required: [true, "Thumbnail URL is required"] },
            public_id: { type: String, required: [true, "Thumbnail public ID is required"] },
        },
        type: {
            type: String,
            enum: ["hand", "foot", "nail_extensions", "head_spa", "waxing", "other"],
            required: [true, "Category type is required"],
        },
        parent: {
            type: Schema.Types.ObjectId,
            ref: "ServiceCategory",
            default: null,
        },
    },
    { timestamps: true }
);

ServiceCategorySchema.index({ name: "text", slug: "text", type: 1 });

export const ServiceCategory =
    models?.ServiceCategory || model<IServiceCategory>("ServiceCategory", ServiceCategorySchema);