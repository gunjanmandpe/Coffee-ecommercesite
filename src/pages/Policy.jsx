import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Reveal from '../components/Reveal';

const Policy = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const getPolicyData = () => {
        switch (pathname) {
            case '/shipping':
                return {
                    title: 'Shipping & Delivery',
                    content: `
                        <h3>Standard Shipping</h3>
                        <p>We offer standard shipping to all major cities in India. Orders are typically processed within 1-2 business days and delivered within 3-5 business days. We take great care in packaging our premium coffee to ensure it arrives fresh and in perfect condition.</p>
                        <h3>International Shipping</h3>
                        <p>Currently, we only ship within India. However, we are working on expanding our reach. Stay tuned for updates!</p>
                        <h3>Tracking Your Order</h3>
                        <p>Once your order has been shipped, you will receive a confirmation email with a tracking number. You can use this number on our carrier's website to monitor the status of your delivery.</p>
                    `
                };
            case '/returns':
                return {
                    title: 'Returns & Exchanges',
                    content: `
                        <h3>Perishable Goods</h3>
                        <p>Due to the perishable nature of coffee, we are unable to accept returns on roasted coffee. However, your satisfaction is our top priority. If there is an issue with your order (e.g., incorrect item sent, damaged packaging), please contact us within 48 hours of delivery.</p>
                        <h3>Brewing Gear</h3>
                        <p>Unused and unopened brewing equipment can be returned within 14 days of purchase for a full refund. Please ensure all original packaging is intact. Return shipping costs are the responsibility of the customer unless the item is defective.</p>
                        <h3>How to Start a Return</h3>
                        <p>To initiate a return for non-coffee items, please email us at support@nebucoffee.com with your order number and the reason for the return.</p>
                    `
                };
            case '/privacy':
                return {
                    title: 'Privacy Policy',
                    content: `
                        <p>Your privacy is important to us. This policy explains how NEBU Coffee collects, uses, and protects your personal information when you visit our website or make a purchase.</p>
                        <h3>Information Collection</h3>
                        <p>We collect information such as your name, email address, shipping address, and payment details when you create an account or place an order. We also use cookies to enhance your browsing experience and analyze site traffic.</p>
                        <h3>Data Usage</h3>
                        <p>Your information is used to process orders, communicate with you about your purchases, and send promotional offers (if you've opted in). We do not sell your personal data to third parties.</p>
                        <h3>Security</h3>
                        <p>We implement industry-standard security measures, including 256-bit SSL encryption, to protect your sensitive information during transmission.</p>
                    `
                };
            case '/terms':
                return {
                    title: 'Terms of Service',
                    content: `
                        <h3>Acceptance of Terms</h3>
                        <p>By using the NEBU Coffee website, you agree to comply with and be bound by these Terms of Service. Please read them carefully.</p>
                        <h3>Use of Site</h3>
                        <p>The content on this site is for your general information and use only. It is subject to change without notice. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.</p>
                        <h3>Pricing and Availability</h3>
                        <p>All prices are in INR (Indian Rupees) unless otherwise stated. We reserve the right to change prices and discontinue products at any time. In the event of an error in pricing, we reserve the right to cancel any orders placed at the incorrect price.</p>
                        <h3>Intellectual Property</h3>
                        <p>All trademarks, logos, and content on this site are the property of NEBU Coffee and are protected by intellectual property laws. Reproduction without written consent is prohibited.</p>
                    `
                };
            case '/contact':
                return {
                    title: 'Contact Us',
                    content: `
                        <p>Have a question about our roasts or need help with an order? Our team is here to assist you.</p>
                        <h3>Get in Touch</h3>
                        <p><strong>Email:</strong> support@nebucoffee.com</p>
                        <p><strong>Phone:</strong> +91 98765 43210</p>
                        <p><strong>Address:</strong> 123 Coffee Lane, Civil Lines, Nagpur, Maharashtra - 440001</p>
                        <h3>Wholesale Inquiries</h3>
                        <p>Interested in serving NEBU at your cafe or office? Contact our wholesale team at wholesale@nebucoffee.com for bulk pricing and partnership opportunities.</p>
                    `
                };
            default:
                return { title: 'Legal Information', content: '<p>Please contact us for more information.</p>' };
        }
    };

    const { title, content } = getPolicyData();

    return (
        <div className="policy-page section" style={{ paddingTop: '180px', background: 'var(--primary-color)', color: 'white', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <Reveal>
                    <h1 className="serif" style={{ fontSize: '48px', marginBottom: '40px' }}>{title}</h1>
                    <div className="policy-content" style={{ opacity: 0.8, lineHeight: '1.8', fontSize: '17px' }} dangerouslySetInnerHTML={{ __html: content }} />
                </Reveal>
            </div>
        </div>
    );
};

export default Policy;
