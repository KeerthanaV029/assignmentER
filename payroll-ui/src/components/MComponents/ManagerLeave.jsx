import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Manager.css";

const ManagerLeave = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filter, setFilter] = useState("ALL");
    
    const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } };

    useEffect(() => { loadLeaves(); }, [page]);

    const loadLeaves = () => {
        axios.get(`http://localhost:8080/api/leave/manager?page=${page}&size=7`, config)
            .then(res => {
                setLeaveRequests(res.data.content || []);
                setTotalPages(res.data.totalPages || 0);
            })
            .catch(err => console.error("Error loading leaves:", err));
    };

    const handleStatusUpdate = (id, status) => {
        axios.put(`http://localhost:8080/api/leave/approve/${id}`, { leaveStatus: status }, config)
            .then(() => {
                loadLeaves(); 
            })
            .catch(err => console.error("Error updating status:", err.response?.data?.message || err));
    };

    const filteredLeaves = filter === "ALL" ? leaveRequests : leaveRequests.filter(leave => leave.leaveStatus === filter);

    const pendingCount = leaveRequests.filter(l => l.leaveStatus === "PENDING").length;
    const approvedCount = leaveRequests.filter(l => l.leaveStatus === "APPROVED").length;

    return (
        <div className="container-fluid p-4">
            <h2 className="mb-4 fw-bold text-dark">Manage Leave Requests</h2>
            
            <div className="row mb-4">
                {[ {title: "Pending", val: pendingCount, color: "text-warning"}, 
                   {title: "Approved", val: approvedCount, color: "text-success"} ].map((card, i) => (
                    <div className="col-md-6" key={i}>
                        <div className="card shadow-sm border-0 p-4">
                            <small className="text-muted fw-bold">{card.title}</small>
                            <h3 className={`fw-bold ${card.color}`}>{card.val}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="d-flex justify-content-end mb-3">
                <select className="form-select w-25" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="ALL">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                </select>
            </div>

            <div className="table-container shadow-sm bg-white p-4 rounded">
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Employee</th><th>Type</th><th>From</th><th>To</th><th>Status</th><th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeaves.map(leave => (
                            <tr key={leave.leaveId}>
                                <td className="fw-semibold">{leave.employeeName}</td>
                                <td>{leave.leaveType}</td>
                                <td>{leave.startDate}</td>
                                <td>{leave.endDate}</td>
                                <td>
                                    <span className={`badge ${leave.leaveStatus === 'PENDING' ? 'bg-warning-subtle text-warning' : leave.leaveStatus === 'APPROVED' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                                        {leave.leaveStatus}
                                    </span>
                                </td>
                                <td>
                                    {leave.leaveStatus === "PENDING" ? (
                                        <div className="d-flex gap-2">
                                            <button 
                                                className="btn btn-success btn-sm" 
                                                onClick={() => handleStatusUpdate(leave.leaveId, "APPROVED")}
                                            >Approve</button>
                                            <button 
                                                className="btn btn-danger btn-sm" 
                                                onClick={() => handleStatusUpdate(leave.leaveId, "REJECTED")}
                                            >Reject</button>
                                        </div>
                                    ) : (
                                        <button className="btn btn-outline-primary btn-sm">View</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                <button className="btn btn-secondary" disabled={page === 0} onClick={() => setPage(page - 1)}>Prev</button>
                <span>Page {page + 1} of {totalPages || 1}</span>
                <button className="btn btn-secondary" disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};
export default ManagerLeave;