import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, LogOut } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
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
  };

  const isHomePage = pathname === "/";
  const navbarBg = scrolled || !isHomePage ? "bg-white" : "bg-[#013914]";
  const textColor = scrolled || !isHomePage ? "text-gray-700" : "text-white";

  return (
    <>
      {/* ✅ Increased navbar height */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarBg} h-[80px] flex items-center`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold">
                <span className={isHomePage && !scrolled ? "text-white" : "text-[#404145]"}>fiverr</span>
                <span className="text-green-500">.</span>
              </Link>
            </div>

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

                  {/* ✅ Dropdown menu items now have black text */}
                  <div className="absolute right-0 w-48 mt-0.5 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                    {currentUser.isSeller && (
                      <>
                        <Link to="/gigs" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">
                          Gigs
                        </Link>
                        <Link to="/add-gig" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">
                          Add New Gig
                        </Link>
                      </>
                    )}
                    <Link to="/orders" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">
                      Orders
                    </Link>
                    <Link to="/messages" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">
                      Messages
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
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

      {(scrolled || !isHomePage) && (
        <div className="fixed top-[70px] left-0 w-full bg-white border-b border-gray-200 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-8 py-3 overflow-x-auto">
              <Link to="/category/graphics" className="text-gray-600 hover:text-green-500 whitespace-nowrap">
                Graphics & Design
              </Link>
              <Link to="/category/video" className="text-gray-600 hover:text-green-500 whitespace-nowrap">
                Video & Animation
              </Link>
              <Link to="/category/writing" className="text-gray-600 hover:text-green-500 whitespace-nowrap">
                Writing & Translation
              </Link>
              <Link to="/category/ai" className="text-gray-600 hover:text-green-500 whitespace-nowrap">
                AI Services
              </Link>
              <Link to="/category/marketing" className="text-gray-600 hover:text-green-500 whitespace-nowrap">
                Digital Marketing
              </Link>
              <Link to="/category/music" className="text-gray-600 hover:text-green-500 whitespace-nowrap">
                Music & Audio
              </Link>
              <Link to="/category/programming" className="text-gray-600 hover:text-green-500 whitespace-nowrap">
                Programming & Tech
              </Link>
              <Link to="/category/business" className="text-gray-600 hover:text-green-500 whitespace-nowrap">
                Business
              </Link>
              <Link to="/category/lifestyle" className="text-gray-600 hover:text-green-500 whitespace-nowrap">
                Lifestyle
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
