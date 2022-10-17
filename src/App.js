import React from "react";
import { BrowserRouter } from "react-router-dom";
import TemaProvider from "./Context/TemaProvider";
import Pages from "./Pages";

const App = () => {
  return (
    <BrowserRouter>
      <TemaProvider>
        <Pages />
      </TemaProvider>
    </BrowserRouter>
  );
};

export default App;
