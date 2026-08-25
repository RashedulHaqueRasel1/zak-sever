"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaterfrontValidation = void 0;
const zod_1 = require("zod");
const createWaterfrontValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        propertyName: zod_1.z.string({ required_error: 'Property name is required' }),
        propertySlug: zod_1.z.string({ required_error: 'Property slug is required' }),
        subtitle: zod_1.z.string({ required_error: 'Subtitle is required' }),
        contentCards: zod_1.z.array(zod_1.z.object({
            title: zod_1.z.string().min(1, 'Card title is required'),
            subtitle: zod_1.z.string().min(1, 'Card subtitle is required'),
            from: zod_1.z.string().min(1, 'From is required'),
            description: zod_1.z.string().min(1, 'Description is required'),
            subDescription: zod_1.z.string().min(1, 'Sub-description is required'),
            highlights: zod_1.z.array(zod_1.z.string().min(1, 'Highlight cannot be empty')).min(1, 'Add at least one highlight'),
        })).min(1, 'Add at least one project card'),
    }),
});
const updateWaterfrontValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        propertyName: zod_1.z.string().optional(),
        propertySlug: zod_1.z.string().optional(),
        subtitle: zod_1.z.string().optional(),
        contentCards: zod_1.z.array(zod_1.z.object({
            title: zod_1.z.string(), subtitle: zod_1.z.string(), from: zod_1.z.string(),
            description: zod_1.z.string(), subDescription: zod_1.z.string(), highlights: zod_1.z.array(zod_1.z.string()).optional(),
        })).optional(),
        neighbourhood: zod_1.z.string().optional(),
        waterfrontCategory: zod_1.z.string().optional(),
        startingPrice: zod_1.z.number().optional(),
        propertyAddress: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        zipCode: zod_1.z.string().optional(),
        bedrooms: zod_1.z.string().optional(),
        bathrooms: zod_1.z.string().optional(),
        interiorSqft: zod_1.z.number().optional(),
        latitude: zod_1.z.number().optional(),
        longitude: zod_1.z.number().optional(),
    }),
});
exports.WaterfrontValidation = {
    createWaterfrontValidationSchema,
    updateWaterfrontValidationSchema,
};
