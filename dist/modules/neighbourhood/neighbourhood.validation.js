"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeighbourhoodValidation = void 0;
const zod_1 = require("zod");
const neighbourhood_interface_1 = require("./neighbourhood.interface");
const createNeighbourhoodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        slug: zod_1.z.string({
            required_error: 'Slug is required',
        }),
        title: zod_1.z.string().min(1, 'Title is required'),
        subTitle: zod_1.z.string().min(1, 'Subtitle is required'),
        activeProjects: zod_1.z.number().min(0, 'Active projects cannot be negative'),
        priceRange: zod_1.z.string().min(1, 'Price range is required'),
        averagePricePerSqft: zod_1.z.string().min(1, 'Average price per square foot is required'),
        deliveryWindow: zod_1.z.string().min(1, 'Delivery window is required'),
        description: zod_1.z.string().min(1, 'Description is required'),
        shortDescription: zod_1.z.string().optional(),
        fullDescription: zod_1.z.string().optional(),
        heroImage: zod_1.z.string().optional(),
        themeImages: zod_1.z.array(zod_1.z.object({
            url: zod_1.z.string({
                required_error: 'Theme image URL is required',
            }),
            index: zod_1.z.number({
                required_error: 'Theme image index is required',
            }),
        })).optional(),
        amenities: zod_1.z.array(zod_1.z.nativeEnum(neighbourhood_interface_1.EAmenities)).optional(),
        location: zod_1.z.object({
            city: zod_1.z.string({
                required_error: 'City is required',
            }),
            state: zod_1.z.string().optional(),
            country: zod_1.z.string().optional(),
            latitude: zod_1.z.number().optional(),
            longitude: zod_1.z.number().optional(),
            mapEmbedUrl: zod_1.z.string().optional(),
        }),
        isFeatured: zod_1.z.boolean().optional(),
    }),
});
const updateNeighbourhoodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        slug: zod_1.z.string().optional(),
        title: zod_1.z.string().optional(),
        subTitle: zod_1.z.string().optional(),
        activeProjects: zod_1.z.number().min(0).optional(),
        priceRange: zod_1.z.string().optional(),
        averagePricePerSqft: zod_1.z.string().optional(),
        deliveryWindow: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        shortDescription: zod_1.z.string().optional(),
        fullDescription: zod_1.z.string().optional(),
        heroImage: zod_1.z.string().optional(),
        themeImages: zod_1.z.array(zod_1.z.object({
            url: zod_1.z.string().optional(),
            index: zod_1.z.number().optional(),
        })).optional(),
        amenities: zod_1.z.array(zod_1.z.nativeEnum(neighbourhood_interface_1.EAmenities)).optional(),
        location: zod_1.z.object({
            city: zod_1.z.string().optional(),
            state: zod_1.z.string().optional(),
            country: zod_1.z.string().optional(),
            latitude: zod_1.z.number().optional(),
            longitude: zod_1.z.number().optional(),
            mapEmbedUrl: zod_1.z.string().optional(),
        }).optional(),
        isFeatured: zod_1.z.boolean().optional(),
    }),
});
exports.NeighbourhoodValidation = {
    createNeighbourhoodValidationSchema,
    updateNeighbourhoodValidationSchema,
};
