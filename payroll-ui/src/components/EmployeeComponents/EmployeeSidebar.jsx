import { NavLink, useNavigate } from "react-router-dom";
import "../css/EmployeeSidebar.css"; 

const EmployeeSidebar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="employee-sidebar">
            <div>
                {/* Logo Section */}
                <h1 className="sidebar-logo">
                    <i className="bi bi-shield-check" style={{ marginRight: '10px' }}></i>
                    PayrollPro
                </h1>

                {/* Navigation Links with Icons */}
                <div className="sidebar-links">
                    <NavLink to="/employee" end>
                        <i className="bi bi-speedometer2"></i> Dashboard
                    </NavLink>
                    <NavLink to="/employee/attendance">
                        <i className="bi bi-calendar-event"></i> Attendance
                    </NavLink>
                    <NavLink to="/employee/leave">
                        <i className="bi bi-person-badge"></i> Leave
                    </NavLink>
                    <NavLink to="/employee/payroll">
                        <i className="bi bi-wallet2"></i> Payroll
                    </NavLink>
                </div>
            </div>

            {/* Logout Button */}
            <button className="logout-btn" onClick={logout}>
                <i className="bi bi-box-arrow-right" style={{marginRight: '8px'}}></i> Logout
            </button>
        </div>
    );
};

export default EmployeeSidebar;