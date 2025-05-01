# WiFi QR Code Backend

Backend API for WiFi QR Code Management System. This service provides endpoints for managing WiFi QR codes with user authentication.

## Features

- User authentication with JWT
- CRUD operations for WiFi QR codes
- QR code generation for WiFi networks
- Data persistence with JSON files
- TypeScript support
- CORS enabled

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd wifi-qr-code-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the environment variables in `.env` file:
```
PORT=5002
JWT_SECRET=your-jwt-secret-key-here
```

## Development

Run the development server:
```bash
npm run dev
```

The server will start on http://localhost:5002 (or the port specified in your .env file).

## Build

Build the project:
```bash
npm run build
```

## API Endpoints

### Authentication

#### Register User
- **POST** `/api/auth/register`
- Body:
```json
{
  "username": "string",
  "password": "string"
}
```

#### Login
- **POST** `/api/auth/login`
- Body:
```json
{
  "username": "string",
  "password": "string"
}
```

### QR Codes

All QR code endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

#### Create QR Code
- **POST** `/api/qrcodes`
- Body:
```json
{
  "label": "string",
  "ssid": "string",
  "password": "string",
  "securityType": "WPA|WEP|nopass",
  "isHidden": "boolean",
  "description": "string (optional)"
}
```

#### Get User's QR Codes
- **GET** `/api/qrcodes`

#### Update QR Code
- **PUT** `/api/qrcodes/:id`
- Body: Same as Create QR Code

#### Delete QR Code
- **DELETE** `/api/qrcodes/:id`

## Project Structure

```
src/
├── controllers/     # Request handlers
├── middleware/      # Custom middleware
├── models/         # Data models
├── routes/         # API routes
├── utils/          # Utility functions
└── index.ts        # App entry point
```

## Data Storage

The application uses JSON files for data storage:
- `data/users.json`: User accounts
- `data/qr-codes.json`: QR code data

## Error Handling

The API returns standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- CORS enabled for frontend access
- Environment variables for sensitive data
