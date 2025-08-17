import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils";

const SelectField = ({ label, value, onChange, options, placeholder = "Select an option", required }) => {
  const [open, setOpen] = useState(false);

  // Find the label for the current value
  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            "w-full border bg-white rounded-lg px-3 py-2 flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-indigo-500"
          )}
        >
          <span className={cn(value ? "text-gray-900" : "text-gray-400")}>{selectedLabel || placeholder}</span>
          <ChevronDown className={cn("w-4 h-4 transition-transform", open && "rotate-180")} />
        </button>

        {open && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "px-3 py-2 cursor-pointer hover:bg-indigo-100",
                  value === opt.value && "bg-indigo-50 font-medium"
                )}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectField;
