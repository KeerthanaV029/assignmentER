import { useEffect, useState } from "react";
import axios from "axios";
import "../css/EmployeePayroll.css";

const EmployeePayroll = () => {
    const [payrolls, setPayrolls] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPayroll, setSelectedPayroll] = useState(null);

    const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } };

    const monthNames = ["", "January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        loadPayrolls();
    }, []);

    const loadPayrolls = () => {
        axios.get("http://localhost:8080/api/payroll/my-payrolls", config)
            .then(res => setPayrolls(res.data))
            .catch(err => console.error("Error loading payrolls:", err));
    };

    const filteredPayrolls = payrolls.filter(p => {
        const month = p.payrollMonth ? p.payrollMonth.toString().toLowerCase() : "";
        const year = p.payrollYear ? p.payrollYear.toString() : "";
        const search = searchTerm.toLowerCase();
        return month.includes(search) || year.includes(search);
    });

    const latest = payrolls.length > 0 ? payrolls[0] : null;

    return (
        <div className="payroll-container">
            <h2>My Payroll History</h2>

            {latest && (
                <div className="salary-card">
                    <h3>₹{Number(latest.netSalary).toLocaleString()}</h3>
                    <p>Latest Salary ({monthNames[latest.payrollMonth] || latest.payrollMonth} {latest.payrollYear})</p>
                </div>
            )}

            <div className="filter-bar mb-3">
                <input 
                    className="form-control" 
                    placeholder="Search by month or year..." 
                    style={{width: "300px"}}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="table-wrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Year</th>
                            <th>Net Salary</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayrolls.map(p => (
                            <tr key={p.id}>
                                <td>{monthNames[p.payrollMonth] || p.payrollMonth}</td>
                                <td>{p.payrollYear}</td>
                                <td>₹{Number(p.netSalary).toLocaleString()}</td>
                                <td>
                                    <span className={`badge ${p.paymentStatus === 'PAID' ? 'bg-success' : 'bg-warning'}`}>
                                        {p.paymentStatus}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => setSelectedPayroll(p)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#payslipModal"
                                    >
                                        View Payslip
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="modal fade" id="payslipModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Payslip</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {selectedPayroll && (
                                <>
                                    <h4>Salary Breakdown</h4>
                                    <hr />
                                    <div className="row mb-2"><div className="col-6">Employee</div><div className="col-6">{localStorage.getItem("username")}</div></div>
                                    <div className="row mb-2"><div className="col-6">Payroll Period</div><div className="col-6">{monthNames[selectedPayroll.payrollMonth] || selectedPayroll.payrollMonth}/{selectedPayroll.payrollYear}</div></div>
                                    <hr />
                                    <div className="row mb-2"><div className="col-6">Basic Salary</div><div className="col-6">₹{selectedPayroll.basicSalary?.toLocaleString()}</div></div>
                                    <div className="row mb-2"><div className="col-6">Present Days</div><div className="col-6">{selectedPayroll.presentDays}</div></div>
                                    <div className="row mb-2"><div className="col-6">Half Days</div><div className="col-6">{selectedPayroll.halfDays}</div></div>
                                    <div className="row mb-2"><div className="col-6">Absent Days</div><div className="col-6">{selectedPayroll.absentDays}</div></div>
                                    <hr />
                                    <div className="row mb-2"><div className="col-6">Absent Deduction</div><div className="col-6 text-danger">₹{selectedPayroll.absentDeduction?.toLocaleString()}</div></div>
                                    <div className="row mb-2"><div className="col-6">PF Deduction</div><div className="col-6 text-danger">₹{selectedPayroll.pfAmount?.toLocaleString()}</div></div>
                                    <div className="row mb-2"><div className="col-6">Tax Deduction</div><div className="col-6 text-danger">₹{selectedPayroll.taxAmount?.toLocaleString()}</div></div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-6"><strong>Net Salary</strong></div>
                                        <div className="col-6"><strong>₹{selectedPayroll.netSalary?.toLocaleString()}</strong></div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeePayroll;