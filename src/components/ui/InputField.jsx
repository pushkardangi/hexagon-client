import { cn } from "../../utils";

const InputField = ({
  label,
  type,
  name,
  placeholder,
  value,
  handleChange,
  autoComplete = "off",
  disabled = false,
  required = false,
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-1">
          {label} {required && "*"}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        className={cn(
          type === "checkbox" && "w-4 h-4 mx-1",
          type !== "checkbox" &&
            "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500",
          disabled && "bg-gray-100 text-gray-500",
          !disabled && type !== "checkbox" && "focus:border-white"
        )}
      />
    </div>
  );
};

export default InputField;
