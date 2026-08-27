import { z } from 'zod';
import { EConstructionStage, ECategory, EResidenceStatus, ECurrentStage } from './development.interface';
import { EAmenities } from '../neighbourhood/neighbourhood.interface';

const residenceValidationSchema = z.object({
  residenceType: z.string({ required_error: 'Residence type is required' }),
  bedrooms: z.string({ required_error: 'Bedrooms is required' }),
  bathrooms: z.string({ required_error: 'Bathrooms is required' }),
  interiorSize: z.string({ required_error: 'Interior size is required' }),
  terraceSize: z.string({ required_error: 'Terrace size is required' }),
  startingPrice: z.number({ required_error: 'Starting price is required' }),
  status: z.nativeEnum(EResidenceStatus, { required_error: 'Status is required' }),
  floorPlan: z.string({ required_error: 'Floor plan is required' }),
});

const pageContentSchema = z.object({
  hoa: z.string().optional(),
  constructionProgress: z.object({
    stage: z.string(),
    percentage: z.number().min(0).max(100),
  }).optional(),
  projectFeatures: z.array(z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().url(),
    imagePosition: z.enum(['left', 'right']),
  })).optional(),
  team: z.object({
    developer: z.string().optional(),
    architect: z.string().optional(),
    interiorDesign: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
  moreViewImages: z.array(z.string().url()).optional(),
  marketPositions: z.array(z.object({ percentage: z.string(), title: z.string(), subtitle: z.string() })).optional(),
  investmentSignals: z.array(z.object({ brandName: z.string(), title: z.string(), subtitle: z.string() })).optional(),
  ourTake: z.object({
    description: z.string().optional(), image: z.string().url().optional(), hoa: z.string().optional(),
    rentalPolicy: z.string().optional(), delivery: z.string().optional(), height: z.string().optional(),
    developer: z.string().optional(), architect: z.string().optional(), interiors: z.string().optional(),
  }).optional(),
  locationAndNeighborhood: z.object({ mapEmbedUrl: z.string().optional(), images: z.array(z.string().url()).max(2).optional() }).optional(),
  amenitiesSection: z.object({
    title: z.string().optional(), subtitle: z.string().optional(),
    items: z.array(z.object({ icon: z.string().url().optional(), title: z.string(), subtitle: z.string() })).optional(),
  }).optional(),
  upperPenthouse: z.object({ title: z.string().optional(), subtitle: z.string().optional(), images: z.array(z.string().url()).optional() }).optional(),
  closingImage: z.string().url().optional(),
});

const createDevelopmentValidationSchema = z.object({
  body: z.object({
    developmentName: z.string({ required_error: 'Development name is required' }),
    propertySlug: z.string({ required_error: 'Property slug is required' }),
    selectedNeighbourhood: z.string({ required_error: 'Selected neighbourhood ID is required' }),
    address: z.string({ required_error: 'Address is required' }),
    city: z.string({ required_error: 'City is required' }),
    startingPrice: z.number({ required_error: 'Starting price is required' }),
    constructionStage: z.nativeEnum(EConstructionStage, { required_error: 'Construction stage is required' }),
    deliveryYear: z.string({ required_error: 'Delivery year is required' }),
    developer: z.string({ required_error: 'Developer is required' }),
    pricePerSqft: z.number({ required_error: 'Price per sqft is required' }),
    bedrooms: z.string({ required_error: 'Bedrooms info is required' }),
    stories: z.number({ required_error: 'Stories is required' }),
    totalResidencies: z.number({ required_error: 'Total residencies is required' }),
    sizeRange: z.string({ required_error: 'Size range is required' }),
    heroImage: z.string({ required_error: 'Hero image is required' }),
    galleryImages: z.array(
      z.object({
        url: z.string({ required_error: 'Gallery image URL is required' }),
        index: z.number({ required_error: 'Gallery image index is required' }),
      })
    ).min(1, 'At least one gallery image is required'),
    projectOverview: z.string({ required_error: 'Project overview is required' }),
    shortIntroduction: z.string({ required_error: 'Short introduction is required' }),
    amenities: z.array(z.nativeEnum(EAmenities)),
    category: z.array(z.nativeEnum(ECategory)).min(1, 'At least one category is required'),
    features: z.array(z.string()).min(1, 'At least one feature is required'),
    depositStructure: z.string({ required_error: 'Deposit structure is required' }),
    salesProgress: z.string({ required_error: 'Sales progress is required' }),
    rentalPolicy: z.string({ required_error: 'Rental policy is required' }),
    currentStage: z.nativeEnum(ECurrentStage).optional(),
    expectedDelivery: z.string().optional(),
    residences: z.array(residenceValidationSchema),
    pageContent: pageContentSchema.optional(),
  }),
});

const updateDevelopmentValidationSchema = z.object({
  body: z.object({
    developmentName: z.string().optional(),
    propertySlug: z.string().optional(),
    selectedNeighbourhood: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    startingPrice: z.number().optional(),
    constructionStage: z.nativeEnum(EConstructionStage).optional(),
    deliveryYear: z.string().optional(),
    developer: z.string().optional(),
    pricePerSqft: z.number().optional(),
    bedrooms: z.string().optional(),
    stories: z.number().optional(),
    totalResidencies: z.number().optional(),
    sizeRange: z.string().optional(),
    heroImage: z.string().optional(),
    galleryImages: z.array(
      z.object({
        url: z.string().optional(),
        index: z.number().optional(),
      })
    ).optional(),
    projectOverview: z.string().optional(),
    shortIntroduction: z.string().optional(),
    amenities: z.array(z.nativeEnum(EAmenities)).optional(),
    category: z.array(z.nativeEnum(ECategory)).optional(),
    features: z.array(z.string()).optional(),
    depositStructure: z.string().optional(),
    salesProgress: z.string().optional(),
    rentalPolicy: z.string().optional(),
    currentStage: z.nativeEnum(ECurrentStage).optional(),
    expectedDelivery: z.string().optional(),
    residences: z.array(residenceValidationSchema.partial()).optional(),
    pageContent: pageContentSchema.partial().optional(),
  }),
});

export const DevelopmentValidation = {
  createDevelopmentValidationSchema,
  updateDevelopmentValidationSchema,
};
