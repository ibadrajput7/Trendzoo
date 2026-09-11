import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Checkout from './pages/Checkout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

import AdminLayout from './components/AdminLayout.jsx'

// Dashboard Pages
import DashboardHome from './pages/dashboard/DashboardHome.jsx'
import AddCategory from './pages/dashboard/AddCategory.jsx'
import ViewCategories from './pages/dashboard/ViewCategories.jsx'
import AddProduct from './pages/dashboard/AddProduct.jsx'
import ViewProducts from './pages/dashboard/ViewProducts.jsx'
import Orders from './pages/dashboard/Orders.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public/Main Routes with Header & Footer */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>

      {/* Protected Routes without Header & Footer */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="categories" element={<ViewCategories />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="products" element={<ViewProducts />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>
      </Route>
    </>
  )
)

import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
