# 🛍️ M&M Shop

A responsive e-commerce web app built with **React** and a **Spring Boot + MongoDB** backend.

🔗 **Live Demo:** [ecommerce-frontend-amber-sigma.vercel.app](https://ecommerce-frontend-amber-sigma.vercel.app/)

> The backend runs on a free Render instance, so the first request after inactivity may take 30–60 seconds.

## ✨ Features

- Landing page for visitors and a full store experience after login
- Register / Login with JWT authentication and protected routes
- Product catalogue with search, category filters and sorting
- Cart with coupon codes, wishlist and checkout
- Order history and order tracking
- Dark mode and fully responsive design

## 🧰 Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React 19, Vite, Tailwind CSS 4, React Router 7, Lucide Icons |
| State | React Context API, localStorage |
| Backend | Spring Boot, MongoDB, JWT (separate repo) |
| Hosting | Vercel (frontend), Render (backend) |


## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## 📁 Project Structure

```
src/
├── components/   # Reusable UI (navbar, layout, route guards, cards)
├── context/      # Auth, Cart and Wishlist state
├── hooks/        # Data-fetching hooks
├── pages/        # One file per route
├── services/     # API calls (api.js)
├── data/         # Static data (coupons, FAQs)
└── utils/        # Helpers
```

