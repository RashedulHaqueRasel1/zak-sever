import { Types } from 'mongoose';

export interface IWaterfront {
  propertyName: string;
  propertySlug: string;
  subtitle: string;
  contentCards: Array<{
    title: string;
    subtitle: string;
    from: string;
    description: string;
    subDescription: string;
    highlights: string[];
  }>;
  neighbourhood?: Types.ObjectId;
  waterfrontCategory?: string;
  startingPrice?: number;
  propertyAddress?: string;
  city?: string;
  zipCode?: string;
  bedrooms?: string;
  bathrooms?: string;
  interiorSqft?: number;
  latitude?: number;
  longitude?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
