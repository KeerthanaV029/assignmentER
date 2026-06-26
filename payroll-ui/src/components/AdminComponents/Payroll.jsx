import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../css/Payroll.css";

const Payroll = () => {
    const [activeEmployees, setActiveEmployees] = useState(0);
    const [payrollRunResult, setPayrollRunResult] = useState(null);
    const [payrolls, setPayrolls] = useState([]);
    const [selectedPayroll, setSelectedPayroll] = useState(null);
    const [showPayslip, setShowPayslip] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "id", direction: "desc" });

    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const now = new Date();
    const period = now.toLocaleString('default', { month: 'long' }) + " " + now.getFullYear();

    useEffect(() => { loadActiveEmployeeCount(); loadPayrolls(); }, []);

    const loadActiveEmployeeCount = () => axios.get("http://localhost:8080/api/payroll/active-count", config).then(res => setActiveEmployees(res.data)).catch(console.error);
    const loadPayrolls = () => axios.get("http://localhost:8080/api/payroll/all", config).then(res => setPayrolls(res.data)).catch(console.error);
    
    const viewPayslip = (id) => {
        axios.get(`http://localhost:8080/api/payroll/${id}`, config)
            .then(res => { setSelectedPayroll(res.data); setShowPayslip(true); })
            .catch(console.error);
    };

    const generatePayrollRun = () => {
        axios.post("http://localhost:8080/api/payroll/generate-all", {}, config)
            .then(res => { setPayrollRunResult(res.data); loadPayrolls(); })
            .catch(err => alert(err.response?.data?.message || "Unable to generate payroll"));
    };

    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
        setSortConfig({ key, direction });
    };

    const processedPayrolls = useMemo(() => {
        let data = [...payrolls];
        if (searchTerm) data = data.filter(p => p.employeeName.toLowerCase().includes(searchTerm.toLowerCase()));
        data.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
        return data;
    }, [payrolls, searchTerm, sortConfig]);

    return (
        <div className="container-fluid px-4 py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Payroll Management</h2>
                <span className="badge bg-info p-2 fs-6">Period: {period}</span>
            </div>

            {/* Dynamic Grid Layout */}
            <div className={`row g-4 ${payrollRunResult ? '' : 'justify-content-start'}`}>
                <div className="col-lg-4">
                    <div className="card shadow-sm border-0 bg-primary text-white h-100 p-3">
                        <h5>Monthly Payroll Run</h5>
                        <h2 className="display-6">{activeEmployees}</h2>
                        <p className="mb-4">Active Employees ready for processing</p>
                        <button className="btn btn-light w-100 fw-bold" onClick={generatePayrollRun}>Run Batch Payroll</button>
                    </div>
                </div>

                {/* Calendar Card */}
<div className="col-lg-3">
   
        <div className="calendar-wrapper">
            <Calendar value={new Date()} />
        </div>
    
</div>

                {/* Process Summary */}
{payrollRunResult && (
    <div className="col-lg-5">
        {/* Added h-100 to the card to match height of neighbor cards */}
        <div className="card shadow-sm border-0 h-100">
            <div className="card-body d-flex flex-column">
                <h5>Process Summary</h5>
                <div className="d-flex gap-4 mb-2">
                    <h4 className="text-success">Generated: {payrollRunResult.generatedCount}</h4>
                    <h4 className="text-danger">Skipped: {payrollRunResult.skippedCount}</h4>
                </div>
                {/* Scrollable container with flex-grow-1 to fill remaining space */}
                <div className="flex-grow-1 overflow-auto" style={{ maxHeight: '200px' }}>
                    {payrollRunResult.messages?.map((m, i) => (
                        <div key={i} className="text-warning small p-2 mb-1 border-bottom">
                            ⚠ {m}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
)}
            </div>

            <div className="card mt-4 border-0 shadow-sm">
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Payroll Records</h5>
                    <input className="form-control w-25" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th onClick={() => requestSort("employeeName")}>Employee ↕</th>
                                <th>Month ↕</th><th>Year ↕</th><th>Net Salary ↕</th><th>Status</th><th>Payslip</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processedPayrolls.map(p => (
                                <tr key={p.id}>
                                    <td className="fw-semibold">{p.employeeName}</td>
                                    <td>{p.payrollMonth}</td><td>{p.payrollYear}</td>
                                    <td className="font-monospace">₹{Number(p.netSalary).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                    <td><span className={`badge ${p.paymentStatus === 'GENERATED' ? 'bg-success' : 'bg-warning'}`}>{p.paymentStatus}</span></td>
                                    <td><button className="btn btn-primary btn-sm" onClick={() => viewPayslip(p.id)}>View</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    
            {/* Payslip Modal */}
            {showPayslip && selectedPayroll && (
                <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header"><h5 className="modal-title">Payslip: {selectedPayroll.employeeName}</h5><button className="btn-close" onClick={() => setShowPayslip(false)} /></div>
                            <div className="modal-body">
                                <p><strong>Basic Salary:</strong> ₹{Number(selectedPayroll.basicSalary).toFixed(2)}</p>
                                <p><strong>Present Days:</strong> {selectedPayroll.presentDays}</p>
                                <p><strong>Deductions:</strong> PF ₹{Number(selectedPayroll.pfAmount).toFixed(2)} | Tax ₹{Number(selectedPayroll.taxAmount).toFixed(2)} | Absent ₹{Number(selectedPayroll.absentDeduction).toFixed(2)}</p>
                                <hr />
                                <h5><strong>Net Salary: ₹{Number(selectedPayroll.netSalary).toFixed(2)}</strong></h5>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payroll;