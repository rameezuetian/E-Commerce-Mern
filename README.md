# E-Commerce MERN

A full-stack e-commerce application built with the MERN stack. This repository currently contains the backend API for the platform, with product, user, authentication, password reset, admin management, and order-related functionality.

## Project Overview

This application provides a REST API for:

- User registration and login
- JWT-based authentication
- Password reset and forgot password flows
- User profile and account management
- Admin user management
- Product creation, updates, deletion, and reviews
- Order management APIs

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cookie-based sessions
- Nodemailer for email delivery
- dotenv for environment configuration

## Project Structure

```text
E-Commerce Mern/
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   ├── config/
│   │   ├── config.env
│   │   └── database.js
│   ├── controller/
│   │   ├── orderController.js
│   │   ├── productcontroller.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── catchAsyncError.js
│   │   └── error.js
│   ├── models/
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── orderRoutes.js
│   │   ├── productRoute.js
│   │   └── userRoute.js
│   └── utils/
│       ├── apifeatures.js
│       ├── errorhandler.js
│       ├── jwtToke.js
│       └── sendEmail.js
├── frontend/
└── README.md
```

## Prerequisites

Before running this project, make sure you have:

- Node.js installed
- MongoDB running locally or a MongoDB connection URI
- A mail service configured for password reset emails


## Installation

1. Open the backend folder:

```bash
cd "E-Commerce Mern/backend"
```

2. Install dependencies:

```bash
npm install
```


```

## Run the application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server runs on:

```text
http://localhost:5000
```

## Available API Endpoints

### Auth & User Routes

```text
POST /api/v1/register
POST /api/v1/login
POST /api/v1/password/forgot
PUT /api/v1/password/reset/:token
GET /api/v1/logout
GET /api/v1/me
PUT /api/v1/password/update
PUT /api/v1/me/update
GET /api/v1/admin/users
GET /api/v1/admin/user/:id
PUT /api/v1/admin/user/:id
DELETE /api/v1/admin/user/:id
```

### Product Routes

```text
GET /api/v1/products
POST /api/v1/product/new
PUT /api/v1/product/:id
DELETE /api/v1/product/:id
GET /api/v1/product/:id
PUT /api/v1/review
GET /api/v1/reviews
DELETE /api/v1/reviews
```

### Order Routes

```text
GET /api/v1/orders
POST /api/v1/order/new
GET /api/v1/order/:id
PUT /api/v1/order/:id
DELETE /api/v1/order/:id
```

## Features Implemented

- Secure user registration and login
- JWT-based authentication and authorization
- Role-based access control for admin routes
- Password reset via email
- Product CRUD operations
- Reviews and rating support
- Order processing endpoints
- Error handling middleware
- MongoDB database connection setup

## Notes

- The project is structured as a backend-first e-commerce API.
- The `frontend` folder is included for future client-side development.
- If you want to run complete full-stack functionality, you will need to connect this API to a frontend app.

## License

This project is for learning and development purposes.

## Author

Built as a MERN stack e-commerce backend project.

