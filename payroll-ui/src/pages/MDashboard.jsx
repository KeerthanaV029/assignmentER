import { Routes, Route, Navigate } from "react-router-dom";
import EmployeeSidebar from "../components/MComponents/EmployeeSidebar";
import DashboardHome from "../components/MComponents/DashboardHome";
import Attendance from "../components/MComponents/Attendance";
import Leave from "../components/MComponents/Leave";
import EmployeePayroll from "../components/MComponents/EmployeePayroll";
import ManagerLeave from "../components/MComponents/ManagerLeave";

import "../css/EmployeeDashboard.css";

const MDashboard = () => {
    const username = localStorage.getItem("username");

    return (
        <div className="employee-layout">
            <EmployeeSidebar />
            <div className="employee-main">
                <div className="employee-header">
                    <div className="welcome-card">
                        <h5>Welcome Back, {username} 👋</h5>
                        <small>Manager Portal</small>
                    </div>
                </div>

                <Routes>
                    {/* Maps to /manager (assuming App.jsx path is /manager/*) */}
                    <Route index element={<DashboardHome />} />
                    <Route path="attendance" element={<Attendance />} />
                    <Route path="leave" element={<Leave />} />
                    <Route path="payroll" element={<EmployeePayroll />} />
                    <Route path="approve-leave" element={<ManagerLeave />} />
                    
                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/manager" replace />} />
                </Routes>
            </div>
        </div>
    );
};

export default MDashboard;