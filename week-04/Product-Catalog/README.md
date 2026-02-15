# 🛍️ Week 4 Assignment – React Router v7 Product Catalog

This project is a multi-page Product Catalog built using **React Router v7**.

The application demonstrates nested routing, dynamic routes, and navigation using React Router.

---

## 🚀 Functional Requirements Implemented

### 1️⃣ Routes

The app includes the following routes:

- `/` → Home Page  
- `/products` → Products Layout + Product List  
- `/products/:id` → Product Details (Dynamic Route)  
- `*` → 404 Not Found Page  

---

### 2️⃣ Navigation

- A top navigation bar is visible on all pages.
- Uses `NavLink` for navigation.
- Active link styling is applied.

---

### 3️⃣ Products Data

- Local products array (no API used).
- Minimum 6 products.
- Each product includes:
  - `id`
  - `name`
  - `price`
  - `category`
  - `description`

---

### 4️⃣ Nested Routes

- `/products` acts as a layout route.
- Includes:
  - Page heading
  - Description placeholder
  - `<Outlet />` for nested rendering
- Product List and Product Details render inside the layout.

---

### 5️⃣ Product List Page

- Displays all products in a responsive grid.
- Each product includes a "View Details" button.
- Routes to `/products/:id`.

---

### 6️⃣ Product Details Page

- Uses `useParams()` to read product ID.
- Displays selected product details.
- Includes Back button using `useNavigate(-1)`.
- Handles invalid IDs with a professional "Product not found" message.

---

## 🧠 React Router Concepts Used

- `createBrowserRouter`
- `RouterProvider`
- Nested Routes
- `<Outlet />`
- `useParams()`
- `useNavigate()`
- `NavLink`

---

## 📂 Project Structure


src/
├── components/
│ └── Navbar.jsx
├── pages/
│ ├── Home.jsx
│ ├── ProductsLayout.jsx
│ ├── ProductsList.jsx
│ ├── ProductDetails.jsx
│ └── NotFound.jsx
├── data/
│ └── products.js
└── main.jsx


---

## 🛠️ Installation & Running

Clone the repository:


git clone https://github.com/Farzana921/react-projects/tree/main/week-04/Product-Catalog

cd YOUR-REPO-NAME
npm install
npm run dev


---

## 👩‍💻 Author

Farzana  
GitHub: https://github.com/Farzana921