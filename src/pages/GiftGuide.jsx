import React from 'react';
import Reveal from '../components/Reveal';
import { Gift, Coffee, Heart, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const GiftGuide = () => {
    const { addToCart } = useCart();

    const gifts = [
        {
            id: 'g1',
            title: 'The Connoisseur Bundle',
            price: '$85.00',
            numericPrice: 85,
            tag: 'FOR THE PRO',
            desc: 'A curated selection of our rarest single-origin roasts and a designer ceramic mug.',
            img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop'
        },
        {
            id: 'g2',
            title: 'Morning Ritual Kit',
            price: '$45.00',
            numericPrice: 45,
            tag: 'BEST SELLER',
            desc: 'Everything needed for the perfect morning brew: signature blend + gold scoop.',
            img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop'
        },
        {
            id: 'g3',
            title: 'Subscription Gift Card',
            price: 'From $30.00',
            numericPrice: 30,
            tag: 'DIGITAL GIFT',
            desc: 'Give the gift of never running out of coffee. 3, 6, or 12 month options.',
            img: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2071&auto=format&fit=crop'
        },
        {
            id: 'g4',
            title: 'Iced Coffee Set',
            price: '$55.00',
            numericPrice: 55,
            tag: 'LIMITED EDITION',
            desc: 'Cold brew concentrate and two double-walled glass tumblers.',
            img: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=1974&auto=format&fit=crop'
        }
    ];

    return (
        <div className="gift-guide-page">
            {/* Hero Section */}
            <section className="gift-hero flex-center" style={{ minHeight: '70vh', background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1974&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', textAlign: 'center' }}>
                <div className="container">
                    <Reveal>
                        <h1 className="serif" style={{ fontSize: 'clamp(40px, 8vw, 80px)', marginBottom: '20px' }}>The Perfect Gift</h1>
                        <p style={{ maxWidth: '600px', margin: '0 auto 40px', fontSize: '18px', opacity: 0.9 }}>Curated selections for every coffee lover in your life. From professional kits to thoughtful digital gifts.</p>
                        <Gift size={40} style={{ opacity: 0.8 }} />
                    </Reveal>
                </div>
            </section>

            {/* Gift Grid */}
            <section className="section" style={{ background: 'var(--primary-color)' }}>
                <div className="container">
                    <div className="grid gift-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                        {gifts.map((item, index) => (
                            <Reveal key={item.id} delay={index * 0.1}>
                                <div className="gift-card" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <div className="gift-image" style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
                                        <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div className="gift-tag" style={{ position: 'absolute', top: '20px', left: '20px', background: 'var(--accent-color)', color: 'black', padding: '5px 15px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' }}>{item.tag}</div>
                                    </div>
                                    <div className="gift-content" style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <h3 className="serif" style={{ fontSize: '24px', marginBottom: '10px' }}>{item.title}</h3>
                                        <p style={{ opacity: 0.7, fontSize: '15px', marginBottom: '20px', flex: 1 }}>{item.desc}</p>
                                        <div className="gift-footer flex-center" style={{ justifyContent: 'space-between', marginTop: 'auto' }}>
                                            <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--accent-color)' }}>{item.price}</span>
                                            <button 
                                                className="btn btn-primary" 
                                                style={{ padding: '10px 20px', fontSize: '14px' }}
                                                onClick={() => addToCart({ ...item, price: item.numericPrice })}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Personalized Section */}
            <section className="section" style={{ background: 'var(--secondary-color)', color: 'white' }}>
                <div className="container">
                    <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '80px' }}>
                        <Reveal>
                            <h2 className="serif" style={{ fontSize: '40px', marginBottom: '30px' }}>Not sure what to pick?</h2>
                            <p style={{ opacity: 0.8, marginBottom: '40px', lineHeight: '1.6' }}>Our coffee experts are here to help. Whether you're looking for a birthday present or a corporate gift, we can help you create a personalized bundle that leaves a lasting impression.</p>
                            <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                                <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '15px' }}>
                                    <Star size={20} color="var(--accent-color)" />
                                    <span>Customizable Bundles</span>
                                </div>
                                <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '15px' }}>
                                    <Star size={20} color="var(--accent-color)" />
                                    <span>Personalized Notes</span>
                                </div>
                                <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '15px' }}>
                                    <Star size={20} color="var(--accent-color)" />
                                    <span>Express Shipping Worldwide</span>
                                </div>
                            </div>
                            <button className="btn btn-outline" style={{ marginTop: '50px' }}>Talk to an Expert <ArrowRight size={18} style={{ marginLeft: '10px' }} /></button>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div style={{ borderRadius: '30px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
                                <img src="https://images.unsplash.com/photo-1544787210-213970fd07cb?q=80&w=2040&auto=format&fit=crop" alt="Gift Packaging" style={{ width: '100%', display: 'block' }} />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GiftGuide;
