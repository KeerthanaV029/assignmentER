import { useState } from "react";

import HrNavbar from "../components/HrComponents/HrNavbar";
import HrSidebar from "../components/HrComponents/HrSidebar";

import DashboardHome from "../components/HrComponents/DashboardHome";
import OnboardEmployee from "../components/HrComponents/OnboardEmployee";
import EmployeeList from "../components/HrComponents/EmployeeList";
import DepartmentManagement from "../components/HrComponents/DepartmentManagement";
import PayrollPolicies from "../components/HrComponents/PayrollPolicies";
import Reports from "../components/HrComponents/Reports";

import "../css/HrDashboard.css";

const HrDashboard = () => {

    const [selectedMenu, setSelectedMenu] = useState("Dashboard");

    const menuComponents = {
        Dashboard: <DashboardHome />,
        "Onboard Employee": <OnboardEmployee />,
        Employees: <EmployeeList />,
        Departments: <DepartmentManagement />,
        "Payroll Policies": <PayrollPolicies />,
        Reports: <Reports />
    };

    return (
        <div className="dashboard-layout">
            <HrSidebar  selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
            <div className="content-area">
                <HrNavbar />
                <div className="page-content">
                    {menuComponents [selectedMenu] || <DashboardHome />}
                </div>
            </div>
        </div>
    );
};

export default HrDashboard;