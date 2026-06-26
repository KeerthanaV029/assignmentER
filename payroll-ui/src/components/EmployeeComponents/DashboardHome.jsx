import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../css/EmployeeDashboard.css"; 

const DashboardHome = () => {
    const [employee, setEmployee] = useState(null);
    const [leaveBalance, setLeaveBalance] = useState(0);
    const [attendancePercentage, setAttendancePercentage] = useState(0);
    const [leaveChart, setLeaveChart] = useState(null);

    const config = {
         headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    };

    const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

    useEffect(() => {
        loadDashboard();
        loadStats();
    }, []);

    const loadDashboard = () => {
        axios.get("http://localhost:8080/api/employee/dashboard", config)
            .then(response => setEmployee(response.data))
            .catch(err => console.error("Error loading dashboard:", err));
    };

    const loadStats = () => {
        axios.get("http://localhost:8080/api/employee/leave-balance-total", config)
            .then(res => setLeaveBalance(res.data))
            .catch(err => console.error("Error loading leave balance:", err));

        axios.get("http://localhost:8080/api/employee/attendance-percentage", config)
            .then(res => setAttendancePercentage(res.data))
            .catch(err => console.error("Error loading attendance:", err));

        axios.get("http://localhost:8080/api/employee/leave-balance-chart", config)
            .then(response => setLeaveChart(response.data))
            .catch(err => console.log(err));
    };

    const chartData = leaveChart ? [
        { name: "Casual", value: leaveChart.casual },
        { name: "Sick", value: leaveChart.sick },
        { name: "Earned", value: leaveChart.earned }
    ] : [];

    if (!employee) return <div className="p-4">Loading Dashboard...</div>;

    return (
        <div className="content-panel p-4">
            <h2>Hello, {employee.fullName} </h2>

            <div className="row mt-4 mb-4">
                <div className="col-md-3">
                    <div className="stat-card">
                        <h3>{leaveBalance}</h3>
                        <p>Total Leave Balance</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-card">
                        <h3>{attendancePercentage.toFixed(0)}%</h3>
                        <p>Attendance Rate</p>
                    </div>
                </div>
            </div>

            {/* Donut Chart Section */}
            <div className="chart-card">
                <h4>Leave Balance Distribution</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={chartData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} dataKey="value" label>
                            {chartData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="profile-card mt-4">
                <h2>Employee Information</h2>
                <hr />
                <div className="row">
                    <div className="col-md-4 mb-4"><strong>Department:</strong> {employee.departmentName}</div>
                    <div className="col-md-4 mb-4"><strong>Designation:</strong> {employee.designation?.replaceAll("_", " ")}</div>
                    <div className="col-md-4 mb-4"><strong>Grade:</strong> {employee.grade}</div>
                    <div className="col-md-4 mb-4"><strong>Experience:</strong> {employee.experienceYears} Years</div>
                    <div className="col-md-4 mb-4"><strong>Status:</strong> {employee.employeeStatus}</div>
                    <div className="col-md-4 mb-4"><strong>Email:</strong> {employee.email}</div>
                    <div className="col-md-4 mb-4"><strong>Phone:</strong> {employee.phone}</div>
                    <div className="col-md-4 mb-4"><strong>Joining Date:</strong> {employee.joiningDate}</div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="sidebar-card">
                        <h5>Attendance</h5>
                        <p className="display-6">Check-in Status</p>
                        <Link to="/employee/attendance" className="btn btn-outline-light">View History</Link>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="sidebar-card">
                        <h5>Leave Balance</h5>
                        <p className="display-6">View Leave </p>
                        <Link to="/employee/leave" className="btn btn-outline-light">Apply Leave</Link>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="sidebar-card">
                        <h5>Latest Salary</h5>
                        <p className="display-6">view salary</p>
                        <Link to="/employee/payroll" className="btn btn-outline-light">View Payslip</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;