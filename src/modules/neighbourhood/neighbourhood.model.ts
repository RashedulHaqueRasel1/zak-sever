import { Schema, model } from 'mongoose';
import { INeighbourhood, EAmenities } from './neighbourhood.interface';

const neighbourhoodSchema = new Schema<INeighbourhood>(
  {
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
        enum: Object.values(EAmenities),
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
  },
  {
    timestamps: true,
  }
);

// Add indexes for efficient filtering
neighbourhoodSchema.index({ name: 1 });
neighbourhoodSchema.index({ 'location.city': 1 });
neighbourhoodSchema.index({ 'location.state': 1 });
neighbourhoodSchema.index({ 'location.country': 1 });
neighbourhoodSchema.index({ amenities: 1 });

export const Neighbourhood = model<INeighbourhood>('Neighbourhood', neighbourhoodSchema);
