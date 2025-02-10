import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { Home } from "./pages";

const App = () => {
  const user = false;

  return (
    <Router>
      <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
