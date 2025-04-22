import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { logo } from "../assets";
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

const DropdownItem = ({
  href = "/",
  icon: Icon,
  label,
  className = "",
  iconColor = "text-gray-500",
  textColor = "text-gray-700",
}) => {
  return (
    <Link to={href} className={`flex items-center select-none px-4 py-2 text-sm hover:bg-gray-100 ${textColor} ${className}`}>
      {Icon && <Icon className={`h-4 w-4 mr-3 ${iconColor}`} />}
      {label}
    </Link>
  );
};

const Header = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    <header className="w-full flex justify-between items-center bg-white px-4 sm:px-8 py-4 border-b border-custom">
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
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 sm:w-72 w-[calc(100vw-2rem)] mt-6 bg-white rounded-md shadow-lg border border-custom z-10 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-custom">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-custom-blue-4 flex items-center justify-center text-white">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">User Name</p>
                      <p className="text-xs text-gray-500">user@example.com</p>
                    </div>
                  </div>
                </div>

                <div>
                  <DropdownItem
                    href="/"
                    icon={User}
                    label="Your Profile"
                    textColor="text-gray-300" // temporarily disabled
                    iconColor="text-gray-300" // features under development
                  />
                  <DropdownItem
                    href="/"
                    icon={History}
                    label="History"
                    textColor="text-gray-300"
                    iconColor="text-gray-300"
                  />
                  <DropdownItem
                    href="/"
                    icon={Trash2}
                    label="Trash"
                    textColor="text-gray-300"
                    iconColor="text-gray-300"
                  />
                </div>

                <div className="border-t border-custom">
                  <DropdownItem
                    href="/"
                    icon={HelpCircle}
                    label="Help & Support"
                    textColor="text-gray-300"
                    iconColor="text-gray-300"
                  />
                  <DropdownItem
                    href="/"
                    icon={Settings}
                    label="Account Settings"
                    textColor="text-gray-300"
                    iconColor="text-gray-300"
                  />
                  <DropdownItem
                    href="/"
                    icon={CreditCard}
                    label="Billing & Subscriptions"
                    textColor="text-gray-300"
                    iconColor="text-gray-300"
                  />
                </div>

                <div className="border-t border-custom">
                  <DropdownItem
                    href="/"
                    icon={BookOpen}
                    label="Documentation"
                    textColor="text-gray-300"
                    iconColor="text-gray-300"
                  />
                  <DropdownItem
                    href="/"
                    icon={WandSparkles}
                    label="Pro Tips"
                    textColor="text-gray-300"
                    iconColor="text-gray-300"
                  />
                </div>

                <div className="border-t border-custom">
                  <DropdownItem href="/" icon={Lightbulb} label="Feature Request" />
                  <DropdownItem href="/" icon={Bug} label="Report a Bug" />
                  <DropdownItem href="/" icon={Sparkles} label="What's New" />
                </div>

                <div className="border-t border-custom py-1">
                  <DropdownItem
                    href="/"
                    icon={LogOut}
                    label="Sign out"
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
