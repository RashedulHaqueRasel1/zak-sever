# Miami Condo Backend API

A Node.js/Express backend service for managing a luxury real estate platform. 
It features a robust RESTful API to handle properties (Developments, Waterfronts), Neighbourhoods, Articles, and Customer inquiries (Contacts), as well as basic analytics.

## Tech Stack
- **Node.js & Express**: Core backend API framework
- **TypeScript**: Static typing for better maintainability and error-catching
- **MongoDB & Mongoose**: NoSQL Database and Object Document Mapper (ODM)
- **Cloudinary**: Cloud storage for property and neighborhood imagery
- **JWT**: Secure token-based Authentication
- **Zod**: Runtime schema validation for API requests
- **Nodemailer**: Email transport for system notifications and contact forms

---

## Data Flow & Core Modules

The system is organized into modular directories under `src/modules/`, ensuring a clean separation of concerns:

1. **Neighbourhood Module** (`/api/v1/neighbourhoods`)
   - **Purpose**: Represents geographical areas (e.g., Brickell, Edgewater, Miami Beach) where developments reside. 
   - **Structure**: Includes robust location data, themes/images, and available area amenities.
   - **Flow**: Neighbourhoods must be created first, as `Developments` and `Waterfronts` reference them via an `ObjectId`.

2. **Development Module** (`/api/v1/developments`)
   - **Purpose**: Core entity representing pre-construction or newly built condo projects.
   - **Structure**: Highly detailed schema with residencies, pricing, construction stages, timeline history, and galleries. References a `Neighbourhood`.
   - **Flow**: Provides comprehensive filtering and details for end-user discovery. 

3. **Waterfront Module** (`/api/v1/waterfronts`)
   - **Purpose**: Specialized single-family properties or estates that sit directly on the waterfront.
   - **Structure**: Contains location details, lat/long, dimensions, and waterfront categorization. References a `Neighbourhood`.

4. **Article Module** (`/api/v1/articles`)
   - **Purpose**: Simple CMS for news updates and blog posts regarding real estate trends.

5. **Contact Module** (`/api/v1/contacts`)
   - **Purpose**: Inquiry management system. 
   - **Flow**: When a user submits an inquiry from the frontend, it saves the lead and dispatches an email notification to the site admin via Nodemailer. Tracks status (pending/completed).

6. **Analytics Module** (`/api/v1/analytics`)
   - **Purpose**: Retrieves aggregated statistics (e.g., total properties, total leads) for the Admin Dashboard.

---

## Setup & Execution

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** running locally or via a MongoDB Atlas Cluster URI
- **Cloudinary Account** (for image handling)

### 2. Environment Variables
Create a `.env` file in the root directory. Use the structure below as your guide:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/miamicondo

# Security & Authentication
JWT_ACCESS_SECRET=your_jwt_secret_here
BCRYPT_SALT_ROUNDS=10

# Cloudinary (Required for image upload capabilities)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Admin Configurations (Optional)
ADMIN_EMAIL=admin@example.com
```

> **Note on Email configuration:** Currently, Gmail SMTP credentials are hardcoded in `src/utils/sendEmail.ts`. For a production deployment, please move the `user` and `pass` values into `.env` variables (e.g., `EMAIL_USER`, `EMAIL_PASS`).

### 3. Installation
Install the required packages using npm:
```bash
npm install
```

### 4. Running the Server

**Development Mode (Live Reloading via ts-node-dev):**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
npm start
```
*The server should now be running on `http://localhost:5000` (or whatever `PORT` you specified).*

---

## Postman Collection

A fully configured Postman collection has been provided at the root of the project to help you explore and test the API endpoints effortlessly.

### How to use:
1. Open [Postman](https://www.postman.com/).
2. Click **Import** in the top left corner.
3. Select the file **`Miami_Condo_API.postman_collection.json`** located in the root of this project.
4. The collection uses a `{{baseUrl}}` variable (defaulted to `http://localhost:5000/api/v1`). You can change this in the Collection Variables if your port or URL differs.
5. You can now execute GET, POST, PATCH, and DELETE requests using the provided example payloads!
