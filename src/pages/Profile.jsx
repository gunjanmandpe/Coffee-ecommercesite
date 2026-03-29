import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Heart, User, Settings, LogOut, ChevronRight, MapPin, CreditCard, ShoppingBag, Clock } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const { wishlistItems } = useWishlist();
  const [activeTab, setActiveTab] = useState('orders');
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="section flex-center" style={{ minHeight: '70vh', flexDirection: 'column', gap: '20px' }}>
        <h2 className="serif">Please login to view your profile</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Return Home</button>
      </div>
    );
  }

  const mockOrders = [
    {
      id: "ORD-7291",
      date: "Oct 12, 2023",
      total: "$42.00",
      status: "Delivered",
      items: ["Ethiopian Yirgacheffe", "Ceramic Pour-over Set"]
    },
    {
      id: "ORD-8402",
      date: "Nov 05, 2023",
      total: "$28.50",
      status: "In Transit",
      items: ["Midnight Roast (Whole Bean)"]
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-page" style={{ paddingTop: '150px', paddingBottom: '100px', backgroundColor: 'var(--primary-color)', minHeight: '100vh', color: 'white' }}>
      <div className="container">
        <div className="profile-header" style={{ marginBottom: '60px' }}>
          <div className="hero-subline">WELCOME BACK</div>
          <h1 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>{user.name}</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>{user.email}</p>
        </div>

        <div className="profile-content grid" style={{ gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '60px' }}>
          {/* Sidebar */}
          <aside className="profile-sidebar">
            <nav className="profile-nav" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                className={`profile-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <Package size={20} /> Order History
              </button>
              <button 
                className={`profile-nav-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
                onClick={() => setActiveTab('wishlist')}
              >
                <Heart size={20} /> My Wishlist {wishlistItems.length > 0 && `(${wishlistItems.length})`}
              </button>
              <button 
                className={`profile-nav-btn ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                <User size={20} /> Account Details
              </button>
              <button 
                className="profile-nav-btn"
                onClick={() => navigate('/track-order')}
              >
                <MapPin size={20} /> Track Your Order
              </button>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '20px 0' }}></div>
              <button className="profile-nav-btn logout-btn" onClick={handleLogout}>
                <LogOut size={20} /> Sign Out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="profile-main">
            {activeTab === 'orders' && (
              <div className="orders-section">
                <h3 className="serif" style={{ fontSize: '28px', marginBottom: '30px' }}>Your Orders</h3>
                {mockOrders.length > 0 ? (
                  <div className="orders-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {mockOrders.map(order => (
                      <div key={order.id} className="order-card" style={{ 
                        background: 'rgba(255,255,255,0.03)', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '30px',
                        borderRadius: '4px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                          <div>
                            <span style={{ fontSize: '11px', color: 'var(--accent-color)', fontWeight: '700', letterSpacing: '1px' }}>{order.id}</span>
                            <div style={{ fontSize: '14px', marginTop: '5px' }}>Placed on {order.date}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: '700', fontSize: '18px', color: 'white' }}>{order.total}</div>
                            <div style={{ 
                              fontSize: '12px', 
                              marginTop: '8px', 
                              backgroundColor: order.status === 'Delivered' ? 'rgba(46, 213, 115, 0.1)' : 'rgba(255, 165, 0, 0.1)',
                              color: order.status === 'Delivered' ? '#2ed573' : '#ffa500',
                              padding: '4px 12px',
                              borderRadius: '20px'
                            }}>
                              {order.status}
                            </div>
                          </div>
                        </div>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>Items:</p>
                          <ul style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            {order.items.map((item, idx) => (
                              <li key={idx} style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <ShoppingBag size={14} color="var(--accent-color)" /> {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div style={{ marginTop: '25px', display: 'flex', gap: '15px' }}>
                          <Link to="/track-order" className="btn-text" style={{ fontSize: '12px' }}>
                            TRACK ORDER <ChevronRight size={14} />
                          </Link>
                          <button className="btn-text" style={{ fontSize: '12px', opacity: 0.6 }}>VIEW DETAILS</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: '60px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)' }}>
                    <p style={{ color: 'var(--text-muted)' }}>You haven't placed any orders yet.</p>
                    <Link to="/shop" className="btn btn-primary" style={{ marginTop: '20px' }}>START SHOPPING</Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="wishlist-section">
                <h3 className="serif" style={{ fontSize: '28px', marginBottom: '30px' }}>My Wishlist</h3>
                {wishlistItems.length > 0 ? (
                  <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '30px' }}>
                    {wishlistItems.map(item => (
                      <div key={item.id} className="product-card" style={{ background: 'transparent' }}>
                        <div className="product-image" style={{ height: '250px' }}>
                          <img src={item.image} alt={item.name} />
                          <div className="product-overlay">
                            <Link to={`/shop`} className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '12px' }}>VIEW PRODUCT</Link>
                          </div>
                        </div>
                        <div className="product-info" style={{ padding: '15px 0' }}>
                          <h4 style={{ color: 'white' }}>{item.name}</h4>
                          <p className="product-price" style={{ marginTop: '5px' }}>{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: '60px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)' }}>
                    <Heart size={40} style={{ opacity: 0.2, marginBottom: '20px' }} />
                    <p style={{ color: 'var(--text-muted)' }}>Your wishlist is empty.</p>
                    <Link to="/shop" className="btn btn-primary" style={{ marginTop: '20px' }}>BROWSE SHOP</Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'details' && (
              <div className="details-section">
                <h3 className="serif" style={{ fontSize: '28px', marginBottom: '30px' }}>Account Details</h3>
                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                  <div className="detail-group">
                    <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Full Name</label>
                    <div style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>{user.name}</div>
                  </div>
                  <div className="detail-group">
                    <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Email Address</label>
                    <div style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>{user.email}</div>
                  </div>
                  <div className="detail-group">
                    <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Default Shipping</label>
                    <div style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
                      221B Baker Street<br />London, UK
                    </div>
                  </div>
                  <div className="detail-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button className="btn btn-outline" style={{ padding: '15px 30px', width: '100%' }}>EDIT PROFILE</button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        .profile-nav-btn {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px 20px;
          width: 100%;
          text-align: left;
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          transition: var(--transition-smooth);
          font-family: inherit;
          font-size: 15px;
          border-radius: 4px;
        }

        .profile-nav-btn:hover {
          background: rgba(255,255,255,0.05);
          color: white;
        }

        .profile-nav-btn.active {
          background: rgba(166, 124, 82, 0.1);
          color: var(--accent-color);
          font-weight: 600;
        }

        .logout-btn:hover {
          background: rgba(255, 71, 87, 0.1);
          color: #ff4757;
        }

        @media (max-width: 900px) {
          .profile-content {
            grid-template-columns: 1fr !important;
          }
          .profile-sidebar {
            order: 2;
          }
          .profile-main {
            order: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
