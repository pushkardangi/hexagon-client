import { Route, Routes } from "react-router-dom";
import { Header } from "../components";
import { CreateImage, Gallery } from "./index";

const Home = () => {
  return (
    <div>
      <Header />
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<CreateImage />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </main>
    </div>
  );
};

export default Home;
