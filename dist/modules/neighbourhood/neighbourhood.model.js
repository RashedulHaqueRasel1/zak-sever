"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neighbourhood = void 0;
const mongoose_1 = require("mongoose");
const neighbourhood_interface_1 = require("./neighbourhood.interface");
const neighbourhoodSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    title: { type: String, required: true, trim: true },
    subTitle: { type: String, required: true, trim: true },
    activeProjects: { type: Number, required: true, min: 0 },
    priceRange: { type: String, required: true, trim: true },
    averagePricePerSqft: { type: String, required: true, trim: true },
    deliveryWindow: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    shortDescription: {
        type: String,
    },
    fullDescription: {
        type: String,
    },
    heroImage: {
        type: String,
    },
    themeImages: [
        {
            url: { type: String },
            index: { type: Number },
        },
    ],
    amenities: [
        {
            type: String,
            enum: Object.values(neighbourhood_interface_1.EAmenities),
        },
    ],
    location: {
        city: { type: String, required: true },
        state: { type: String, default: '' },
        country: { type: String, default: '' },
        latitude: { type: Number, default: 0 },
        longitude: { type: Number, default: 0 },
        mapEmbedUrl: { type: String, default: '' },
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// Add indexes for efficient filtering
neighbourhoodSchema.index({ name: 1 });
neighbourhoodSchema.index({ 'location.city': 1 });
neighbourhoodSchema.index({ 'location.state': 1 });
neighbourhoodSchema.index({ 'location.country': 1 });
neighbourhoodSchema.index({ amenities: 1 });
exports.Neighbourhood = (0, mongoose_1.model)('Neighbourhood', neighbourhoodSchema);
