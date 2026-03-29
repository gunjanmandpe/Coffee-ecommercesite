import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Heart, User, LogOut, ChevronDown, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistItems, setIsWishlistOpen } = useWishlist();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
  };

  return (
    <>
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="header-container" style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" className="logo">NEBU</Link>
          
          <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
            <div className="mobile-menu-header">
              <span className="logo">NEBU</span>
              <X size={24} onClick={() => setIsMobileMenuOpen(false)} style={{ cursor: 'pointer' }} />
            </div>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
            <Link to="/subscriptions" onClick={() => setIsMobileMenuOpen(false)}>Subscriptions</Link>
            <Link to="/story" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
            <Link to="/gift-guide" onClick={() => setIsMobileMenuOpen(false)}>Gift Guide</Link>
            
            <div className="mobile-only-links">
              <div className="mobile-auth-divider" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', width: '100%', margin: '20px 0' }}></div>
              
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>My Profile</Link>
                  <Link to="/track-order" onClick={() => setIsMobileMenuOpen(false)}>Track Order</Link>
                  <button 
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} 
                    className="mobile-logout-btn"
                    style={{ background: 'transparent', border: 'none', color: '#ff4757', textAlign: 'left', padding: '0', fontSize: 'inherit', fontFamily: 'inherit', cursor: 'pointer', display: 'block' }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => { setIsLoginModalOpen(true); setIsMobileMenuOpen(false); }}
                  className="mobile-login-btn"
                  style={{ background: 'transparent', border: 'none', color: 'var(--accent-color)', textAlign: 'left', padding: '0', fontSize: 'inherit', fontFamily: 'inherit', cursor: 'pointer', display: 'block' }}
                >
                  Sign In / Register
                </button>
              )}
            </div>
          </nav>

          <div className="header-actions">
            <div className="header-icon-group" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div className="header-icon" onClick={() => { setIsWishlistOpen(true); setIsMobileMenuOpen(false); }}>
                <Heart size={20} strokeWidth={1.5} />
                {wishlistItems.length > 0 && <span className="counter-badge">{wishlistItems.length}</span>}
              </div>

              <div className="header-icon" onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}>
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && <span className="counter-badge">{cartCount}</span>}
              </div>

              <div className="auth-separator"></div>

              {user ? (
                <div className="user-dropdown-container">
                  <div className="header-icon user-logged-in" onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={20} strokeWidth={1.5} />
                    <span className="user-name-header" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{user.name}</span>
                    <ChevronDown size={14} style={{ opacity: 0.5, transform: isUserDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'var(--transition-smooth)' }} />
                  </div>
                  {isUserDropdownOpen && (
                    <div className="dropdown-menu visible">
                      <p className="dropdown-header">Account Activity</p>
                      <Link to="/profile" className="dropdown-item" onClick={() => setIsUserDropdownOpen(false)}>My Profile</Link>
                      <Link to="/track-order" className="dropdown-item" onClick={() => setIsUserDropdownOpen(false)}>Track Order</Link>
                      <button onClick={handleLogout} className="dropdown-item logout-action">Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="header-icon" onClick={() => setIsLoginModalOpen(true)}>
                  <User size={20} strokeWidth={1.5} />
                </div>
              )}

              <div className="menu-trigger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu size={24} />
              </div>
            </div>
          </div>
        </div>
      </header>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
};

export default Header;
