import { z } from 'zod';

const createWaterfrontValidationSchema = z.object({
  body: z.object({
    propertyName: z.string({ required_error: 'Property name is required' }),
    propertySlug: z.string({ required_error: 'Property slug is required' }),
    subtitle: z.string({ required_error: 'Subtitle is required' }),
    contentCards: z.array(z.object({
      title: z.string().min(1, 'Card title is required'),
      subtitle: z.string().min(1, 'Card subtitle is required'),
      from: z.string().min(1, 'From is required'),
      description: z.string().min(1, 'Description is required'),
      subDescription: z.string().min(1, 'Sub-description is required'),
      highlights: z.array(z.string().min(1, 'Highlight cannot be empty')).min(1, 'Add at least one highlight'),
    })).min(1, 'Add at least one project card'),
  }),
});

const updateWaterfrontValidationSchema = z.object({
  body: z.object({
    propertyName: z.string().optional(),
    propertySlug: z.string().optional(),
    subtitle: z.string().optional(),
    contentCards: z.array(z.object({
      title: z.string(), subtitle: z.string(), from: z.string(),
      description: z.string(), subDescription: z.string(), highlights: z.array(z.string()).optional(),
    })).optional(),
    neighbourhood: z.string().optional(),
    waterfrontCategory: z.string().optional(),
    startingPrice: z.number().optional(),
    propertyAddress: z.string().optional(),
    city: z.string().optional(),
    zipCode: z.string().optional(),
    bedrooms: z.string().optional(),
    bathrooms: z.string().optional(),
    interiorSqft: z.number().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
});

export const WaterfrontValidation = {
  createWaterfrontValidationSchema,
  updateWaterfrontValidationSchema,
};
