import React, { useEffect, useState } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { User, LogOut, Menu, X, ShoppingCart, MessageSquare, Bell, Briefcase } from "lucide-react";
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    window.location.href="/";
  };

  const isHomePage = pathname === "/";
  const navbarBg = scrolled || !isHomePage ? "bg-white" : "bg-[#013914]";
  const textColor = scrolled || !isHomePage ? "text-gray-700" : "text-white";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarBg} h-[80px] flex items-center`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              <span className={isHomePage && !scrolled ? "text-white" : "text-[#404145]"}>fiverr</span>
              <span className="text-green-500">.</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`${textColor} p-2 rounded-md hover:bg-opacity-20 hover:bg-gray-100`}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/business" className={`${textColor} hover:text-green-500 transition-colors`}>
              Fiverr Business
            </Link>
            <Link to="/explore" className={`${textColor} hover:text-green-500 transition-colors`}>
              Explore
            </Link>
            <Link to="/language" className={`${textColor} hover:text-green-500 transition-colors`}>
              English
            </Link>

            {currentUser ? (
              <div className="relative group">
                <div className="flex items-center space-x-2 cursor-pointer">
                  {currentUser.img ? (
                    <img
                      src={currentUser.img}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">
                      {currentUser.name?.[0]?.toUpperCase() || "A"}
                    </div>
                  )}
                  <span className={textColor}>{currentUser.name || "User"}</span>
                </div>

                {/* Dropdown Menu */}
                <div className="absolute right-0 w-56 mt-0.5 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                  {/* Common Option: Verify Account */}
                  <div className="py-1 border-b">
                    <Link to="/verify" className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-100">
                      <Bell className="w-4 h-4 mr-2" />
                      Verify Account
                    </Link>
                  </div>

                  {/* Seller Options */}
                  {currentUser.isSeller ? (
                    <div>
                      <div className="py-1 border-b">
                        <div className="px-4 py-1 text-xs font-semibold text-gray-500">Seller</div>
                        <Link to="/myGigs" className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-100">
                          <Briefcase className="w-4 h-4 mr-2" />
                          My Gigs
                        </Link>
                        <Link to="/addGig" className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-100">
                          <span className="w-4 h-4 mr-2 text-lg">+</span>
                          Add New Gig
                        </Link>
                        <Link to="/orders" className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-100">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Orders
                        </Link>
                        <Link to="/messages" className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-100">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Messages
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="py-1 border-b">
                        <div className="px-4 py-1 text-xs font-semibold text-gray-500">Buyer</div>
                        <Link to="/orders" className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-100">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Orders
                        </Link>
                        <Link to="/messages" className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-100">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Messages
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Logout */}
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-black hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className={`${textColor} hover:text-green-500 transition-colors`}>
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
                >
                  Join
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
