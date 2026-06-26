import { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "primereact/chart";
import "../css/AdminHome.css";

const AdminHome = () => {
    const [stats, setStats] = useState({});
    const [finances, setFinances] = useState({ monthly: 0, yearly: 0, total: 0 });
    const [statusChartData, setStatusChartData] = useState({});
    const [gradeChartData, setGradeChartData] = useState({});

    const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } };

    useEffect(() => {
        loadStats();
        loadFinancials();
        loadStatusData();
        loadGradeData();
    }, []);

    const loadStats = () => {
        axios.get("http://localhost:8080/api/dashboard/stats", config)
            .then(res => setStats(res.data))
            .catch(err => console.error(err));
    };

    const loadFinancials = () => {
        // Fetching all three metrics for the financial section
        Promise.all([
            axios.get("http://localhost:8080/api/payroll/current-month-total", config),
            axios.get("http://localhost:8080/api/payroll/current-year-total", config),
            axios.get("http://localhost:8080/api/payroll/total-payroll", config)
        ]).then(([m, y, t]) => {
            setFinances({ monthly: m.data, yearly: y.data, total: t.data });
        }).catch(err => console.error("Financial load failed", err));
    };

    const loadStatusData = () => {
        axios.get("http://localhost:8080/api/dashboard/employee-status-stats", config)
            .then(res => {
                setStatusChartData({
                    labels: res.data.map(item => item.status),
                    datasets: [{
                        data: res.data.map(item => item.count),
                        backgroundColor: ['#38bdf8', '#4ade80', '#fbbf24']
                    }]
                });
            });
    };

    const loadGradeData = () => {
        axios.get("http://localhost:8080/api/employee/grade-stats", config)
            .then(res => {
                setGradeChartData({
                    labels: res.data.map(item => item.grade),
                    datasets: [{
                        label: 'Employees by Grade',
                        data: res.data.map(item => item.count),
                        backgroundColor: '#6366f1'
                    }]
                });
            });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Admin Dashboard</h2>
            
            {/* Employee Overview */}
            <div className="stats-grid mb-5">
                {[
                    { val: stats.totalEmployees, label: "Total Workforce" },
                    { val: stats.activeEmployees, label: "Active Employees" },
                    { val: stats.payrollsGenerated, label: "Payrolls Gen." }
                ].map((s, i) => (
                    <div key={i} className="stat-card">
                        <h3>{s.val || 0}</h3>
                        <p>{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Enterprise Financial Insights */}
            <div className="card border-0 shadow-sm mb-5">
                <div className="card-body">
                    <h4 className="mb-4">Financial Overview</h4>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <h6 className="text-muted">Current Month Payroll</h6>
                            <h3 className="text-primary">₹{Number(finances.monthly).toLocaleString()}</h3>
                        </div>
                        <div className="col-md-4">
                            <h6 className="text-muted">Current Year Payroll</h6>
                            <h3 className="text-success">₹{Number(finances.yearly).toLocaleString()}</h3>
                        </div>
                        <div className="col-md-4">
                            <h6 className="text-muted">Total Lifetime Payroll</h6>
                            <h3 className="text-info">₹{Number(finances.total).toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analytics Section */}
            <div className="row">
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm p-3">
                        <h5>Status Distribution</h5>
                        <Chart type="pie" data={statusChartData} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm p-3">
                        <h5>Grade Distribution</h5>
                        <Chart type="bar" data={gradeChartData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;