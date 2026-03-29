import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Reveal from '../components/Reveal';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CreditCard, Truck, ShieldCheck, Mail, Phone, MapPin, Globe, CheckCircle, User, AlertCircle, Search, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const { cartItems, cartTotal } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const shipping = 0.00;
    const total = cartTotal + shipping;

    const handleCompleteOrder = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsOrderComplete(true);
            window.scrollTo(0, 0);
        }, 2000);
    };

    if (isOrderComplete) {
        return (
            <div className="section order-success flex-center" style={{ minHeight: '90vh', paddingTop: '150px', background: 'var(--primary-color)', color: 'white' }}>
                <Reveal>
                    <div className="success-card" style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: '60px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="success-icon" style={{ color: 'var(--accent-color)', marginBottom: '30px' }}><CheckCircle size={80} /></div>
                        <h2 className="serif" style={{ fontSize: '40px', marginBottom: '20px' }}>Order Confirmed!</h2>
                        <p style={{ maxWidth: '500px', margin: '0 auto 40px', opacity: 0.8, lineHeight: '1.6' }}>Thank you for choosing NEBU. Your premium roasts are being prepared. We'll send you an email with tracking details shortly.</p>
                        <Link to="/" className="btn btn-primary" style={{ padding: '15px 40px' }}>Continue Shopping</Link>
                    </div>
                </Reveal>
            </div>
        );
    }

    return (
        <div className="checkout-page section" style={{ paddingTop: '150px', background: '#F9F5F0', color: '#1A1A1A', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px' }}>
                    
                    {/* Left: Delivery & Information */}
                    <div className="checkout-left">
                        <Reveal>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>Delivery</h2>
                            
                            <form className="checkout-form" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div className="input-group">
                                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#666', marginBottom: '5px', display: 'block' }}>Country/Region</label>
                                    <div style={{ position: 'relative' }}>
                                        <select style={{ width: '100%', padding: '12px', border: '1px solid #E2E8F0', borderRadius: '4px', background: 'white', appearance: 'none' }}>
                                            <option>India</option>
                                            <option>United Arab Emirates</option>
                                            <option>United States</option>
                                        </select>
                                        <Globe size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    <input type="text" placeholder="First name" style={inputStyle} />
                                    <input type="text" placeholder="Last name" style={inputStyle} />
                                </div>

                                <input type="text" placeholder="Company (optional)" style={inputStyle} />

                                <div style={{ position: 'relative' }}>
                                    <input type="text" placeholder="Address" style={{ ...inputStyle, paddingRight: '40px' }} />
                                    <Search size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
                                </div>

                                <input type="text" placeholder="Apartment, suite, etc. (optional)" style={inputStyle} />

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                                    <input type="text" placeholder="City" style={inputStyle} />
                                    <div style={{ position: 'relative' }}>
                                        <select style={{ width: '100%', padding: '12px', border: '1px solid #E2E8F0', borderRadius: '4px', background: 'white', appearance: 'none' }}>
                                            <option>State</option>
                                            <option>Maharashtra</option>
                                            <option>Delhi</option>
                                            <option>Karnataka</option>
                                        </select>
                                    </div>
                                    <input type="text" placeholder="PIN code" style={inputStyle} />
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <input type="tel" placeholder="Phone" style={{ ...inputStyle, paddingRight: '40px' }} />
                                    <HelpCircle size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
                                </div>

                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer', marginTop: '10px' }}>
                                    <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--accent-color)' }} />
                                    Save this information for next time
                                </label>

                                <div style={{ marginTop: '40px' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Shipping method</h3>
                                    <div style={{ background: '#F7FAFC', border: '1px solid #EDF2F7', padding: '20px', borderRadius: '8px', textAlign: 'center', fontSize: '14px', color: '#718096' }}>
                                        Fast Shipping (3-5 Business Days) — $0.00
                                    </div>
                                </div>

                                <div style={{ marginTop: '40px' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Payment</h3>
                                    <p style={{ fontSize: '14px', color: '#718096', marginBottom: '20px' }}>All transactions are secure and encrypted.</p>
                                    
                                    <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
                                        {/* Card Option */}
                                        <div 
                                            onClick={() => setPaymentMethod('card')}
                                            style={{ 
                                                padding: '20px', 
                                                background: paymentMethod === 'card' ? '#F7FAFC' : 'white',
                                                borderBottom: '1px solid #E2E8F0',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #E2E8F0', background: paymentMethod === 'card' ? 'var(--accent-color)' : 'white' }}></div>
                                                <span style={{ fontWeight: '600' }}>Credit Card</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                <img src="https://img.icons8.com/color/48/visa.png" width="24" alt="visa" />
                                                <img src="https://img.icons8.com/color/48/mastercard.png" width="24" alt="mastercard" />
                                            </div>
                                        </div>
                                        <AnimatePresence>
                                            {paymentMethod === 'card' && (
                                                <motion.div 
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    style={{ overflow: 'hidden', background: '#F7FAFC' }}
                                                >
                                                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                                        <input type="text" placeholder="Card number" style={inputStyle} />
                                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                                            <input type="text" placeholder="Expiration date (MM / YY)" style={inputStyle} />
                                                            <input type="text" placeholder="Security code" style={inputStyle} />
                                                        </div>
                                                        <input type="text" placeholder="Name on card" style={inputStyle} />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* UPI Option */}
                                        <div 
                                            onClick={() => setPaymentMethod('upi')}
                                            style={{ 
                                                padding: '20px', 
                                                background: paymentMethod === 'upi' ? '#F7FAFC' : 'white',
                                                borderBottom: '1px solid #E2E8F0',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #E2E8F0', background: paymentMethod === 'upi' ? 'var(--accent-color)' : 'white' }}></div>
                                                <span style={{ fontWeight: '600' }}>Google Pay / PhonePe / UPI</span>
                                            </div>
                                            <img src="https://img.icons8.com/color/48/upi.png" width="24" alt="upi" />
                                        </div>
                                        <AnimatePresence>
                                            {paymentMethod === 'upi' && (
                                                <motion.div 
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    style={{ overflow: 'hidden', background: '#F7FAFC' }}
                                                >
                                                    <div style={{ padding: '20px' }}>
                                                        <input type="text" placeholder="Enter UPI ID (e.g. name@okhdfcbank)" style={inputStyle} />
                                                        <p style={{ fontSize: '11px', marginTop: '8px', opacity: 0.6 }}>You will receive a payment request on your mobile app.</p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Bank Transfer */}
                                        <div 
                                            onClick={() => setPaymentMethod('bank')}
                                            style={{ 
                                                padding: '20px', 
                                                background: paymentMethod === 'bank' ? '#F7FAFC' : 'white',
                                                borderBottom: '1px solid #E2E8F0',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                gap: '12px',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #E2E8F0', background: paymentMethod === 'bank' ? 'var(--accent-color)' : 'white' }}></div>
                                            <span style={{ fontWeight: '600' }}>Net Banking / Direct Transfer</span>
                                        </div>
                                        <AnimatePresence>
                                            {paymentMethod === 'bank' && (
                                                <motion.div 
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    style={{ overflow: 'hidden', background: '#F7FAFC' }}
                                                >
                                                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                                        <select style={inputStyle}>
                                                            <option>Select Bank</option>
                                                            <option>HDFC Bank</option>
                                                            <option>ICICI Bank</option>
                                                            <option>SBI</option>
                                                        </select>
                                                        <input type="text" placeholder="Account Number" style={inputStyle} />
                                                        <input type="text" placeholder="IFSC Code" style={inputStyle} />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* COD Option */}
                                        <div 
                                            onClick={() => setPaymentMethod('cod')}
                                            style={{ 
                                                padding: '20px', 
                                                background: paymentMethod === 'cod' ? '#F7FAFC' : 'white',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px'
                                            }}
                                        >
                                            <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #E2E8F0', background: paymentMethod === 'cod' ? 'var(--accent-color)' : 'white' }}></div>
                                            <span style={{ fontWeight: '600' }}>Cash on Delivery (COD)</span>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    type="button"
                                    onClick={handleCompleteOrder}
                                    disabled={isProcessing}
                                    className="btn btn-primary" 
                                    style={{ width: '100%', padding: '20px', marginTop: '30px', borderRadius: '4px', background: '#333' }}
                                >
                                    {isProcessing ? 'Processing...' : 'Pay now'}
                                </button>
                            </form>
                        </Reveal>
                    </div>

                    {/* Right: Order Summary */}
                    <aside className="checkout-right" style={{ borderLeft: '1px solid #E2E8F0', paddingLeft: '40px' }}>
                        <div style={{ position: 'sticky', top: '150px' }}>
                            <div className="summary-items" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
                                {cartItems.map(item => (
                                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', position: 'relative' }}>
                                        <div style={{ width: '64px', height: '64px', borderRadius: '8px', border: '1px solid #E2E8F0', overflow: 'hidden', background: 'white' }}>
                                            <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <span style={{ 
                                                position: 'absolute', 
                                                top: '-8px', 
                                                left: '52px', 
                                                background: '#666', 
                                                color: 'white', 
                                                width: '20px', 
                                                height: '20px', 
                                                borderRadius: '50%', 
                                                fontSize: '11px', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'center' 
                                            }}>{item.quantity}</span>
                                        </div>
                                        <div style={{ flexGrow: 1 }}>
                                            <p style={{ fontWeight: '600', fontSize: '14px' }}>{item.title}</p>
                                            <p style={{ fontSize: '12px', color: '#718096' }}>{item.tag}</p>
                                        </div>
                                        <p style={{ fontWeight: '600', fontSize: '14px' }}>${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                                <input type="text" placeholder="Gift card" style={{ ...inputStyle, flexGrow: 1 }} />
                                <button className="btn" style={{ background: '#E2E8F0', color: '#4A5568', padding: '12px 20px', fontSize: '14px', borderRadius: '4px' }}>Apply</button>
                            </div>

                            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>Shipping <HelpCircle size={14} style={{ opacity: 0.5 }} /></span>
                                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: '700', marginTop: '15px' }}>
                                    <span>Total</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '12px', color: '#718096', fontWeight: '400' }}>USD</span>
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #E2E8F0',
    borderRadius: '4px',
    fontSize: '14px',
    background: 'white'
};

export default Checkout;
