import { useEffect, useState } from "react";
import axios from "axios";
import "../../css/Leave.css";

const Leave = () => {
    const [balance, setBalance] = useState({});
    const [leaveHistory, setLeaveHistory] = useState([]);
    const [leaveType, setLeaveType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const balanceApi = "http://localhost:8080/api/leavebalance/my-balance";
    const leaveHistoryApi = "http://localhost:8080/api/leave/employee/leaveReq";
    const applyLeaveApi = "http://localhost:8080/api/leave/add";

    const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    };

    useEffect(() => {
        loadBalance();
        loadLeaveHistory();
    }, []);

    const loadBalance = () => {
        axios.get(balanceApi, config)
            .then(response => setBalance(response.data))
            .catch(error => console.error("Error loading balance:", error));
    };

    const loadLeaveHistory = () => {
        axios.get(leaveHistoryApi, config)
            .then(response => setLeaveHistory(response.data))
            .catch(error => console.error("Error loading history:", error));
    };

    const applyLeave = () => {
        setErrorMsg("");
        setSuccessMsg("");

        const today = new Date().toISOString().split("T")[0];
        if (!leaveType)
             { 
                setErrorMsg("Please select a leave type.");
                 return; 
            }
        if (!startDate || !endDate) 
            {
                 setErrorMsg("Please select start and end dates."); 
                 return;
            }
        if (startDate < today)
            { 
                setErrorMsg("Start date cannot be in the past."); 
                return; 
            }
        if (endDate < startDate) 
            { 
                setErrorMsg("End date cannot be before start date."); 
                return; 
            }

        const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
        if (days > 2) { setErrorMsg("Maximum 2 leave days are allowed."); return; }

        const maxFutureDate = new Date();
        maxFutureDate.setDate(maxFutureDate.getDate() + 30);
        if (new Date(startDate) > maxFutureDate) 
            { 
                setErrorMsg("Leave cannot be applied more than 30 days in advance."); 
                return; 
            }

        const day = new Date(startDate).getDay();
        if (day === 0 || day === 6) 
            { 
                setErrorMsg("Leave cannot start on weekends."); 
                return; 
            }
        if (!reason.trim() || reason.trim().length < 10) 
            { 
                setErrorMsg("Reason should be at least 10 characters."); 
                return; 
            }

        if (leaveType === "CASUAL" && balance.casualLeaveBalance <= 0)
            { 
                setErrorMsg("No casual leave balance remaining."); 
                return; 
            }
        if (leaveType === "SICK" && balance.sickLeaveBalance <= 0) 
            { 
                setErrorMsg("No sick leave balance remaining."); 
                return; 
            }
        if (leaveType === "PAID" && balance.earnedLeaveBalance <= 0) 
            { 
                setErrorMsg("No earned leave balance remaining."); 
                return; 
            }

        if (leaveHistory.some(item => item.leaveStatus === "PENDING"))
        {
            setErrorMsg("You already have a pending leave request.");
            return;
        }
        const overlap = leaveHistory.some(item =>
             {
                if (item.leaveStatus === "REJECTED")
                     return false;
                return new Date(startDate) <= new Date(item.endDate) && new Date(endDate) >= new Date(item.startDate);
        });

        if (overlap) 
            {
                 setErrorMsg("Leave already exists for the selected dates."); 
                 return; 
            }

        axios.post(applyLeaveApi,  {  leaveType, startDate, endDate, reason }, config)
            .then(() => {
                setSuccessMsg("Leave request submitted successfully.");
                setErrorMsg(""); // Clear errors
                setLeaveType(""); setStartDate(""); setEndDate(""); setReason("");
                loadLeaveHistory();
                loadBalance();
            })
            .catch(error => {
                setErrorMsg(error.response?.data?.message || "Unable to submit leave request.");
            });
    };

    return (
        <div className="leave-container">
            <h2 className="page-title">Leave Management</h2>

            <div className="leave-balance-section">
                <div className="leave-card"><h4>Casual Leave</h4><h2>{balance.casualLeaveBalance ?? 0}</h2></div>
                <div className="leave-card"><h4>Sick Leave</h4><h2>{balance.sickLeaveBalance ?? 0}</h2></div>
                <div className="leave-card"><h4>Earned Leave</h4><h2>{balance.earnedLeaveBalance ?? 0}</h2></div>
            </div>

            <div className="leave-form-card">
                <h3>Apply For Leave</h3>
                {errorMsg && <div className="leave-error alert alert-danger">{errorMsg}</div>}
                {successMsg && <div className="leave-success alert alert-success">{successMsg}</div>}

                <div className="form-group">
                    <label>Leave Type</label>
                    <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                        <option value="">Select Leave Type</option>
                        <option value="CASUAL">Casual Leave</option>
                        <option value="SICK">Sick Leave</option>
                        <option value="PAID">Earned Leave</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Start Date</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>End Date</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Reason</label>
                    <textarea rows="4" value={reason} onChange={(e) => setReason(e.target.value)} />
                </div>

                <button className="apply-btn" onClick={applyLeave}>Apply Leave</button>
            </div>

            <div className="leave-history-card">
                <h3>My Leave Requests</h3>
                <table className="leave-table">
                    <thead>
                        <tr><th>Type</th><th>From</th><th>To</th><th>Reason</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                        {leaveHistory.map(item => (
                            <tr key={item.id}>
                                <td>{item.leaveType}</td>
                                <td>{item.startDate}</td>
                                <td>{item.endDate}</td>
                                <td>{item.reason}</td>
                                <td>
                                    <span className={item.leaveStatus === "APPROVED" ? "approved" : item.leaveStatus === "REJECTED" ? "rejected" : "pending"}>
                                        {item.leaveStatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leave;