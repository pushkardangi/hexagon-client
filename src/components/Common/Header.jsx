import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { logo } from "../../assets";
import {
  Pencil,
  Images,
  Settings,
  User,
  History,
  Trash2,
  BookOpen,
  HelpCircle,
  LogOut,
  Bug,
  CreditCard,
  Sparkles,
  Lightbulb,
  WandSparkles,
} from "lucide-react";

import { useAuthStore } from "../../store";
import DropdownItem from "../ui/DropdownItem"

const Header = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 z-50 flex justify-between items-center bg-white px-4 sm:px-8 py-4 border-b border-custom">
      <Link to="/" className="flex items-center">
        <img src={logo || "/placeholder.svg"} alt="app logo" className="w-9 sm:w-10 object-contain" />
        <span className="font-inter font-medium text-lg sm:text-xl ml-1 sm:ml-2">Hexagon</span>
      </Link>

      <div className="flex items-center gap-2">
        {/* Gallery and Create Button */}
        {location.pathname === "/gallery" ? (
          <Link
            to="/"
            className="border sm:border-0 border-custom sm:bg-custom-blue-3 sm:hover:bg-custom-blue-2 transition-colors text-gray-700 sm:text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-md flex items-center gap-2"
          >
            <Pencil className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-base font-inter font-medium">Create</span>
          </Link>
        ) : (
          <Link
            to="/gallery"
            className="border sm:border-0 border-custom sm:bg-custom-blue-3 sm:hover:bg-custom-blue-2 transition-colors text-gray-700 sm:text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-md flex items-center gap-2"
          >
            <Images className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-base font-inter font-medium">Gallery</span>
          </Link>
        )}

        {/* Settings Button and Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="border border-custom sm:hover:bg-gray-50 transition-colors text-gray-700 sm:text-gray-500 px-2.5 py-2 rounded-md flex items-center gap-2"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                key="dropdown"
                onClick={() => setIsDropdownOpen(false)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 sm:w-72 w-[calc(100vw-2rem)] mt-6 bg-white rounded-md shadow-lg border border-custom z-10 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-custom">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-custom-blue-4 flex items-center justify-center text-white">
                      {user?.avatar ? <img src={user.avatar} alt="user profile" /> : <User className="w-5 h-5" />}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.firstName || "User"} {user?.lastName || ""}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <DropdownItem href="/profile" icon={User} label="Your Profile" />
                  <DropdownItem href="/" icon={History} label="History" disabled />
                  <DropdownItem href="/" icon={Trash2} label="Trash" disabled />
                </div>

                <div className="border-t border-custom">
                  <DropdownItem href="/" icon={HelpCircle} label="Help & Support" disabled />
                  <DropdownItem href="/" icon={Settings} label="Account Settings" disabled />
                  <DropdownItem href="/billing" icon={CreditCard} label="Billing & Subscriptions" />
                </div>

                <div className="border-t border-custom">
                  <DropdownItem href="/documentation" icon={BookOpen} label="Documentation" />
                  <DropdownItem href="/" icon={WandSparkles} label="Pro Tips" disabled />
                </div>

                <div className="border-t border-custom">
                  <DropdownItem href="/feature-request" icon={Lightbulb} label="Feature Request" />
                  <DropdownItem href="/report-bug" icon={Bug} label="Report a Bug" />
                  <DropdownItem href="/whats-new" icon={Sparkles} label="What's New" />
                </div>

                <div className="border-t border-custom py-1">
                  <DropdownItem
                    icon={LogOut}
                    label="Log out"
                    onClick={handleLogout}
                    textColor="text-red-600"
                    iconColor="text-red-500"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
