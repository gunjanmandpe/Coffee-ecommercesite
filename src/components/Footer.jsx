import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';

const Footer = () => (
  <footer>
    <div className="container">
      <div className="grid footer-grid">
        <div className="footer-col">
          <Link to="/" className="logo">NEBU</Link>
          <p style={{ marginTop: '20px', opacity: 0.7, fontSize: '14px' }}>Elevating your daily coffee ritual with premium, small-batch roasts delivered to your door.</p>
        </div>
        <div className="footer-col">
          <h4>SHOP</h4>
          <Link to="/shop">Shop All</Link>
          <Link to="/shop">Best Sellers</Link>
          <Link to="/subscriptions">Subscriptions</Link>
          <Link to="/gift-guide">Gift Guide</Link>
        </div>
        <div className="footer-col">
          <h4>SUPPORT</h4>
          <Link to="/returns">Returns & Exchanges</Link>
          <Link to="/story">Our Story</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div className="footer-col">
          <h4>CONNECT</h4>
          <a href="#"><Instagram size={16} /> Instagram</a>
          <a href="#"><Facebook size={16} /> Facebook</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 NEBU Coffee. All Rights Reserved.</p>
        <div className="footer-legal">
          <Link to="/privacy">Privacy Policy</Link> | <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
