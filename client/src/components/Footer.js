import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-midnight text-linen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h3 className="text-2xl font-serif font-bold" style={{color:'#C9B07A'}}>
                Satwa
              </h3>
            </Link>
            <p className="text-linen/80 text-sm leading-relaxed">
              Discover the finest collection of premium jewellery. Each piece tells a story of elegance, 
              craftsmanship, and timeless beauty.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-linen/70 hover:text-polishedGold transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-linen/70 hover:text-polishedGold transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-linen/70 hover:text-polishedGold transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-linen/70 hover:text-polishedGold transition-colors">
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-linen/80 hover:text-polishedGold transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-linen/80 hover:text-polishedGold transition-colors text-sm">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-linen/80 hover:text-polishedGold transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-linen/80 hover:text-polishedGold transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop?category=necklaces" className="text-linen/80 hover:text-polishedGold transition-colors text-sm">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link to="/shop?category=earrings" className="text-linen/80 hover:text-polishedGold transition-colors text-sm">
                  Earrings
                </Link>
              </li>
              <li>
                <Link to="/shop?category=rings" className="text-linen/80 hover:text-polishedGold transition-colors text-sm">
                  Rings
                </Link>
              </li>
              <li>
                <Link to="/shop?category=bracelets" className="text-linen/80 hover:text-polishedGold transition-colors text-sm">
                  Bracelets
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FiMapPin className="w-5 h-5" style={{color:'#C9B07A'}} />
                <span className="text-linen/80 text-sm">
                  123 Jewellery Street<br />
                  New York, NY 10001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5" style={{color:'#C9B07A'}} />
                <span className="text-linen/80 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="w-5 h-5" style={{color:'#C9B07A'}} />
                <span className="text-linen/80 text-sm">info@satwa.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-linen/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-linen/70 text-sm">
              © 2024 Satwa. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-linen/70 hover:text-polishedGold transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-linen/70 hover:text-polishedGold transition-colors">
                Terms of Service
              </Link>
              <Link to="/shipping" className="text-linen/70 hover:text-polishedGold transition-colors">
                Shipping Info
              </Link>
              <Link to="/returns" className="text-linen/70 hover:text-polishedGold transition-colors">
                Returns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
