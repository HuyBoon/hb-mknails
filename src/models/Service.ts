import { model, models, Schema, Document, Types } from "mongoose";

// Interface for Service document
export interface IService extends Document {
    title: string;
    slug: string;
    description?: string;
    price: number;
    durationMinutes: number;
    category: Types.ObjectId;
    thumbnail: { url: string; public_id: string } | null;
    images: { url: string; public_id: string }[];
    tags: string[];
    details: string;
    createdAt: Date;
    updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
    {
        title: {
            type: String,
            required: [true, "Service title is required"],
            trim: true,
            maxlength: [200, "Service title cannot exceed 200 characters"],
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
            maxlength: [2000, "Description cannot exceed 2000 characters"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"],
        },
        durationMinutes: {
            type: Number,
            required: [true, "Duration is required"],
            min: [1, "Duration must be at least 1 minute"],
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "ServiceCategory",
            required: [true, "Category is required"],
        },
        thumbnail: {
            url: { type: String, required: false },
            public_id: { type: String, required: false },
        },
        images: [
            {
                url: { type: String, required: [true, "Service image URL is required"] },
                public_id: { type: String, required: [true, "Service image public ID is required"] },
            },
        ],
        tags: [{ type: String, trim: true, maxlength: [50, "Tag cannot exceed 50 characters"] }],
        details: {
            type: String,
            trim: true,
            maxlength: [5000, "Details cannot exceed 5000 characters"],
            default: "",
        },
    },
    { timestamps: true }
);

ServiceSchema.index({ title: "text", slug: "text", tags: "text", details: "text" });

export const Service = models?.Service || model<IService>("Service", ServiceSchema);