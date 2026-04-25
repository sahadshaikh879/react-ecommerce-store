# LOREM — Industrial Premium E-Commerce

A modern, high-end React.js e-commerce application built with a focus on stability, premium industrial aesthetics, and robust state management. This project was developed as a technical assessment to demonstrate advanced React concepts, including protected routing, real-time search, and persistent cart management.

## 🚀 Vision & Design
The application follows a **Zero-Border-Radius** industrial aesthetic. Every element is designed with high-contrast, sharp edges, and premium typography to create a unique urban boutique experience.

## ✨ Key Features
- **Secure Authentication**: Integrated with DummyJSON Auth. Features persistent sessions and protected routes.
- **Shop Architecture**: Dual-view architectural pattern (Entrance Portal vs. Active Store).
- **Real-Time Data**: Live product synchronization with search, filtering, and detailed specifications.
- **Persistent Cart**: A full-featured "Shopping Bag" including quantity adjustment, subtotal calculations, and LocalStorage recovery.
- **Product Details**: Editorial split-screen layout with an interactive image gallery and sticky purchase bar.
- **Stability First**: Defensive coding patterns to prevent runtime crashes and handle malformed API/Storage data.

## 🛠️ Tech Stack
- **Framework**: [React 18](https://reactjs.org/) (Vite + TypeScript)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **API**: [DummyJSON](https://dummyjson.com/)
- **Icons**: Custom SVG + Lucide React (Stability-Optimized)

## 📦 Setup Instructions

### Pre-requisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository and navigate to the project root:
   ```bash
   cd ecommerce-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### 🔑 Test Credentials
The app is fully protected. Use these credentials to enter:
- **Username**: `emilys`
- **Password**: `emilyspass`

## 🧩 Architectural Decisions
- **Redux over Context**: Redux Toolkit was chosen to ensure a scalable state boundary, specifically for the complex interaction between the cart totals and the product details view.
- **URL-Driven UI**: The "Portal/Store" view state is managed via URL Search Params, ensuring the browser's "Back" button behaves intuitively for the user.
- **Responsive-First**: Layouts are built using a mobile-first approach, transitioning to sophisticated grid systems for desktop views.

---
*Created by Sahad as a Senior React Assessment.*
