import { cn } from "../../utils";

const TextAreaField = ({
  label,
  value,
  onChange,
  name,
  placeholder,
  required = false,
  className = "h-24",
  labelClassName,
}) => {
  return (
    <div>
      <label className={cn("block text-sm font-medium mb-1", labelClassName)}>
        {label} {required && "*"}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500",
          className
        )}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextAreaField;
