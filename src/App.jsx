import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import MasterDB from "./components/MasterDB";
import FinishedGoods from "./components/FinishedGoods";

function App() {
  return (
    <>
      <Nav />

      <div className="max-w-[1000px] mx-auto p-4">
        <Routes>
          {/* Redirect from "/" to "/master-db" */}
          <Route path="/" element={<Navigate to="/finished-goods" replace />} />
          <Route path="/master-db" element={<MasterDB />} />
          <Route path="/finished-goods" element={<FinishedGoods />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
