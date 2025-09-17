import { model, models, Schema } from "mongoose";

const PromotionSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Promotion title is required"],
            trim: true,
        },
        items: [
            {
                details: {
                    description: { type: String },
                },
                image: {
                    url: { type: String, required: [true, "Image URL is required"] },
                    public_id: { type: String, required: [true, "Image public ID is required"] },
                },
            },
        ],
    },
    { timestamps: true }
);

export const Promotion = models.Promotion || model("Promotion", PromotionSchema);