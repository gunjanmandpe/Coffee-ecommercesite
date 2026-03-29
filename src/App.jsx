import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Story from './pages/Story';
import Subscriptions from './pages/Subscriptions';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

import GiftGuide from './pages/GiftGuide';
import Policy from './pages/Policy';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import OrderTracking from './pages/OrderTracking';

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
            <div className="app">
              <AnnouncementBar />
              <Header />
              <CartDrawer />
              <WishlistDrawer />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/story" element={<Story />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/gift-guide" element={<GiftGuide />} />
                <Route path="/checkout" element={<Checkout />} />
                
                {/* Policy & Support Routes */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/track-order" element={<OrderTracking />} />
                
                {/* Policy & Support Routes */}
                <Route path="/shipping" element={<Policy />} />
                <Route path="/returns" element={<Policy />} />
                <Route path="/privacy" element={<Policy />} />
                <Route path="/terms" element={<Policy />} />
                <Route path="/contact" element={<Policy />} />
              </Routes>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
