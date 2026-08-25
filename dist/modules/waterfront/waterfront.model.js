"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Waterfront = void 0;
const mongoose_1 = require("mongoose");
const waterfrontSchema = new mongoose_1.Schema({
    propertyName: { type: String, required: true, trim: true },
    propertySlug: { type: String, required: true, unique: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
    contentCards: [{
            title: { type: String, required: true, trim: true },
            subtitle: { type: String, required: true, trim: true },
            from: { type: String, required: true, trim: true },
            description: { type: String, required: true, trim: true },
            subDescription: { type: String, required: true, trim: true },
            highlights: [{ type: String, required: true, trim: true }],
        }],
    neighbourhood: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Neighbourhood' },
    waterfrontCategory: { type: String },
    startingPrice: { type: Number },
    propertyAddress: { type: String },
    city: { type: String },
    zipCode: { type: String },
    bedrooms: { type: String },
    bathrooms: { type: String },
    interiorSqft: { type: Number },
    latitude: { type: Number },
    longitude: { type: Number },
}, {
    timestamps: true,
});
waterfrontSchema.index({ propertyName: 1 });
waterfrontSchema.index({ city: 1 });
waterfrontSchema.index({ zipCode: 1 });
waterfrontSchema.index({ waterfrontCategory: 1 });
waterfrontSchema.index({ neighbourhood: 1 });
exports.Waterfront = (0, mongoose_1.model)('Waterfront', waterfrontSchema);
