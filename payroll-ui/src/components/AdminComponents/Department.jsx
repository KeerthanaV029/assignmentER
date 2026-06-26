import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Department.css";

const Department = () => {
    const [departments, setDepartments] = useState([]);
    const [name, setName] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState(""); // Added success message
    const [selectedDept, setSelectedDept] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    };

    useEffect(() => { loadDepartments(); }, []);

    const loadDepartments = () => {
        axios.get("http://localhost:8080/api/department/all", config)
            .then(response => setDepartments(response.data))
            .catch(error => console.error("Error loading departments:", error));
    };

    const addDepartment = () => {
        if (!name.trim()) return;
        setErrMsg("");
        setSuccessMsg("");
        axios.post("http://localhost:8080/api/department/add", { name }, config)
            .then(() => { 
                setName(""); 
                setSuccessMsg("Department added successfully!");
                loadDepartments(); 
            })
            .catch(error => {
                setErrMsg(error.response?.data?.message || "Department already exists");
            });
    };

    const deleteDepartment = (id) => {
        // Removed window.confirm
        axios.put(`http://localhost:8080/api/department/delete/${id}`, {}, config)
            .then(() => {
                setSuccessMsg("Department deleted successfully.");
                loadDepartments();
            })
            .catch(error => {
                setErrMsg("Error deleting department.");
                console.error("Error deleting:", error);
            });
    };

    const viewDepartment = (id) => {
        axios.get(`http://localhost:8080/api/department/details/${id}`, config)
            .then(response => { setSelectedDept(response.data); setShowModal(true); })
            .catch(error => console.error("Error loading details:", error));
    };

    return (
        <div className="container mt-4">
            <h2 style={{ color: "#1e293b" }}>Departments</h2>
            <hr />

            {/* Success and Error Feedback Area */}
            {errMsg && <div className="alert alert-danger">{errMsg}</div>}
            {successMsg && <div className="alert alert-success">{successMsg}</div>}

            <div className="card mb-4" style={{ width: "200px" }}>
                <div className="card-body">
                    <h6 className="card-title text-muted">Total Departments</h6>
                    <h3>{departments.length}</h3>
                </div>
            </div>

            <div className="mb-4">
                <h4>Add Department</h4>
                <div className="input-group" style={{ maxWidth: "400px" }}>
                    <input type="text" className="form-control" placeholder="Department Name" value={name} onChange={(e) => { setName(e.target.value); setErrMsg(""); setSuccessMsg(""); }} />
                    <button className="btn btn-primary" onClick={addDepartment}>Add</button>
                </div>
            </div>

            <h4>Department List</h4>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Department Name</th>
                            <th>View Details</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map(dept => (
                            <tr key={dept.id}>
                                <td>{dept.name}</td>
                                <td>
                                    <button className="btn btn-outline-primary btn-sm" onClick={() => viewDepartment(dept.id)}>View Details</button>
                                </td>
                                <td>
                                    <button className="btn btn-outline-danger btn-sm" onClick={() => deleteDepartment(dept.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal remains the same */}
            {showModal && selectedDept && (
                <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedDept.departmentName}</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)} />
                            </div>
                            <div className="modal-body">
                                <h6>Manager: {selectedDept.managerName || "Unassigned"}</h6>
                                <hr />
                                <table className="table">
                                    <thead><tr><th>Name</th><th>Designation</th><th>Grade</th></tr></thead>
                                    <tbody>
                                        {selectedDept.employees?.map(emp => (
                                            <tr key={emp.id}>
                                                <td>{emp.fullName}</td>
                                                <td>{emp.designation}</td>
                                                <td>{emp.grade}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Department;