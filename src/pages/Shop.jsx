import React, { useState, useMemo } from 'react';
import Reveal from '../components/Reveal';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Heart, Search, Filter, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { products as allProducts } from '../data/products';

const Shop = () => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    
    // Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRoasts, setSelectedRoasts] = useState([]);
    const [selectedOrigins, setSelectedOrigins] = useState([]);
    const [maxPrice, setMaxPrice] = useState(40);
    const [sortBy, setSortBy] = useState('featured');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const roasts = ['Light Roast', 'Medium Roast', 'Dark Roast', 'Extra Dark', 'Espresso'];
    const origins = ['Americas', 'Africa', 'Asia'];

    const handleRoastToggle = (roast) => {
        setSelectedRoasts(prev => 
            prev.includes(roast) ? prev.filter(r => r !== roast) : [...prev, roast]
        );
    };

    const handleOriginToggle = (origin) => {
        setSelectedOrigins(prev => 
            prev.includes(origin) ? prev.filter(o => o !== origin) : [...prev, origin]
        );
    };

    const clearFilters = () => {
        setSelectedRoasts([]);
        setSelectedOrigins([]);
        setMaxPrice(40);
        setSearchTerm('');
    };

    const filteredProducts = useMemo(() => {
        let filtered = allProducts.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRoast = selectedRoasts.length === 0 || selectedRoasts.includes(product.tag);
            const matchesOrigin = selectedOrigins.length === 0 || selectedOrigins.includes(product.origin);
            const matchesPrice = product.price <= maxPrice;
            return matchesSearch && matchesRoast && matchesOrigin && matchesPrice;
        });

        if (sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'alphabetical') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        }

        return filtered;
    }, [searchTerm, selectedRoasts, selectedOrigins, maxPrice, sortBy]);

    return (
        <div className="shop-page section" style={{ paddingTop: '180px', background: 'var(--primary-color)', minHeight: '100vh' }}>
            <div className="container">
                <Reveal>
                    <div className="shop-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <p className="serif" style={{ color: 'var(--accent-color)', letterSpacing: '4px', textTransform: 'uppercase' }}>Our Coffee Collection</p>
                        <h2 style={{ fontSize: '56px', marginBottom: '20px', color: 'white' }}>Exceptional Beans, <br/>Expertly Roasted.</h2>
                    </div>
                </Reveal>

                <div className="shop-controls-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="search-bar-container" style={{ position: 'relative', width: '300px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, color: 'white' }} />
                        <input 
                            type="text" 
                            placeholder="Search our roasts..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%', padding: '12px 15px 12px 45px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: 'white', borderRadius: '4px' }}
                        />
                    </div>
                    
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div className="sort-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '14px', opacity: 0.6 }}>Sort by:</span>
                            <select 
                                value={sortBy} 
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{ background: 'transparent', color: 'white', border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="alphabetical">A - Z</option>
                            </select>
                        </div>
                        <button 
                            className="mobile-filter-trigger" 
                            onClick={() => setIsMobileFilterOpen(true)}
                            style={{ display: 'none', alignItems: 'center', gap: '8px', background: 'var(--accent-color)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px' }}
                        >
                            <SlidersHorizontal size={16} /> Filters
                        </button>
                    </div>
                </div>

                <div className="shop-layout" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '60px' }}>
                    {/* Sidebar Filter */}
                    <aside className="shop-sidebar">
                        <div className="sidebar-section" style={{ marginBottom: '40px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h4 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Categories</h4>
                                {(selectedRoasts.length > 0 || selectedOrigins.length > 0 || searchTerm !== '') && (
                                    <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: 'var(--accent-color)', fontSize: '12px', cursor: 'pointer' }}>Clear All</button>
                                )}
                            </div>
                            
                            <div className="filter-group-modern" style={{ marginBottom: '30px' }}>
                                <p style={{ fontSize: '13px', fontWeight: '700', marginBottom: '15px', color: 'rgba(255,255,255,0.5)' }}>ROAST LEVEL</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {roasts.map(roast => (
                                        <label key={roast} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer', color: 'rgba(255,255,255,0.7)' }}>
                                            <input 
                                                type="checkbox" 
                                                checked={selectedRoasts.includes(roast)}
                                                onChange={() => handleRoastToggle(roast)}
                                                style={{ accentColor: 'var(--accent-color)' }}
                                            />
                                            {roast}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="filter-group-modern" style={{ marginBottom: '30px' }}>
                                <p style={{ fontSize: '13px', fontWeight: '700', marginBottom: '15px', color: 'rgba(255,255,255,0.5)' }}>ORIGIN REGION</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {origins.map(origin => (
                                        <label key={origin} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer', color: 'rgba(255,255,255,0.7)' }}>
                                            <input 
                                                type="checkbox" 
                                                checked={selectedOrigins.includes(origin)}
                                                onChange={() => handleOriginToggle(origin)}
                                                style={{ accentColor: 'var(--accent-color)' }}
                                            />
                                            {origin}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="filter-group-modern">
                                <p style={{ fontSize: '13px', fontWeight: '700', marginBottom: '15px', color: 'rgba(255,255,255,0.5)' }}>PRICE RANGE</p>
                                <input 
                                    type="range" 
                                    min="15" 
                                    max="40" 
                                    step="1"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                    style={{ width: '100%', accentColor: 'var(--accent-color)', marginBottom: '10px' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', opacity: 0.7 }}>
                                    <span>$15</span>
                                    <span>Up to ${maxPrice}.00</span>
                                </div>
                            </div>
                        </div>

                        <div className="sidebar-promo" style={{ background: 'rgba(140,100,66,0.1)', padding: '25px', borderRadius: '4px', border: '1px solid rgba(140,100,66,0.2)' }}>
                            <h5 style={{ color: 'var(--accent-color)', marginBottom: '10px' }}>Free Shipping</h5>
                            <p style={{ fontSize: '13px', opacity: 0.7 }}>On all orders over $75. Subscribe and save 15% on your first month.</p>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="shop-content">
                        <div className="shop-controls" style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
                            <p style={{ opacity: 0.6, fontSize: '14px' }}>Showing {filteredProducts.length} results</p>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px 30px' }}>
                                {filteredProducts.map((prod, i) => (
                                    <Reveal key={prod.id} delay={i * 0.05}>
                                        <div className="product-card" style={{ background: 'transparent', transition: 'transform 0.3s ease' }}>
                                            <div className="product-image-container" style={{ height: '380px', background: '#1a1a1a', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
                                                <img 
                                                    src={prod.img} 
                                                    alt={prod.title} 
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
                                                    className="main-img"
                                                />
                                                <div className="product-actions-overlay">
                                                    <button 
                                                        className={`wishlist-btn-overlay ${isInWishlist(prod.id) ? 'active' : ''}`}
                                                        onClick={(e) => { e.stopPropagation(); toggleWishlist(prod); }}
                                                        style={{ background: 'white', color: 'black', border: 'none', padding: '12px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}
                                                    >
                                                        <Heart size={20} fill={isInWishlist(prod.id) ? "var(--accent-color)" : "none"} stroke={isInWishlist(prod.id) ? "var(--accent-color)" : "currentColor"} />
                                                    </button>
                                                    <button 
                                                        className="btn btn-primary"
                                                        onClick={() => addToCart(prod)}
                                                        style={{ padding: '12px 25px', fontSize: '12px' }}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="product-info-shop" style={{ marginTop: '20px', textAlign: 'center' }}>
                                                <span style={{ color: 'var(--accent-color)', fontSize: '11px', letterSpacing: '2px', display: 'block', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 700 }}>{prod.tag}</span>
                                                <h3 style={{ fontSize: '18px', color: 'white', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>{prod.title}</h3>
                                                <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: '500' }}>${prod.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        ) : (
                            <div className="no-results" style={{ textAlign: 'center', padding: '100px 0' }}>
                                <X size={48} style={{ opacity: 0.2, marginBottom: '20px', color: 'white' }} />
                                <h3 style={{ fontSize: '24px', marginBottom: '10px', color: 'white' }}>No products found</h3>
                                <p style={{ opacity: 0.6 }}>Try adjusting your filters or search terms.</p>
                                <button onClick={clearFilters} className="btn btn-outline" style={{ marginTop: '30px', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>Reset All Filters</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <style>{`
                .product-image-container:hover .main-img {
                    transform: scale(1.05);
                }
                .product-image-container:hover .product-actions-overlay {
                    opacity: 1;
                    visibility: visible;
                }
                .product-actions-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,0.3);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 15px;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.4s ease;
                    backdrop-filter: blur(4px);
                }
                .filter-group-modern label:hover {
                    color: var(--accent-color) !important;
                }
                @media (max-width: 992px) {
                    .shop-layout {
                        grid-template-columns: 1fr !important;
                    }
                    .shop-sidebar {
                        display: none;
                    }
                    .mobile-filter-trigger {
                        display: flex !important;
                    }
                    .shop-header h2 {
                        font-size: 36px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Shop;
