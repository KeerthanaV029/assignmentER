import EmployeeSidebar from "../components/EmployeeComponents/EmployeeSidebar";
import { Routes, Route } from "react-router-dom";

import DashboardHome from "../components/EmployeeComponents/DashboardHome";
import Attendance from "../components/EmployeeComponents/Attendance";
import Leave from "../components/EmployeeComponents/Leave";
import EmployeePayroll from "../components/EmployeeComponents/EmployeePayroll";

import "../css/EmployeeDashboard.css";

const EmployeeDashboard = () => {

    const username =
        localStorage.getItem("username");

    return (

        <div className="employee-layout">

            <EmployeeSidebar />

            <div className="employee-main">

                <div className="employee-header">

                    <div className="welcome-card">

                        <h5>
                            Welcome Back, {username} 👋
                        </h5>

                        <small>
                            Employee Portal
                        </small>

                    </div>

                </div>

                <Routes>

                    <Route
                        index
                        element={<DashboardHome />}
                    />

                    <Route
                        path="attendance"
                        element={<Attendance />}
                    />

                    <Route
                        path="leave"
                        element={<Leave />}
                    />

                    <Route
                        path="payroll"
                        element={<EmployeePayroll />}
                    />

                </Routes>

            </div>

        </div>
    );
};

export default EmployeeDashboard;