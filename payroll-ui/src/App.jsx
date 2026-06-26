import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import PageNotFound from "./pages/PageNotFound";
import AdminDashboard from "./pages/AdminDashboard";
import PayrollProcessorDashboard from "./pages/PayrollProcessorDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import MDashboard from "./pages/MDashboard";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/admin/*"element={<AdminDashboard />}/>
      <Route path="/manager/*" element={<MDashboard />} />
      <Route path="/payroll-processor" element={<PayrollProcessorDashboard />}/>
      <Route path="/employee/*" element={<EmployeeDashboard />}/>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;