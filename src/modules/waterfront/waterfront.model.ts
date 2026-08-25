import { Schema, model } from 'mongoose';
import { IWaterfront } from './waterfront.interface';

const waterfrontSchema = new Schema<IWaterfront>(
  {
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
    neighbourhood: { type: Schema.Types.ObjectId, ref: 'Neighbourhood' },
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
  },
  {
    timestamps: true,
  }
);

waterfrontSchema.index({ propertyName: 1 });
waterfrontSchema.index({ city: 1 });
waterfrontSchema.index({ zipCode: 1 });
waterfrontSchema.index({ waterfrontCategory: 1 });
waterfrontSchema.index({ neighbourhood: 1 });

export const Waterfront = model<IWaterfront>('Waterfront', waterfrontSchema);
