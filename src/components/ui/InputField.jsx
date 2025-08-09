const InputField = ({ type, name, placeholder, value, handleChange, autoComplete = "off", disabled = false }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      className={`${
        type === "checkbox"
          ? "w-4 h-4 mx-1"
          : `w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 
            ${disabled ? "bg-gray-100 text-gray-500" : "focus:border-white"}`
      }`}
      autoComplete={autoComplete}
    />
  );
};

export default InputField;
