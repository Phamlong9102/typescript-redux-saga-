import { Routes, Route } from "react-router-dom";
import { Admin } from "./components/Pages/Admin";
import { Login } from "./components/Pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
