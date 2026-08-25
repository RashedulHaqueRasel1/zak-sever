import { z } from 'zod';
import { EAmenities } from './neighbourhood.interface';

const createNeighbourhoodValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    slug: z.string({
      required_error: 'Slug is required',
    }),
    title: z.string().min(1, 'Title is required'),
    subTitle: z.string().min(1, 'Subtitle is required'),
    activeProjects: z.number().min(0, 'Active projects cannot be negative'),
    priceRange: z.string().min(1, 'Price range is required'),
    averagePricePerSqft: z.string().min(1, 'Average price per square foot is required'),
    deliveryWindow: z.string().min(1, 'Delivery window is required'),
    description: z.string().min(1, 'Description is required'),
    shortDescription: z.string().optional(),
    fullDescription: z.string().optional(),
    heroImage: z.string().optional(),
    themeImages: z.array(
      z.object({
        url: z.string({
          required_error: 'Theme image URL is required',
        }),
        index: z.number({
          required_error: 'Theme image index is required',
        }),
      })
    ).optional(),
    amenities: z.array(z.nativeEnum(EAmenities)).optional(),
    location: z.object({
      city: z.string({
        required_error: 'City is required',
      }),
      state: z.string().optional(),
      country: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
      mapEmbedUrl: z.string().optional(),
    }),
    isFeatured: z.boolean().optional(),
  }),
});

const updateNeighbourhoodValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    title: z.string().optional(),
    subTitle: z.string().optional(),
    activeProjects: z.number().min(0).optional(),
    priceRange: z.string().optional(),
    averagePricePerSqft: z.string().optional(),
    deliveryWindow: z.string().optional(),
    description: z.string().optional(),
    shortDescription: z.string().optional(),
    fullDescription: z.string().optional(),
    heroImage: z.string().optional(),
    themeImages: z.array(
      z.object({
        url: z.string().optional(),
        index: z.number().optional(),
      })
    ).optional(),
    amenities: z.array(z.nativeEnum(EAmenities)).optional(),
    location: z.object({
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
      mapEmbedUrl: z.string().optional(),
    }).optional(),
    isFeatured: z.boolean().optional(),
  }),
});

export const NeighbourhoodValidation = {
  createNeighbourhoodValidationSchema,
  updateNeighbourhoodValidationSchema,
};
