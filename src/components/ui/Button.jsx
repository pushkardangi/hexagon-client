import { cn } from "../../utils";

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const base = "px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-black text-white hover:bg-gray-900 focus:ring-black shadow-md",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-50 focus:ring-gray-400",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
