import { Routes, Route, Navigate } from "react-router-dom";
import ManagerSidebar from "../components/ManagerComponents/ManagerSidebar";
import ManagerLeave from "../components/ManagerComponents/ManagerLeave";
import ManagerAttendance from '../components/ManagerComponents/ManagerAttendance';
import ManagerMyLeave from '../components/ManagerComponents/ManagerMyLeave';
import ManagerPayroll from '../components/ManagerComponents/ManagerPayroll';
import "../css/AdminDashboard.css"; // Reuse your existing layout CSS
import ManagerDashboardHome from "../components/ManagerComponents/ManagerDashboard";

const ManagerDashboard = () => {
    const username = localStorage.getItem("username");

    return (
        <div className="admin-layout"> {/* Reusing the same layout class */}
            <ManagerSidebar />
            
            <div className="admin-main">
                {/* Consistent Header */}
                <div className="admin-header">
                    <div className="welcome-card">
                        <h5>Welcome Back, {username} 👋</h5>
                        <small>Managerial Portal</small>
                    </div>
                </div>

                <Routes>
                    <Route path="/" element={<ManagerDashboardHome />} />
                    <Route path="approve-leaves" element={<ManagerLeave />} />
                    <Route path="attendance" element={<ManagerAttendance />} />
                    <Route path="apply-leave" element={<ManagerMyLeave />} />
                    <Route path="payroll" element={<ManagerPayroll />} />
                    {/* Fallback to prevent blank screens */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </div>
    );
};

export default ManagerDashboard;