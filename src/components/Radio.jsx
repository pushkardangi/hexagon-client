const Radio = ({ name, value, handleChange, selectedValue }) => {

  let label = value.charAt(0).toUpperCase() + value.slice(1);

  if (name === "size") {
    if (value === "1792x1024") label = "Landscape";
    if (value === "1024x1792") label = "Portrait";
  }

  const isSelected = selectedValue === value; // Check if this option is selected

  return (
    <label
      className={`flex items-center justify-center w-24 px-1 py-0.5 rounded-md cursor-pointer border transition-all
        ${
          isSelected
            ? "bg-custom-blue-3 text-white border-custom-blue-4"
            : "bg-gray-200 text-black border-gray-300"
        }
        hover:bg-custom-blue-2 hover:text-white`}
    >
      {label}
      <input
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
