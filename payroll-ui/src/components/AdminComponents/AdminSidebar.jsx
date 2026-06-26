import { NavLink, useNavigate } from "react-router-dom";
import "../css/AdminSidebar.css";

const AdminSidebar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="admin-sidebar">
            <div>
                <h1 className="logo">
                    <i className="bi bi-shield-check" style={{ marginRight: '10px' }}></i>
                    PayrollPro
                </h1>
                <div className="sidebar-links">
                    <NavLink to="/admin" end><i className="bi bi-speedometer2"></i> Dashboard</NavLink>
                    <NavLink to="/admin/departments"><i className="bi bi-diagram-3"></i> Org. Structure</NavLink>
                    <NavLink to="/admin/employees"><i className="bi bi-people"></i> Manage Employees</NavLink>
                    <NavLink to="/admin/payroll"><i className="bi bi-wallet2"></i> Generate Payroll</NavLink>
                    <NavLink to="/admin/leaves"><i className="bi bi-calendar-check"></i> Leave Requests</NavLink>
                    <NavLink to="/admin/attendance"><i className="bi bi-wallet2"></i> My Attendance</NavLink>
                    <NavLink to="/admin/payslip"><i className="bi bi-calendar-check"></i> My Payroll</NavLink>
                </div>
            </div>
            <button className="logout-btn" onClick={logout}>
                <i className="bi bi-box-arrow-right"></i> Logout
            </button>
        </div>
    );
};

export default AdminSidebar;