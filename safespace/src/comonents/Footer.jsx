import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-2">
      <div className="container mx-auto grid grid-cols-3 sm:grid-cols-3 gap-8 px-4">
        {/* Column 1 */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-bold text-white">Company</h2>
          <Link to="/about" className="hover:text-white">
            About Us
          </Link>
          <Link to="/" className="hover:text-white">
            Careers
          </Link>
          <Link to="/" className="hover:text-white">
            Press
          </Link>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-bold text-white">Support</h2>
          <Link to="/help" className="hover:text-white">
            Help Center
          </Link>
          <Link to="/ContactUs" className="hover:text-white">
            Contact Us
          </Link>
          <Link to="/FAQ" className="hover:text-white">
            FAQs
          </Link>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-bold text-white">Follow Us</h2>
          <Link to="/" className="hover:text-white">
            Twitter
          </Link>
          <Link to="/" className="hover:text-white">
            Facebook
          </Link>
          <Link to="/" className="hover:text-white">
            Instagram
          </Link>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} SafeSpace. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
