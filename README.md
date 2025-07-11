# iShop Frontend

## Introduction
This is the frontend for the iShop e-commerce platform, built with React.js and Material UI. It provides user, admin, and worker interfaces for shopping, order management, and dashboard operations.

---

## Features

### User
- Register, verify email, and login
- Browse products and categories
- Add products to cart and place orders
- View and update profile
- View order history and order details

### Admin
- Secure admin login (JWT)
- View all users
- View all orders (with assigned worker name or "Not assigned yet")
- Assign orders to workers
- View all workers
- View orders assigned to a specific worker

### Worker
- Secure worker login (JWT)
- View assigned orders
- Mark orders as completed (triggers email notification to user)

---

## Tech Stack

- **React.js** (with hooks)
- **Material UI** (UI components)
- **React Router** (routing)
- **Axios** (API requests)
- **JWT** (authentication, via backend)
- **Stripe** (payment integration)

---

## Project Structure

```
src/
├── components/          # Reusable components
├── pages/               # Page components
├── services/            # API service functions
├── store/               # Redux store and slices
├── styles/              # Global styles and themes
├── utils/               # Utility functions
├── App.js               # Main application component
├── index.js             # Entry point
└── setupTests.js        # Test setup
```
---

## Environment Variables

Create a `.env` file in the root with:

REACT_APP_API_URL=http://localhost:3000/api/v1

---

## How to Run

1. Install Node.js.
2. Run `npm install` in the `ishop-frontend/` directory.
3. Set up your `.env` file as above.
4. Start the app:
5. The app will run at `http://localhost:3002` (or as configured).

---

## Authentication

- JWT tokens are stored in `localStorage` after login.
- Tokens are sent in the `Authorization` header for protected API requests.
- Role-based redirects are handled in `App.js`.

---

## Key Libraries

- **react**: UI framework
- **@mui/material**: Material UI components
- **react-router-dom**: Routing
- **axios**: HTTP requests
- **jwt-decode**: JWT parsing
- **stripe-js**: Payment integration

---

## Notes

- The frontend expects the backend to be running and accessible at the API URL.
- Admin and worker dashboards require valid JWT tokens and roles.
- Email verification is required for new users.

---

## Future Enhancements

- Responsive/mobile UI improvements
- Enhanced error handling and notifications
- User order history and tracking
- Product search and filtering
- Multi-language support

---

## License

MIT