import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Register } from "../pages";
import { Carousel } from "../components";

const Auth = () => {
  return (
    <div className="flex flex-col xl:flex-row h-screen">
      {/* Carousel */}
      <div className="w-full h-1/3 xl:w-1/2 xl:h-full flex items-center justify-center">
        <Carousel />
      </div>

      {/* Forms */}
      <Routes>
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default Auth;
