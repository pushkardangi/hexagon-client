import React from "react";
import { BrowserRouter } from "react-router-dom";

import { Header } from "./components";
import { Main } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Main />
    </BrowserRouter>
  );
};

export default App;
