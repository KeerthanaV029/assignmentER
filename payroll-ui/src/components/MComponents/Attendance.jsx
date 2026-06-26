import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "../../css/Attendance.css";

const Attendance = () => {
    const [todayAttendance, setTodayAttendance] = useState(null);
    const [history, setHistory] = useState([]);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    
    // New states for Filter and Sort
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("desc");

    const todayApi = "http://localhost:8080/api/attendance/today";
    const historyApi = "http://localhost:8080/api/attendance/history";
    const clockInApi = "http://localhost:8080/api/attendance/clock-in";
    const checkoutApi = "http://localhost:8080/api/attendance/checkout";

    const config = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    };

    useEffect(() => {
        loadTodayAttendance();
        loadAttendanceHistory();
    }, []);

    // Filter and Sort Logic using useMemo
    const processedHistory = useMemo(() => {
        let filtered = history.filter(item => 
            item.attendanceDate.includes(searchTerm) || 
            item.attendanceStatus.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return filtered.sort((a, b) => {
            const dateA = new Date(a.attendanceDate);
            const dateB = new Date(b.attendanceDate);
            return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
        });
    }, [history, searchTerm, sortOrder]);

    const checkOut = () => {
        axios.post(checkoutApi, {}, config)
            .then(response => {
                loadTodayAttendance();
                loadAttendanceHistory();
            })
            .catch(error => console.log(error));
    };

    const loadTodayAttendance = () => {
        axios.get(todayApi, config)
            .then(response => setTodayAttendance(response.data))
            .catch(error => setTodayAttendance(null));
    };

    const loadAttendanceHistory = () => {
        axios.get(historyApi, config)
            .then(response => setHistory(response.data))
            .catch(error => console.log(error));
    };

    const clockIn = () => {
        setErrorMsg("");
        setSuccessMsg("");
        axios.post(clockInApi, {}, config)
            .then(response => {
                setSuccessMsg("Clocked in successfully.");
                loadTodayAttendance();
                loadAttendanceHistory();
            })
            .catch(error => setErrorMsg("Already clocked in today."));
    };

    return (
        <div className="attendance-container">
            <h2 className="page-title">Attendance</h2>
            <div className="attendance-top">
                <div className="attendance-card">
                    <h4>Attendance Actions</h4>
                    {!todayAttendance && <button className="attendance-btn" onClick={clockIn}>Clock In</button>}
                    {todayAttendance && !todayAttendance.checkOutTime && (
                        <>
                            <div className="success-banner">✓ Currently Clocked In</div>
                            <button className="checkout-btn" onClick={checkOut}>Clock Out</button>
                        </>
                    )}
                    {todayAttendance && todayAttendance.checkOutTime && (
                        <>
                            <div className="success-banner">✓ Attendance Completed</div>
                            <button className="attendance-btn" disabled>Attendance Closed</button>
                        </>
                    )}
                    {successMsg && <p className="success-msg">{successMsg}</p>}
                    {errorMsg && <p className="error-msg">{errorMsg}</p>}
                </div>
                <div className="attendance-card">
                    <h4>Today's Attendance</h4>
                    {todayAttendance && (
                        <>
                            <p><strong>Date:</strong> {todayAttendance.attendanceDate}</p>
                            <p><strong>Check In:</strong> {todayAttendance.checkInTime}</p>
                            <p><strong>Check Out:</strong> {todayAttendance.checkOutTime || "--"}</p>
                            <p><strong>Hours:</strong> {todayAttendance.workingHours}</p>
                            <p><strong>Status:</strong> 
                                <span className={todayAttendance.attendanceStatus === "PRESENT" ? "status-present" : "status-progress"}>
                                    {todayAttendance.attendanceStatus || "IN_PROGRESS"}
                                </span>
                            </p>
                        </>
                    )}
                </div>
            </div>

            <div className="attendance-history-card">
                <h4>Attendance History</h4>
                
                {/* Filter and Sort Controls */}
                <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
                    <input 
                        type="text" 
                        placeholder="Search date or status..." 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: "5px" }}
                    />
                    <select onChange={(e) => setSortOrder(e.target.value)} style={{ padding: "5px" }}>
                        <option value="desc">Newest First</option>
                        <option value="asc">Oldest First</option>
                    </select>
                </div>

                <div className="table-wrapper">
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Hours</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processedHistory.map(item => (
                                <tr key={item.id}>
                                    <td>{item.attendanceDate}</td>
                                    <td>{item.checkInTime}</td>
                                    <td>{item.checkOutTime || "--"}</td>
                                    <td>{item.workingHours}</td>
                                    <td>
                                        <span className={
                                            item.attendanceStatus === "PRESENT" ? "status-present" : 
                                            item.attendanceStatus === "HALF_DAY" ? "status-halfday" : 
                                            item.attendanceStatus === "WORK_FROM_HOME" ? "status-wfh" : "status-absent"
                                        }>
                                            {item.attendanceStatus}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Attendance;