import { Outlet } from "react-router-dom";
import { Carousel } from "../components";

const AuthLayout = () => {
  return (
    <div className="flex flex-col xl:flex-row h-screen">
      {/* Carousel */}
      <div className="w-full h-1/3 xl:w-1/2 xl:h-full flex items-center justify-center">
        <Carousel />
      </div>

      {/* Forms */}
      <Outlet /> {/* This will render Login or Register */}
    </div>
  );
};

export default AuthLayout;
