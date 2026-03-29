import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, Flame, Truck, Heart } from 'lucide-react';
import Reveal from '../components/Reveal';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { products as allProducts } from '../data/products';

const Home = () => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const products = allProducts.slice(0, 4);

    return (
        <main>
            {/* Hero Section */}
            <section className="hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1600')` }}>
                <div className="container">
                    <Reveal>
                        <div className="hero-content">
                            <motion.p 
                                className="tagline serif"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                style={{ letterSpacing: '2px', fontSize: '14px', marginBottom: '15px', color: 'var(--accent-color)' }}
                            >
                                ESTABLISHED 2024
                            </motion.p>
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                style={{ color: 'white', fontSize: 'clamp(48px, 8vw, 84px)', marginBottom: '25px', lineHeight: '1.1' }}
                            >
                                The Art of <br />Fine Coffee.
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', marginBottom: '40px', maxWidth: '600px' }}
                            >
                                Experience the perfect balance of aroma, taste, and tradition. Hand-roasted in small batches for the ultimate enthusiast.
                            </motion.p>
                            <motion.div 
                                className="hero-btns"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                style={{ display: 'flex', gap: '20px' }}
                            >
                                <Link to="/shop" className="btn btn-primary">Shop All Coffee</Link>
                                <Link to="/story" className="btn btn-outline" style={{ color: 'white', borderColor: 'white', textDecoration: 'none' }}>Explore Our Story</Link>
                            </motion.div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="section benefits-section">
                <div className="container">
                    <div className="grid benefits-grid">
                        <Reveal delay={0.1}>
                            <div className="benefit-card">
                                <Sprout size={40} />
                                <h3>Ethically Sourced</h3>
                                <p>We work directly with farmers to ensure fair trade and the highest quality beans.</p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div className="benefit-card">
                                <Flame size={40} />
                                <h3>Artisan Roasted</h3>
                                <p>Small-batch roasting to bring out the unique profile of every single origin.</p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <div className="benefit-card">
                                <Truck size={40} />
                                <h3>Fresh Delivery</h3>
                                <p>Roasted on demand and shipped same-day for peak freshness in every cup.</p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Collections */}
            <section className="section collection-section" id="shop">
                <div className="container">
                    <Reveal>
                        <div className="section-head">
                            <p className="serif" style={{ fontSize: '14px', color: 'var(--accent-color)' }}>CURATED SELECTIONS</p>
                            <h2>Explore Collections</h2>
                        </div>
                    </Reveal>
                    <div className="grid collection-grid">
                        {[
                            { title: 'THE BEANS', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800' },
                            { title: 'THE GEAR', img: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=800' },
                            { title: 'THE CLUB', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800' }
                        ].map((col, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <Link to="/shop" className="collection-card">
                                    <img src={col.img} alt={col.title} />
                                    <div className="collection-info">
                                        <h3>{col.title}</h3>
                                        <div className="btn-text">Shop Collection <ArrowRight size={16} /></div>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products */}
            <section className="section products-section">
                <div className="container">
                    <Reveal>
                        <div className="section-head">
                            <p className="serif">BEST SELLERS</p>
                            <h2>This Week's Favorites</h2>
                        </div>
                    </Reveal>
                    <div className="grid product-grid">
                        {products.map((prod, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <div className="product-card" onClick={() => addToCart(prod)} style={{ cursor: 'pointer' }}>
                                        <div className="product-image">
                                            <img src={prod.img} alt={prod.title} />
                                            <div className="product-actions-overlay">
                                                <button 
                                                    className={`wishlist-btn ${isInWishlist(prod.id) ? 'active' : ''}`}
                                                    onClick={(e) => { e.stopPropagation(); toggleWishlist(prod); }}
                                                >
                                                    <Heart size={18} fill={isInWishlist(prod.id) ? "currentColor" : "none"} />
                                                </button>
                                                <button 
                                                    className="btn-quick-add"
                                                    onClick={() => addToCart(prod)}
                                                >
                                                    Quick Add
                                                </button>
                                            </div>
                                        </div>
                                    <div className="product-info">
                                        <span className="product-tag">{prod.tag}</span>
                                        <h3 className="product-title">{prod.title}</h3>
                                        <p className="product-price">${prod.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Story - Product Highlight */}
            <section className="section story-highlight" style={{ background: 'var(--secondary-color)', color: 'var(--text-on-secondary)' }}>
                <div className="container">
                    <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '80px' }}>
                        <Reveal>
                            <div className="highlight-image" style={{ borderRadius: '2px', overflow: 'hidden', boxShadow: '30px 30px 0px var(--accent-color)' }}>
                                <img src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=80&w=800" alt="Process" style={{ width: '100%', display: 'block' }} />
                            </div>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div className="highlight-text">
                                <p className="serif" style={{ color: 'var(--accent-color)', letterSpacing: '3px', marginBottom: '20px' }}>THE PROCESS</p>
                                <h2 className="serif" style={{ fontSize: '48px', marginBottom: '30px', lineHeight: '1.2' }}>From the Volcanic <br />Soil to Your Cup.</h2>
                                <p style={{ fontSize: '18px', marginBottom: '40px', opacity: 0.8 }}>Our Midnight Velvet blend isn't just coffee; it's a journey. Grown at high altitudes in mineral-rich soil, each bean is sun-dried and hand-sorted before undergoing our signature slow-roast process.</p>
                                <Link to="/story" className="btn btn-outline" style={{ borderColor: 'var(--secondary-color)', color: 'var(--text-on-secondary)' }}>Read Full Origin Story</Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="section testimonials-section">
                <div className="container">
                    <Reveal>
                        <div className="testimonial-card">
                            <p className="testimonial-text">"NEBU is hands down the best coffee I've ever tasted. The aroma that fills my kitchen every morning is just incredible. Worth every penny."</p>
                            <p className="testimonial-author">— SARAH MORGAN, COFFEE CONNOISSEUR</p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Trust Badges / Security */}
            <section className="section trust-badges" style={{ padding: '60px 0', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                <div className="container">
                    <div className="flex-center" style={{ justifyContent: 'space-around', flexWrap: 'wrap', gap: '40px' }}>
                        {[
                            { icon: '🔒', text: 'Secure Checkout' },
                            { icon: '🌍', text: 'Global Shipping' },
                            { icon: '🌱', text: 'Organic Certified' },
                            { icon: '☕', text: 'Roasted in India' }
                        ].map((badge, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <div className="badge-item flex-center" style={{ gap: '12px' }}>
                                    <span style={{ fontSize: '24px' }}>{badge.icon}</span>
                                    <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.6 }}>{badge.text}</span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section newsletter-section">
                <div className="container">
                    <Reveal>
                        <div className="newsletter-box">
                            <p className="serif" style={{ color: 'var(--accent-color)' }}>JOIN THE CLUB</p>
                            <h2 style={{ color: 'white' }}>Get 15% off your first order</h2>
                            <p style={{ color: 'rgba(255,255,255,0.7)', margin: '20px 0' }}>Be the first to know about new roasts, exclusive events, and the science of brewing.</p>
                            <form className="newsletter-form">
                                <input type="email" placeholder="Your email address" required />
                                <button type="submit" className="btn btn-primary">Join Now</button>
                            </form>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    );
};

export default Home;
