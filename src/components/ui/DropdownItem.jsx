import { Link } from "react-router-dom";

const DropdownItem = ({
  href = null,
  icon: Icon,
  label,
  onClick = null,
  className = "",
  iconColor = "text-gray-500",
  textColor = "text-gray-700",
  disabled = false,
}) => {
  const baseClasses = `flex items-center select-none px-4 py-2 text-sm ${
    disabled ? "text-gray-300" : `hover:bg-gray-100 ${textColor}`
  } ${className}`;

  const content = (
    <div className={baseClasses} aria-disabled={disabled}>
      {Icon && <Icon className={`h-4 w-4 mr-3 ${disabled ? "text-gray-300" : iconColor}`} />}
      {label}
    </div>
  );

  if (disabled) {
    return <div>{content}</div>;
  }

  return href && !onClick ? (
    <Link to={href}>{content}</Link>
  ) : (
    <button onClick={onClick} className="w-full text-left">
      {content}
    </button>
  );
};

export default DropdownItem;
