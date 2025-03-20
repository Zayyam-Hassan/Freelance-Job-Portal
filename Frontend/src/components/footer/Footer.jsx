import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebookF, faLinkedinIn, faPinterest, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faDollarSign, faUniversalAccess } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="flex justify-center text-gray-600 mt-12 mb-4">
      <div className="w-full max-w-6xl px-6">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div>
            <h2 className="text-gray-700 font-semibold mb-3">Categories</h2>
            <ul className="space-y-1 text-sm">
              <li>Graphics & Design</li>
              <li>Digital Marketing</li>
              <li>Writing & Translation</li>
              <li>Video & Animation</li>
              <li>Music & Audio</li>
              <li>Programming & Tech</li>
              <li>Data</li>
              <li>Business</li>
              <li>Lifestyle</li>
              <li>Photography</li>
              <li>Sitemap</li>
            </ul>
          </div>
          <div>
            <h2 className="text-gray-700 font-semibold mb-3">About</h2>
            <ul className="space-y-1 text-sm">
              <li>Press & News</li>
              <li>Partnerships</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Intellectual Property Claims</li>
              <li>Investor Relations</li>
              <li>Contact Sales</li>
            </ul>
          </div>
          <div>
            <h2 className="text-gray-700 font-semibold mb-3">Support</h2>
            <ul className="space-y-1 text-sm">
              <li>Help & Support</li>
              <li>Trust & Safety</li>
              <li>Selling on Liverr</li>
              <li>Buying on Liverr</li>
            </ul>
          </div>
          <div>
            <h2 className="text-gray-700 font-semibold mb-3">Community</h2>
            <ul className="space-y-1 text-sm">
              <li>Customer Success Stories</li>
              <li>Community Hub</li>
              <li>Forum</li>
              <li>Events</li>
              <li>Blog</li>
              <li>Influencers</li>
              <li>Affiliates</li>
              <li>Podcast</li>
              <li>Invite a Friend</li>
              <li>Become a Seller</li>
              <li>Community Standards</li>
            </ul>
          </div>
          <div>
            <h2 className="text-gray-700 font-semibold mb-3">More From Fiverr</h2>
            <ul className="space-y-1 text-sm">
              <li>Liverr Business</li>
              <li>Liverr Pro</li>
              <li>Liverr Logo Maker</li>
              <li>Liverr Guides</li>
              <li>Get Inspired</li>
              <li>Liverr Select</li>
              <li>ClearVoice</li>
              <li>Liverr Workspace</li>
              <li>Learn</li>
              <li>Working Not Working</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-800">Liverr</h2>
            <span className="text-sm text-gray-500">© Liverr International Ltd. 2023</span>
          </div>

          <div className="flex items-center gap-6">
            {/* Social Media Icons */}
            <div className="flex gap-4 text-gray-500">
              <FontAwesomeIcon icon={faTwitter} className="text-xl hover:text-green-500 transition cursor-pointer" />
              <FontAwesomeIcon icon={faFacebookF} className="text-xl hover:text-green-500 transition cursor-pointer" />
              <FontAwesomeIcon icon={faLinkedinIn} className="text-xl hover:text-green-500 transition cursor-pointer" />
              <FontAwesomeIcon icon={faPinterest} className="text-xl hover:text-green-500 transition cursor-pointer" />
              <FontAwesomeIcon icon={faInstagram} className="text-xl hover:text-green-500 transition cursor-pointer" />
            </div>

            {/* Language and Currency */}
            <div className="flex items-center gap-2 text-gray-600">
              <FontAwesomeIcon icon={faGlobe} className="text-lg" />
              <span>English</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FontAwesomeIcon icon={faDollarSign} className="text-lg" />
              <span>USD</span>
            </div>

            <FontAwesomeIcon icon={faUniversalAccess} className="text-xl text-gray-500 hover:text-green-500 transition cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
