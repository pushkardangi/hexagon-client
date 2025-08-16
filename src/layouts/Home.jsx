import { Outlet } from "react-router-dom";
import { Header } from "../components";

const Home = () => {
  return (
    <div>
      <Header />
      <main className="pt-24 pb-6 sm:pt-28 sm:pb-10 px-4 w-full h-dvh bg-[#f9fafe]">
        <Outlet /> {/* This will render CreateImage or Gallery */}
      </main>
    </div>
  );
};

export default Home;
