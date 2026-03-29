import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistDrawer = () => {
    const { wishlistItems, toggleWishlist, isWishlistOpen, setIsWishlistOpen } = useWishlist();
    const { addToCart } = useCart();

    const drawerVariants = {
        closed: { x: '100%', transition: { type: 'spring', damping: 40, stiffness: 300 } },
        open: { x: 0, transition: { type: 'spring', damping: 40, stiffness: 300 } }
    };

    const overlayVariants = {
        closed: { opacity: 0 },
        open: { opacity: 1 }
    };

    return (
        <AnimatePresence>
            {isWishlistOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div 
                        className="wishlist-overlay"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={overlayVariants}
                        onClick={() => setIsWishlistOpen(false)}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 2000 }}
                    />

                    {/* Drawer */}
                    <motion.div 
                        className="wishlist-drawer"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={drawerVariants}
                        style={{ position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '450px', height: '100vh', background: 'var(--primary-color)', zIndex: 2001, display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(140, 100, 66, 0.2)' }}
                    >
                        <div className="cart-header" style={{ padding: '30px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '24px', color: 'white', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <Heart size={24} fill="var(--accent-color)" color="var(--accent-color)" /> 
                                Favorites ({wishlistItems.length})
                            </h3>
                            <button onClick={() => setIsWishlistOpen(false)} className="close-btn" style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="cart-items" style={{ flexGrow: 1, overflowY: 'auto', padding: '30px' }}>
                            {wishlistItems.length === 0 ? (
                                <div className="empty-cart flex-center" style={{ flexWrap: 'column', height: '100%', textAlign: 'center' }}>
                                    <p style={{ opacity: 0.5, marginBottom: '20px' }}>Your favorites list is empty</p>
                                    <button onClick={() => setIsWishlistOpen(false)} className="btn btn-outline" style={{ marginTop: '20px' }}>
                                        Browse Roasts
                                    </button>
                                </div>
                            ) : (
                                wishlistItems.map((item) => (
                                    <div key={item.id} className="cart-item" style={{ display: 'flex', gap: '20px', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '20px' }}>
                                        <div className="item-image" style={{ width: '90px', height: '90px', borderRadius: '4px', overflow: 'hidden', background: '#1a1a1a' }}>
                                            <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div className="item-details" style={{ flexGrow: 1 }}>
                                            <h4 style={{ color: 'white', fontSize: '16px', marginBottom: '5px' }}>{item.title}</h4>
                                            <p style={{ color: 'var(--accent-color)', fontWeight: '700', fontSize: '14px', marginBottom: '15px' }}>{item.price}</p>
                                            <button 
                                                className="btn btn-primary" 
                                                style={{ padding: '8px 15px', fontSize: '12px' }}
                                                onClick={() => { addToCart(item); setIsWishlistOpen(false); }}
                                            >
                                                Add to Bag
                                            </button>
                                        </div>
                                        <button 
                                            className="remove-btn" 
                                            style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}
                                            onClick={() => toggleWishlist(item)}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default WishlistDrawer;
