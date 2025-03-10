import { Link, useLocation } from "react-router-dom";

import { logo } from "../assets";
import { LuPencil } from "react-icons/lu";
import { FaRegImages } from "react-icons/fa6";

const Header = () => {
  const location = useLocation();

  return (
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="app logo" className="w-10 object-contain" />
        <span className="font-inter font-medium text-xl ml-2">Hexagon</span>
      </Link>

      {location.pathname === "/gallery" ? (
        <Link
          to="/"
          className="font-inter font-medium bg-[#6469ff] hover:bg-[#4e5cf5] transition-colors text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <LuPencil /> Create
        </Link>
      ) : (
        <Link
          to="/gallery"
          className="font-inter font-medium bg-[#6469ff] hover:bg-[#4e5cf5] transition-colors text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaRegImages /> Gallery
        </Link>
      )}
    </header>
  );
};

export default Header;
