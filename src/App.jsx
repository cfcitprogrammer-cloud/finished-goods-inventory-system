import { useState } from "react";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import MasterDB from "./components/MasterDB";
import FinishedGoods from "./components/FinishedGoods";

function App() {
  return (
    <>
      <Nav />

      <div className="max-w-[1000px] mx-auto p-4">
        <Routes>
          <Route path="/master-db" element={<MasterDB />} />
          <Route path="/finished-goods" element={<FinishedGoods />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
