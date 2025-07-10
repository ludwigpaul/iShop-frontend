# iShop Frontend

iShop Frontend is a React-based web application providing a modern, responsive interface for the iShop platform. It connects to the iShop backend via REST APIs and offers a seamless shopping and administration experience.

## Features

### 🛒 Customer Features
- **Product Browsing:** View products with images, descriptions, prices, and categories.
- **Search & Filter:** Search products by name and filter by category, price, or rating.
- **Product Details:** See detailed information and reviews for each product.
- **Shopping Cart:** Add, update, or remove products in the cart with real-time price calculation.
- **Checkout:** Secure checkout process with form validation and order summary.
- **User Authentication:** Register, log in, and manage user sessions.
- **Order History:** View past orders and order details.

### 🛠️ Admin Features
- **Dashboard:** Overview of sales, orders, and user statistics.
- **Product Management:** Add, edit, or delete products with image upload support.
- **Order Management:** View, update, and manage customer orders.
- **User Management:** View and manage registered users and their roles.

### 🌐 General Features
- **Responsive Design:** Mobile-friendly layout using CSS frameworks.
- **API Integration:** Communicates with the iShop backend for all data operations.
- **State Management:** Uses React Context or Redux for global state.
- **Error Handling:** User-friendly error messages and loading indicators.
- **Environment Config:** Supports `.env` files for API endpoints and secrets.

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation

1. Clone the repository:

git clone https://github.com/yourusername/ishop-frontend.git cd ishop-frontend

2. Install dependencies: 

npm install

3. Create a `.env` file for environment variables (see `.env.example` if available).

### Running the App

- Start the development server:

npm start

- Build for production:

npm run build

- Run tests:

npm test

## Folder Structure

- `src/` — React source code (components, pages, context, utils)
- `public/` — Static assets and HTML template
- `.env` — Environment variables

## Scripts

- `npm start` — Start development server
- `npm run build` — Build for production
- `npm test` — Run tests

## License

MIT
