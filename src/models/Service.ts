import mongoose, { Schema } from "mongoose";

const ServiceItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Schema.Types.Mixed, required: true },
});

const ServiceCategorySchema = new Schema({
    key: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    imageHome: { type: String, required: true },
    image: { type: String, required: true },
    imagePage: { type: String },
    items: [ServiceItemSchema],
});

export const Service = mongoose.models.Service || mongoose.model("Service", ServiceCategorySchema);