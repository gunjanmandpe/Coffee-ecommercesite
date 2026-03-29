import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Truck, CheckCircle, Package, ArrowLeft, Clock, History } from 'lucide-react';

const OrderTracking = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [trackingResult, setTrackingResult] = useState(null);

    const handleTrack = (e) => {
        e.preventDefault();
        setIsSearching(true);
        // Simulate API call
        setTimeout(() => {
            setTrackingResult({
                id: orderId || "ORD-8402",
                status: "In Transit",
                currentLocation: "Amsterdam Sorting Facility",
                estimatedDelivery: "Oct 28, 2023",
                milestones: [
                    { time: "Oct 25, 2023 10:30 AM", event: "Order Shipped", location: "Warehouse 1, London", completed: true },
                    { time: "Oct 26, 2023 02:15 PM", event: "Arrived at Regional Hub", location: "Antwerp Distribution Center", completed: true },
                    { time: "Oct 27, 2023 09:00 AM", event: "Processing at Sort Facility", location: "Amsterdam Sort Facility", completed: true },
                    { time: "Expected by tonight", event: "In Transit to Local Hub", location: "Rotterdam Depot", completed: false },
                    { time: "TBC", event: "Out for Delivery", location: "Your Address", completed: false }
                ]
            });
            setIsSearching(false);
        }, 1200);
    };

    return (
        <div className="tracking-page" style={{ paddingTop: '150px', paddingBottom: '100px', backgroundColor: 'var(--primary-color)', minHeight: '100vh', color: 'white' }}>
            <div className="container">
                <Link to="/profile" className="btn-text" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '40px', fontSize: '12px' }}>
                    <ArrowLeft size={16} /> BACK TO PROFILE
                </Link>

                <div className="tracking-header" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px' }}>
                    <h2 className="serif" style={{ fontSize: '42px', marginBottom: '15px' }}>Track Your Order</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Enter your Order ID (ORD-XXXX) to see real-time updates on your premium coffee delivery.</p>
                </div>

                <div className="tracking-input-card" style={{ 
                    background: 'rgba(255,255,255,0.03)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '40px',
                    borderRadius: '4px',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <form onSubmit={handleTrack} style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} />
                            <input 
                                type="text" 
                                placeholder="Enter Order ID (e.g. ORD-8402)" 
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '16px 16px 16px 45px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'white',
                                    borderRadius: '4px',
                                    fontSize: '15px',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>
                        <button className="btn btn-primary" style={{ padding: '0 40px', height: '56px' }} disabled={isSearching}>
                            {isSearching ? 'SEARCHING...' : 'TRACK'}
                        </button>
                    </form>
                </div>

                {trackingResult && (
                    <div className="tracking-results grid" style={{ gridTemplateColumns: 'minmax(280px, 1fr) 2fr', gap: '40px', maxWidth: '1000px', margin: '60px auto 0' }}>
                        <div className="status-overview">
                            <div className="status-card" style={{ 
                                padding: '30px', 
                                background: 'rgba(255,255,255,0.02)', 
                                border: '1px solid rgba(255,255,255,0.05)',
                                borderRadius: '4px'
                            }}>
                                <span style={{ fontSize: '11px', color: 'var(--accent-color)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Status</span>
                                <h3 style={{ fontSize: '24px', margin: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>{trackingResult.status}</h3>
                                
                                <div style={{ marginBottom: '20px' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '5px' }}>SHIPPING TO</p>
                                    <p style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                                        <MapPin size={16} color="var(--accent-color)" /> Amsterdam Sorting Facility
                                    </p>
                                </div>

                                <div>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '5px' }}>ESTIMATED DELIVERY</p>
                                    <p style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                                        <Clock size={16} color="var(--accent-color)" /> {trackingResult.estimatedDelivery}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="timeline-container">
                            <h4 className="serif" style={{ fontSize: '22px', marginBottom: '30px' }}>Tracking Timeline</h4>
                            <div className="timeline-list">
                                {trackingResult.milestones.map((milestone, idx) => (
                                    <div key={idx} className={`timeline-item ${milestone.completed ? 'completed' : 'pending'}`} style={{ 
                                        position: 'relative', 
                                        paddingLeft: '40px', 
                                        paddingBottom: '30px',
                                        borderLeft: idx === trackingResult.milestones.length - 1 ? '2px solid transparent' : '2px solid rgba(255,255,255,0.05)'
                                    }}>
                                        <div style={{ 
                                            position: 'absolute', 
                                            left: '-9px', 
                                            top: '0', 
                                            width: '18px', 
                                            height: '18px', 
                                            borderRadius: '50%', 
                                            background: milestone.completed ? 'var(--accent-color)' : '#333',
                                            border: '2px solid var(--primary-color)',
                                            zIndex: 2
                                        }}>
                                            {milestone.completed && <CheckCircle size={10} color="white" style={{ position: 'absolute', top: '1px', left: '1px' }} />}
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '11px', color: milestone.completed ? 'white' : 'var(--text-muted)', fontWeight: '700' }}>{milestone.time}</p>
                                            <h5 style={{ fontSize: '16px', margin: '5px 0', color: milestone.completed ? 'white' : 'rgba(255,255,255,0.4)' }}>{milestone.event}</h5>
                                            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{milestone.location}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <style>{`
                .timeline-item.completed:hover::before {
                    background: var(--accent-color);
                    opacity: 0.1;
                }
                .timeline-item::after {
                    content: '';
                    position: absolute;
                    left: -2px;
                    top: 0;
                    width: 2px;
                    height: 100%;
                    background: rgba(166, 124, 82, 0.3);
                    display: ${'milestone.completed' ? 'block' : 'none'};
                }
            `}</style>
        </div>
    );
};

export default OrderTracking;
