import { Routes, Route } from "react-router-dom";
import { Admin } from "./Pages/Admin"
import { Login } from "./Pages/Login";
import { Dashboard } from './components/Dashboard/Dashboard'; 
import AddPage from './components/Student/pages/AddPage'; 
import EditPage from './components/Student/pages/EditPage'; 
import { StudentPage } from "./components/Student/StudentPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/student" element={<StudentPage />} />
      <Route path="/admin/student/add" element={<AddPage />} />
      <Route path="/admin/student/:studentId" element={<EditPage />} />
    </Routes>
  );
}

export default App;
