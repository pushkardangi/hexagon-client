import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { Home, Auth, ForgotPassword } from "./pages";

const App = () => {
  const user = false;

  return (
    <Router>
      <Routes>
        <Route path="/*" element={user ? <Home /> : <Navigate to="/auth/login" />} />
        <Route path="/auth/*" element={!user ? <Auth /> : <Navigate to="/" />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
