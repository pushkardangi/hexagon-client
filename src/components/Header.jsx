import { Link } from "react-router-dom";
import { logo } from "../assets";

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <div>
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="w-10 object-contain" />
          <span className="ml-2 text-xl">Hexagon</span>
        </Link>
      </div>

      <Link
        to="/gallery"
        className="font-inter font-medium bg-[#6469ff] hover:bg-[#4e5cf5] transition-colors text-white px-4 py-2 rounded-md"
      >
        Gallery
      </Link>
    </header>
  );
};

export default Header;
