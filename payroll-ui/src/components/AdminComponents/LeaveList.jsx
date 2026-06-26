import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAllLeaves } from "../../redux/action/leaveAction";
import "../css/LeaveList.css";

function LeaveList() {
    const dispatch = useDispatch();
    const { leaves } = useSelector(state => state.leaves);
    
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [sortOrder, setSortOrder] = useState("desc");

    const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } };

    useEffect(() => { dispatch(getAllLeaves()); }, [dispatch]);

    const loadLeaveRequests = () => { dispatch(getAllLeaves()); };

    const processedLeaves = [...leaves]
        .filter(leave => leave.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(leave => statusFilter === "ALL" || leave.leaveStatus === statusFilter)
        .sort((a, b) => {
            const dateA = new Date(a.appliedDate);
            const dateB = new Date(b.appliedDate);
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });

    const handleStatusUpdate = (id, action) => {
        axios.put(`http://localhost:8080/api/leave/hr/${action.toLowerCase()}/${id}`, {}, config)
            .then(loadLeaveRequests)
            .catch(console.error);
    };

    return (
        <div className="leave-container">
            <h2 className="leave-title">Leave Requests</h2>

            <div className="filter-card shadow-sm mb-4 p-3 d-flex gap-3">
                <input 
                    type="text" className="form-control" placeholder="Search employee..." 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <select className="form-select" onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="ALL">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                </select>
                <button className="btn btn-outline-secondary" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                    Sort Date: {sortOrder.toUpperCase()}
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-primary">
                        <tr>
                            <th>Employee</th><th>Type</th><th>Dates</th><th>Status</th><th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {processedLeaves.map((leave) => (
                            <tr key={leave.id}>
                                <td>{leave.employeeName}</td>
                                <td>{leave.leaveType}</td>
                                <td>{leave.startDate} to {leave.endDate}</td>
                                <td>
                                    <span className={`badge ${
                                        leave.leaveStatus === "APPROVED" ? "bg-success" : 
                                        leave.leaveStatus === "REJECTED" ? "bg-danger" : 
                                        "bg-warning text-dark"
                                    }`}>
                                        {leave.leaveStatus}
                                    </span>
                                </td>
                                <td>
                                    {leave.leaveStatus === "PENDING" && (
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-success btn-sm" onClick={() => handleStatusUpdate(leave.id, "Approve")}>Approve</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleStatusUpdate(leave.id, "Reject")}>Reject</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LeaveList;