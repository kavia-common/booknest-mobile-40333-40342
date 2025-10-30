# BookNest Frontend (React)

Mobile-first React frontend for BookNest with a modern Ocean Professional theme.

## Screens
- Home: Search, category tabs (Fiction, Non-Fiction, Kids, Self-Help), and horizontal "Recommended for You".
- Book Details: Cover, title, author, price, rating, description, Add to Cart, Wishlist.
- Cart & Checkout: Quantity controls, totals, and demo checkout that generates an order.
- Profile: Basic user info and Wishlist.
- Order History: List of demo orders created via Checkout.

## Tech
- React + React Router
- Local state via Context + reducer
- Local sample data and placeholder cover images (public/assets/covers)
- Minimal CSS with theme variables (no external CSS frameworks)

## Theme (Ocean Professional)
- Primary: #2563EB
- Secondary/Success: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

## Run locally
1. Install dependencies (if not already):
   npm install
2. Start dev server:
   npm start
3. Open http://localhost:3000

No environment variables or external APIs required.

## Project structure
- src/context/StoreContext.jsx — Global store for cart, wishlist, search, category, and orders
- src/routes/* — Feature screens
- src/components/* — UI components
- src/data/books.json — Sample data
- public/assets/covers/* — Placeholder cover images

