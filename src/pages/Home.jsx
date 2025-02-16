import { Outlet } from "react-router-dom";
import { Header } from "../components";

const Home = () => {
  return (
    <div>
      <Header />
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Outlet /> {/* This will render CreateImage or Gallery */}
      </main>
    </div>
  );
};

export default Home;
