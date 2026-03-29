import React from 'react';
import Reveal from '../components/Reveal';
import { motion } from 'framer-motion';

const Story = () => {
  return (
    <div className="story-page" style={{ paddingTop: '150px', background: 'var(--primary-color)', color: 'white' }}>
      <section className="section story-hero">
        <div className="container">
          <Reveal>
            <p className="serif" style={{ color: 'var(--accent-color)', letterSpacing: '4px', textAlign: 'center', marginBottom: '20px' }}>SINCE 2024</p>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 80px)', textAlign: 'center', marginBottom: '40px' }}>Our Roasting Journey.</h1>
          </Reveal>
          
          <div className="grid" style={{ gridTemplateColumns: '1fr 1.2fr', gap: '80px', alignItems: 'center' }}>
            <Reveal>
              <div className="story-img-frame">
                <img src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=800" alt="Roasting Beans" style={{ width: '100%', height: '600px', objectFit: 'cover' }} />
              </div>
            </Reveal>
            <div className="story-text">
              <Reveal delay={0.2}>
                <h2 className="serif" style={{ fontSize: '32px', marginBottom: '30px' }}>It started with a single bean.</h2>
                <p style={{ fontSize: '18px', opacity: 0.8, marginBottom: '20px', lineHeight: '1.8' }}>
                  NEBU was born from a deep obsession with the alchemy of coffee. We believe that roasting is more than a process—it's a dialogue with the bean. Founded in 2024, our small-batch roastery in the heart of the city works directly with regenerative coffee farmers across Africa and Latin America.
                </p>
                <p style={{ fontSize: '18px', opacity: 0.8, marginBottom: '20px', lineHeight: '1.8' }}>
                  Every roast is profiled to bring out the untamed terroir of its origin. From the high-altitude citrus notes of Ethiopian Yirgacheffe to the deep, chocolatey body of Guatemalan Antigua, we don't just sell coffee—we share a legacy.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section philosophy">
        <div className="container">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {[
              { title: 'The Farmers', desc: 'We source exclusively from farms that receive at least 300% above Fair Trade minimums.' },
              { title: 'The Roast', desc: 'Light, Medium, or Dark—our master roasters listen to the second crack for the perfect balance.' },
              { title: 'The Experience', desc: 'Crafting the ultimate morning ritual requires more than beans; it requires intention.' }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="phi-box" style={{ padding: '40px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h3 className="serif" style={{ fontSize: '24px', marginBottom: '15px', color: 'var(--accent-color)' }}>{item.title}</h3>
                  <p style={{ opacity: 0.7 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Story;
