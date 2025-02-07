const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => (
  <div>
    {/* Label */}
    <div className="flex items-center gap-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {labelName}
      </label>
      {isSurpriseMe && (
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="font-semibold text-xs bg-[#EcECF1] active:bg-[#dbdbed] transition-colors duration-200 py-1 px-2 rounded-[5px] text-black"
        >
          Surprise me
        </button>
      )}
    </div>

    {/* Input field */}
    <input
      type={type} id={name} name={name} placeholder={placeholder} value={value}
      onChange={handleChange} required autoComplete="off"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
      focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
    />
  </div>
);

export default FormField;
