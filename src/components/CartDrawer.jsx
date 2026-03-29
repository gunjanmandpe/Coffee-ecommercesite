import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
    const { 
        cartItems, 
        removeFromCart, 
        updateQuantity, 
        isCartOpen, 
        setIsCartOpen,
        cartTotal
    } = useCart();

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
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div 
                        className="cart-overlay"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={overlayVariants}
                        onClick={() => setIsCartOpen(false)}
                    />

                    {/* Drawer */}
                    <motion.div 
                        className="cart-drawer"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={drawerVariants}
                    >
                        <div className="cart-header">
                            <h3>Shopping Cart ({cartItems.length})</h3>
                            <button onClick={() => setIsCartOpen(false)} className="close-btn">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="cart-items">
                            {cartItems.length === 0 ? (
                                <div className="empty-cart flex-center" style={{ flexWrap: 'column', height: '100%' }}>
                                    <p>Your cart is empty</p>
                                    <button onClick={() => setIsCartOpen(false)} className="btn btn-outline" style={{ marginTop: '20px' }}>
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <div className="item-image">
                                            <img src={item.img} alt={item.title} />
                                        </div>
                                        <div className="item-details">
                                            <h4>{item.title}</h4>
                                            <p className="item-price">{item.price}</p>
                                            <div className="quantity-controls">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                    <Minus size={14} />
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="cart-footer">
                                <div className="cart-subtotal">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <p className="tax-note">Taxes and shipping calculated at checkout</p>
                                <Link 
                                    to="/checkout" 
                                    className="btn btn-primary checkout-btn flex-center"
                                    onClick={() => setIsCartOpen(false)}
                                    style={{ textDecoration: 'none', display: 'flex' }}
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
