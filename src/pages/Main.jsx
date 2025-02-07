import { Route, Routes } from "react-router-dom";
import { CreateImage, Gallery } from "../pages";

const Main = () => {
  return (
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<CreateImage />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </main>
  );
};

export default Main;
