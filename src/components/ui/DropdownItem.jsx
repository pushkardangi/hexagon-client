import { Link } from "react-router-dom";

const DropdownItem = ({
  href = null,
  icon: Icon,
  label,
  onClick = null,
  className = "",
  iconColor = "text-gray-500",
  textColor = "text-gray-700",
}) => {
  const content = (
    <div className={`flex items-center select-none px-4 py-2 text-sm hover:bg-gray-100 ${textColor} ${className}`}>
      {Icon && <Icon className={`h-4 w-4 mr-3 ${iconColor}`} />}
      {label}
    </div>
  );

  return href && !onClick ? (
    <Link to={href}>{content}</Link>
  ) : (
    <button onClick={onClick} className="w-full text-left">
      {content}
    </button>
  );
};

export default DropdownItem;
