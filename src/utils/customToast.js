import toast from "react-hot-toast";

const showToast = (content, position = "bottom-right") =>
  toast.custom(
    (t) => (
      <div className={`bg-white px-4 py-2 shadow rounded ${t.visible ? "animate-enter" : "animate-leave"}`}>
        {content}
      </div>
    ),
    { position }
  );

export default showToast;
