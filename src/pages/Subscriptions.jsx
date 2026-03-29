import React from 'react';
import Reveal from '../components/Reveal';
import { motion } from 'framer-motion';
import { Package, Calendar, Settings, Gift } from 'lucide-react';

const Subscriptions = () => {
  return (
    <div className="subscriptions-page" style={{ paddingTop: '150px', background: 'var(--primary-color)', color: 'white' }}>
      <section className="section sub-hero">
        <div className="container">
          <Reveal>
            <p className="serif" style={{ color: 'var(--accent-color)', letterSpacing: '4px', textAlign: 'center', marginBottom: '20px' }}>ALWAYS FRESH</p>
            <h1 style={{ fontSize: 'clamp(40px, 8vw, 80px)', textAlign: 'center', marginBottom: '40px' }}>Roasts on Repeat.</h1>
            <p style={{ textAlign: 'center', opacity: 0.6, maxWidth: '700px', margin: '0 auto 60px' }}>Never run out of your favorite beans again. Join the NEBU Subscribe & Save program to receive exclusive roasts at up to 20% off every single month.</p>
          </Reveal>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
            {[
              { title: 'The Enthusiast', price: '$24', tag: 'MONTHLY', desc: '1 bag of our seasonal single-origin roasts, curated by our master roasters.' },
              { title: 'The Connoisseur', price: '$42', tag: 'POPULAR', desc: '2 bags of our finest roasts, delivered fresh to your door every 30 days.' },
              { title: 'The Professional', price: '$78', tag: 'BEST VALUE', desc: '4 bags of diverse roasts, perfect for large families or small offices.' }
            ].map((plan, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="sub-card" style={{ padding: '60px 40px', background: i === 1 ? 'var(--accent-color)' : '#1a1a1a', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', borderRadius: '4px' }}>
                  <p className="sub-tag" style={{ fontSize: '12px', letterSpacing: '2px', opacity: 0.7, marginBottom: '15px', fontWeight: '800' }}>{plan.tag}</p>
                  <h3 className="serif" style={{ fontSize: '32px', marginBottom: '20px' }}>{plan.title}</h3>
                  <div className="sub-price" style={{ fontSize: '48px', fontWeight: '800', marginBottom: '15px' }}>{plan.price} <span style={{ fontSize: '18px', opacity: 0.6 }}>/ mo</span></div>
                  <p style={{ opacity: 0.7, marginBottom: '30px', minHeight: '80px' }}>{plan.desc}</p>
                  <button className="btn btn-outline" style={{ width: '100%', borderColor: 'white', color: 'white' }}>Select Plan</button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section benefits" style={{ background: '#0a0a0a' }}>
        <div className="container">
          <Reveal>
            <h2 className="serif" style={{ textAlign: 'center', marginBottom: '60px', fontSize: '40px' }}>Why Subscribe?</h2>
          </Reveal>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '50px' }}>
            {[
              { icon: <Package size={32} />, title: 'Exclusive Roasts', desc: 'Subscribers get first access to our most precious, small-yield microlots.' },
              { icon: <Calendar size={32} />, title: 'Flexible Delivery', desc: 'Change your frequency, skip a month, or cancel anytime from your dashboard.' },
              { icon: <Settings size={32} />, title: 'Customize Selection', desc: 'Choose your prefered roasts or let us surprise you with seasonal favorites.' },
              { icon: <Gift size={32} />, title: 'Surprise Gifts', desc: 'We often include sample beans and exclusive gear in our club boxes.' }
            ].map((ben, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="ben-box" style={{ textAlign: 'center' }}>
                  <div className="ben-icon" style={{ color: 'var(--accent-color)', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>{ben.icon}</div>
                  <h4 className="serif" style={{ fontSize: '20px', marginBottom: '10px' }}>{ben.title}</h4>
                  <p style={{ opacity: 0.6, fontSize: '14px' }}>{ben.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Subscriptions;
