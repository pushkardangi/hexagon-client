const InputField = ({ type, name, placeholder, value, handleChange }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={`${
        type === "checkbox"
          ? "w-4 h-4 mx-1"
          : "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
      }`}
      autoComplete="off"
    />
  );
};

export default InputField;
