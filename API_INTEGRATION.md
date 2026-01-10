# API Integration Guide

This guide explains how the React frontend connects to the Java Spring Boot backend API.

## Overview

The frontend now fetches product data from the Java backend API instead of using local JSON files or localStorage.

## Configuration

### 1. Environment Variables

Create a `.env` file in the `gupta-main` directory:

```bash
VITE_API_BASE_URL=http://localhost:8080/api
```

If your backend runs on a different port or URL, update this value.

### 2. API Base URL

The default API base URL is: `http://localhost:8080/api`

This can be configured via:
- `.env` file: `VITE_API_BASE_URL=http://localhost:8080/api`
- Or directly in `src/services/api.js`

## API Endpoints Used

### Products

- **GET** `/api/products` - Get all products
- **GET** `/api/products?category=Groceries` - Filter by category
- **GET** `/api/products?type=General` - Filter by type
- **GET** `/api/products?search=rice` - Search products
- **GET** `/api/products?category=Groceries&type=General` - Multiple filters
- **GET** `/api/products/{id}` - Get product by ID
- **GET** `/api/products/categories` - Get all categories
- **GET** `/api/products/types` - Get all types

## How It Works

### 1. API Service (`src/services/api.js`)

Contains all API call functions:
- `fetchProducts(filters)` - Fetch products with optional filters
- `fetchProductById(id)` - Get single product
- `fetchCategories()` - Get all categories
- `fetchTypes()` - Get all types
- `createProduct(product)` - Create new product (for admin)
- `updateProduct(id, product)` - Update product (for admin)
- `deleteProduct(id)` - Delete product (for admin)

### 2. Products Utility (`src/utils/products.js`)

Updated to:
- Fetch from API first
- Fallback to localStorage if API fails
- Final fallback to JSON file
- Maintains backward compatibility

### 3. Components Updated

#### Products.jsx
- Fetches products from API on mount
- Supports API filtering (category, type, search)
- Shows loading and error states
- Falls back to client-side filtering if API fails

#### Home.jsx
- Fetches products from API on mount
- Displays featured products, general items, and hardware
- Shows loading state

#### Categories.jsx
- Fetches products from API
- Uses API filtering when category is selected
- Falls back to client-side filtering if API fails

## Running the Application

### Step 1: Start the Java Backend

```bash
cd java-backend
mvn spring-boot:run
```

The backend will be available at: `http://localhost:8080`

### Step 2: Start the React Frontend

```bash
cd gupta-main
npm install  # if not already installed
npm run dev
```

The frontend will be available at: `http://localhost:5173` (or the port Vite assigns)

### Step 3: Verify Connection

1. Open the browser console (F12)
2. Navigate to the Products page
3. Check for successful API calls
4. Products should load from the backend

## Features

### ✅ API-First Approach
- All product data comes from the backend
- Real-time data synchronization
- Supports server-side filtering

### ✅ Fallback Support
- If API is unavailable, falls back to localStorage
- If localStorage is empty, falls back to JSON file
- Graceful error handling

### ✅ Loading States
- Shows loading spinner while fetching
- Displays error messages if API fails
- User-friendly error messages

### ✅ Filtering
- Server-side filtering for better performance
- Client-side fallback if API filtering fails
- Supports category, type, and search filters

## Troubleshooting

### Backend Not Running

**Error:** `Failed to load products. Please check if the backend server is running.`

**Solution:**
1. Make sure Java backend is running on `http://localhost:8080`
2. Test the API directly: `http://localhost:8080/api/products`
3. Check CORS configuration in backend

### CORS Error

**Error:** `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution:**
- Backend already has CORS configured
- Check `CorsConfig.java` in the backend
- Verify `application.properties` has correct CORS settings

### Connection Refused

**Error:** `NetworkError when attempting to fetch resource`

**Solutions:**
1. Check if backend is running: `curl http://localhost:8080/api/products`
2. Verify the port in `.env` file matches backend port
3. Check firewall settings

### API Returns Empty Array

**Possible causes:**
1. Database is empty (run SQL setup script)
2. Backend is not connected to database
3. Check backend logs for errors

**Solution:**
1. Run `sql/setup_complete.sql` in Supabase
2. Or ensure backend data initialization is working
3. Check backend logs for database connection errors

## Development Tips

### 1. Testing API Directly

```bash
# Get all products
curl http://localhost:8080/api/products

# Get products by category
curl http://localhost:8080/api/products?category=Groceries

# Search products
curl http://localhost:8080/api/products?search=rice
```

### 2. Viewing Network Requests

1. Open browser DevTools (F12)
2. Go to Network tab
3. Filter by "Fetch/XHR"
4. See all API calls and responses

### 3. Debugging

Check browser console for:
- API errors
- Network requests
- Response data

## Environment-Specific Configuration

### Development
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### Production
```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

## Next Steps

- [ ] Add authentication for admin endpoints
- [ ] Implement caching for better performance
- [ ] Add retry logic for failed API calls
- [ ] Implement optimistic UI updates
- [ ] Add request/response interceptors

## Support

If you encounter issues:
1. Check backend logs
2. Check browser console
3. Verify API endpoints are accessible
4. Test API directly with curl or Postman

