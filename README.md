# Cat Care App

A full-stack application for managing cat care, including feeding schedules, health tracking, and more.

## Project Structure

```
cat-care-app/
├── frontend/                # React TypeScript frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   ├── types/         # TypeScript type definitions
│   │   ├── services/      # API services
│   │   ├── assets/        # Static assets
│   │   └── styles/        # Global styles
│   └── package.json
│
├── backend/                # Node.js TypeScript backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── utils/         # Utility functions
│   │   └── config/        # Configuration files
│   └── package.json
│
└── package.json           # Root package.json for workspace
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install:all
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update the values as needed

4. Start the development servers:
   ```bash
   # Start both frontend and backend
   npm run dev

   # Start frontend only
   npm run start:frontend

   # Start backend only
   npm run start:backend
   ```

## Available Scripts

- `npm run dev`: Start both frontend and backend in development mode
- `npm run start:frontend`: Start frontend development server
- `npm run start:backend`: Start backend development server
- `npm run install:all`: Install dependencies for all workspaces

## Tech Stack

### Frontend
- React
- TypeScript
- React Query
- React Router
- Styled Components

### Backend
- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
