const Radio = ({ name, value, handleChange, selectedValue }) => {
  const getLabel = () => {
    if (name === "size") {
      if (value === "1792x1024") return "Landscape";
      if (value === "1024x1792") return "Portrait";
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const label = getLabel();
  const isSelected = selectedValue === value;
  const inputId = `${name}-${value}`;

  return (
    <label
      htmlFor={inputId}
      className={`flex items-center justify-center w-24 py-1 rounded-md cursor-pointer text-sm transition-all
        ${isSelected ? "bg-custom-blue-3 text-white" : "bg-gray-200 text-black border border-gray-300"}
        sm:hover:bg-custom-blue-2 sm:hover:border-blue-2 sm:hover:text-white`}
    >
      {label}
      <input
        id={inputId}
        type="radio"
        name={name}
        value={value}
        checked={isSelected}
        onChange={handleChange}
        className="hidden"
      />
    </label>
  );
};

export default Radio;
