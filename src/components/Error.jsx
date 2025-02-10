const Error = ({ error }) => {
  return (
    <p className={`text-xs mt-1 ${error ? "text-red-500" : "text-white"}`}>
      {error || "No Error"}
    </p>
  );
};

export default Error;
