import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Contexts
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './CartContext';

// Public Pages
import Homepage from './Components/Homepage/Homepage';
import Cart from './Components/Cart/Cart';
import Register from './Components/Register/Register';
import Checkout from './Components/Checkout/Checkout';
import Account from './Components/Account/Account';
import About from './Components/About/About';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import OrderPage from './Components/Order/OrderPage';
import Shop from './Components/Shop/Shop';
import Contact from './Components/Contact/Contact';
import Wishlist from './Components/Wishlist/Wishlist';
import Signin from './Components/Signin/Signin';
import GovtVsDim2Door from './Components/GovtVsDim2Door/GovtVsDim2Door';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashBoard';
import ProductList from './pages/Admin/ProductsList';
import AddProduct from './pages/Admin/AddProduct';
import EditProduct from './pages/Admin/EditProduct';

// Role Dashboards
import RetailerDashboard from './pages/Retailer/ResellerDashboard';
import DeliveryDashboard from './pages/Delivery/DeliveryManDashboard';

// Auth Middleware
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<About />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register" element={<Register />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/account" element={<Account />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-complete" element={<OrderPage />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/compare" element={<GovtVsDim2Door />} />

              {/* Admin Dashboard Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="Admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              >
                <Route index element={<h1>Welcome, Admin Prince Sarker</h1>} />
                <Route path="products" element={<ProductList />} />
                <Route path="products/add" element={<AddProduct />} />
                <Route path="products/edit/:id" element={<EditProduct />} />
              </Route>

              {/* Retailer Dashboard */}
              <Route
                path="/retailer"
                element={
                  <ProtectedRoute requiredRole="Retailer">
                    <RetailerDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Delivery Dashboard */}
              <Route
                path="/delivery"
                element={
                  <ProtectedRoute requiredRole="Delivery Personnel">
                    <DeliveryDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
