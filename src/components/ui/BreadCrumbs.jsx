import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = ({ items }) => {
  return (
    <div className="flex items-center gap-2 text-gray-600 text-base font-medium">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.to ? (
            <Link to={item.to} className="flex items-center gap-1 hover:text-black transition-colors">
              <span>{item.label}</span>
            </Link>
          ) : (
            <span className="text-black select-none">{item.label}</span>
          )}
          {index < items.length - 1 && <ChevronRight className="w-5 h-5" />}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
