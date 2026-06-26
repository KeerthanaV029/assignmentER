import AdminSidebar from "../components/AdminComponents/AdminSidebar";
import { Routes, Route } from "react-router-dom";

import AdminHome from "../components/AdminComponents/AdminHome";
import Department from "../components/AdminComponents/Department";
import EmployeeOnboarding from "../components/AdminComponents/EmployeeOnboarding";
import Payroll from "../components/AdminComponents/Payroll";
import LeaveList from "../components/AdminComponents/LeaveList";

import AdminAttendance from "../components/AdminComponents/AdminAttendance";

import "../css/AdminDashboard.css";
import AdminPayroll from "../components/AdminComponents/AdminPayroll";

const AdminDashboard = () => {

    const username =
        localStorage.getItem("username");

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-main">

                <div className="admin-header">

                    <div className="welcome-card">

                        <h5>
                            Welcome Back, {username} 👋
                        </h5>

                        <small>
                            HR Administration Portal
                        </small>

                    </div>

                </div>

                <Routes>

                    <Route
                        index
                        element={<AdminHome />}
                    />

                    <Route
                        path="departments"
                        element={<Department />}
                    />

                    <Route
                        path="employees"
                        element={<EmployeeOnboarding />}
                    />

                    <Route
                        path="payroll"
                        element={<Payroll />}
                    />
                    <Route
                        path="leaves"
                        element={<LeaveList />}
                    />
                    <Route
                        path="attendance"
                        element={<AdminAttendance />}
                    />
                    <Route
                        path="payslip"
                        element={<AdminPayroll />}
                    />

                </Routes>

            </div>

        </div>

    );
};

export default AdminDashboard;