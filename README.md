# LŪMEN Botanicals — Minimalist Cosmetic E-Commerce Website

A simple, clean, minimalist cosmetic and skincare e-commerce website built with **Django REST Framework** (Backend) and **React + Vite** (Frontend).

---

## 🌟 Overview & Key Features

### 1. Project Setup & Architecture
- **Backend**: Django 5.2 with Django REST Framework (DRF) and `django-cors-headers`.
- **Database**: SQLite (`db.sqlite3`), fully relational with models for Categories, Products, Orders, and OrderItems.
- **Frontend**: React 19 + Vite, built with Vanilla CSS for full control over aesthetics, typography, and micro-animations.
- **REST APIs**: Full bidirectional JSON REST endpoints connecting the React client with the Django database.

### 2. Minimalist Luxury Aesthetics & Design
- **Curated Palette**: Warm alabaster, sand ivory, soft terracotta, nude rose, matte black typography, and champagne gold accents.
- **Modern Typography**: Editorial serif (`Cormorant Garamond`) paired with ultra-clean modern sans-serif (`Plus Jakarta Sans`).
- **Responsive Layout**: Fluid experience across mobile phones, tablets, and desktop displays.
- **Interactive Micro-animations**: Image hover zooms, pill badge filters, smooth flyout cart drawer, and celebratory order confirmation modals.

### 3. Product Listing & Catalog
- **Django Product Model**: Stores title, slug, price, original price, description, active botanical ingredients, ritual guide, volume/weight, rating, reviews, stock, and high-res imagery.
- **Clean Grid Layout**: Responsive 4-column desktop / 2-column mobile card grid with quick actions.
- **Product Details Modal**: Rich ritual view with high-res photography, complete ingredients list, usage guide, quantity selector, and instant add-to-bag.
- **Category Filter & Search**: Instant filtering across *All Products*, *Skincare*, *Serums & Oils*, *Lip Care*, and *Cleansers*, accompanied by live text search and sort options.

### 4. Shopping Cart
- **Cart Management**: Add items to cart with single click or custom quantities.
- **Quantity Adjustments**: Increment, decrement, or remove items with automatic recalculation.
- **Price Calculation**: Real-time subtotal, free delivery progress bar (orders over ₹999 unlock complimentary shipping), and grand total.
- **Persistence**: Saved to browser local storage so user sessions are preserved.

### 5. Checkout & Order Processing
- **Streamlined Checkout Form**: Collects customer full name, email, phone number, street delivery address, city, postal code, and delivery notes.
- **Order Summary**: Real-time breakdown of items ordered, shipping fees, and final payable amount.
- **Database Persistence**: Atomic database transaction creates `Order` record and relational `OrderItem` records in SQLite.
- **Order Confirmation Receipt**: Displays reference order number (e.g. `#1002`), customer details, delivery timeline, and ordered items breakdown.

### 6. Django Admin Panel
- Accessible at `http://127.0.0.1:8000/admin/`.
- Preconfigured superuser credentials provided.
- Allows administrators to add, update, manage stock, and delete products and categories.
- Allows administrators to view customer orders and inspect item breakdowns inline.

---

## 📋 REST API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health/` | Service health status and catalog summary |
| `GET` | `/api/categories/` | List all product categories with counts |
| `GET` | `/api/products/` | List products with query filters (`?category=`, `?search=`, `?sort=`) |
| `GET` | `/api/products/<id>/` | View individual product details |
| `POST` | `/api/orders/` | Submit a customer order with items payload |
| `GET` | `/api/orders/<id>/` | Fetch order confirmation status and receipt items |

---

## 🚀 Quick Start & How to Run the Project

### Prerequisites
- **Python 3.10+** (Python 3.9+ supported)
- **Node.js 18+** & **npm**

---

### Step 1: Backend Setup (Django)

1. Open a terminal in the project root (`e:\sanjproject\website\`):
   ```bash
   cd e:\sanjproject\website
   ```

2. (Optional) Activate a virtual environment if desired:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On Linux/macOS:
   source venv/bin/activate
   ```

3. Install required Python packages:
   ```bash
   pip install django djangorestframework django-cors-headers pillow
   ```

4. Run migrations and populate the database with seed products:
   ```bash
   python manage.py migrate
   python seed_db.py
   ```
   *Note: This creates the preconfigured superuser:*
   - **Username**: `admin`
   - **Password**: `admin123`

5. Start the Django development server:
   ```bash
   python manage.py runserver 127.0.0.1:8000
   ```
   The Django backend is now active at `http://127.0.0.1:8000/`.
   The Django Admin portal is accessible at `http://127.0.0.1:8000/admin/`.

---

### Step 2: Frontend Setup (React + Vite)

1. Open a second terminal and navigate to the `frontend` folder:
   ```bash
   cd e:\sanjproject\website\frontend
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The React application is now live at `http://127.0.0.1:5173/`!

---

### Step 3: Run Automated Backend Tests

To verify that all REST APIs and order persistence functionality work correctly:
```bash
python test_backend_api.py
```
Expected output:
```text
1. Testing Health API: Status: 200
2. Testing Categories API: Status: 200
3. Testing Products List API: Status: 200
4. Testing Category Filtering: Status: 200
5. Testing Product Detail API: Status: 200
6. Testing Order Submission API: Status: 201
All Backend REST API tests passed successfully!
```

---

## 📂 Project Directory Structure

```text
website/
├── backend/                  # Django project configuration
│   ├── settings.py           # CORS, DRF, SQLite, and Media configuration
│   ├── urls.py               # Main URL router with /api/ and /admin/
│   ├── wsgi.py
│   └── asgi.py
├── api/                      # Django REST API application
│   ├── models.py             # Category, Product, Order, OrderItem
│   ├── serializers.py        # DRF Serializers with order atomic validation
│   ├── views.py              # List, Detail, Filter, and Create views
│   ├── urls.py               # API routing endpoints
│   └── admin.py              # Customized Django admin with inlines & filters
├── media/                    # Uploaded / seeded cosmetic product assets
│   └── products/             # High-res cosmetic product photography
├── frontend/                 # React application
│   ├── public/               # Public assets & product images
│   ├── src/
│   │   ├── components/       # Navbar, Hero, ProductGrid, ProductCard,
│   │   │                     # ProductDetailModal, CartDrawer, CheckoutModal,
│   │   │                     # OrderSuccessModal, Footer, Toast
│   │   ├── context/          # CartContext (cart state & persistent storage)
│   │   ├── services/         # api.js (fetch wrappers for REST endpoints)
│   │   ├── App.jsx           # Main application view & state orchestration
│   │   ├── index.css         # Complete Luxury Minimalist CSS Design System
│   │   └── main.jsx          # React DOM entry point
│   ├── package.json
│   └── vite.config.js        # Vite build tool & proxy to Django backend
├── seed_db.py                # Database population script with 8 cosmetic products
├── test_backend_api.py       # Automated integration test script
└── README.md                 # Project documentation
```

---

## 🔐 Admin Portal Access
- **URL**: `http://127.0.0.1:8000/admin/`
- **Username**: `admin`
- **Password**: `admin123`

You can use the admin panel to create new products, upload images, update inventory/stock levels, and inspect orders placed by customers.
