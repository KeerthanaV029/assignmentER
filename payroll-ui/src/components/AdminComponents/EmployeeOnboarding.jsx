import { useEffect, useState } from "react";
import axios from "axios";
import "../css/EmployeeOnboarding.css";

const EmployeeOnboarding = () => {
    const [searchQuery, setSearchQuery] = useState("");
const [sortBy, setSortBy] = useState("id");
    const [grade, setGrade] = useState("");
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [statusFilter, setStatusFilter] = useState("ALL");

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("EMPLOYEE");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [departmentId, setDepartmentId] = useState("");
    const [designation, setDesignation] = useState("");
    const [experienceYears, setExperienceYears] = useState("");

    const [salary, setSalary] = useState(0);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const isManagerTaken = role === "MANAGER" && employees.some(
        emp => emp.departmentId === Number(departmentId) && emp.role === "MANAGER" );

    const grades = ["TRAINEE", "G1", "G2", "G3"];

    const config = 
    {
        headers: 
        { 
            Authorization: "Bearer " + localStorage.getItem("token") 
        }
    };

    // Validation Variables
    const isInternInvalid = designation === "INTERN" && (Number(experienceYears) > 1 || grade !== "G1");
    const isExecutiveInvalid = designation === "EXECUTIVE" && (Number(experienceYears) < 1 || Number(experienceYears) > 3 || (grade !== "G2" && grade !== "G3"));
    const isManagerInvalid = designation === "MANAGER" && (Number(experienceYears) < 3 || grade !== "G3");

    useEffect(() => {
        loadDepartments();
        loadEmployees();
    }, []);

    useEffect(() => {
        if (designation && grade && experienceYears !== "")
             {
            previewSalary();
        }
    }, [designation, grade, experienceYears]);

    const loadEmployees = (pageNo = 0, status = "ALL") => {
        let api = `http://localhost:8080/api/employee/getAll?page=${pageNo}&size=5`; 
        if (status !== "ALL") 
        {
            api = `http://localhost:8080/api/employee/status?status=${status}&page=${pageNo}&size=5`;
        }

        axios.get(api, config)
            .then(response =>
                 {
                const data = response.data;
                const empList = data.content !== undefined ? data.content : (Array.isArray(data) ? data : []);
                setEmployees(empList);
                if (data.content !== undefined) {
                    setTotalPages(data.totalPages);
                    setPage(data.number);
                }
            })
            .catch(error => {
                console.error("Error loading employees:", error);
            });
    };

    const loadDepartments = () => {
        axios.get("http://localhost:8080/api/department/all", config)
            .then(response => setDepartments(response.data))
            .catch(error => console.log(error));
    };

    const updateStatus = (employeeId, status) => {
        axios.put(`http://localhost:8080/api/employee/status/${employeeId}?status=${status}`, {}, config)
            .then(() => loadEmployees(page, statusFilter))
            .catch(error => console.log(error));
    };

    const previewSalary = () => {
        axios.get(`http://localhost:8080/api/employee/salary-preview?designation=${designation}&grade=${grade}&experienceYears=${experienceYears}`, config)
            .then(response => setSalary(response.data))
            .catch(() => setSalary(0));
    };

    // Enhanced Validation Logic
    const activeManagerExists = role === "MANAGER" && employees.some(
        emp => emp.departmentId === Number(departmentId) &&
            emp.role === "MANAGER" &&
            emp.employeeStatus === "ACTIVE"
    );

    const isDesignationMismatch = role === "MANAGER" && designation !== "MANAGER";

    const onboardEmployee = () => {
        setErrorMsg(""); setSuccessMsg("");

        if (!username || !password || !firstName || !lastName || !email || !phone || !departmentId || !designation || !grade) {
            setErrorMsg("All fields are required."); return;
        }

        if (isDesignationMismatch) {
            setErrorMsg("Managers must have the 'MANAGER' designation."); return;
        }

        if (activeManagerExists) {
            setErrorMsg("Selected department already has an active manager."); return;
        }

        // Final Validation Checks
        if (isInternInvalid) { setErrorMsg("Intern requires G1 grade and 0-1 years experience."); return; }
        if (isExecutiveInvalid) { setErrorMsg("Executive requires G2/G3 grade and 1-3 years experience."); return; }
        if (isManagerInvalid) { setErrorMsg("Manager requires G3 grade and minimum 3 years experience."); return; }

        const body = {
            username, password, role, firstName, lastName, email, phone,
            designation, grade, experienceYears: Number(experienceYears), departmentId: Number(departmentId)
        };

        axios.post("http://localhost:8080/api/employee/onboard", body, config)
            .then(() => {
                setSuccessMsg("Employee onboarded successfully.");
                setUsername(""); setPassword(""); setFirstName(""); setLastName(""); setEmail(""); setPhone("");
                setDepartmentId(""); setDesignation(""); setGrade(""); setExperienceYears(""); setSalary(0);
                loadEmployees(0, "ALL");
            })
            .catch(error => setErrorMsg(error.response?.data || "Unable to onboard employee."));
    };

    return (
        <div className="container mt-4">
            <h2>Employee Onboarding</h2>
            <hr />
            { successMsg && <div className="alert alert-success">{successMsg}</div> }
            { errorMsg && <div className="alert alert-danger">{errorMsg}</div> }
            
            {/* Warning Alerts */}
            {isInternInvalid && <div className="alert alert-warning">Intern requires G1 grade and 0-1 years experience.</div>}
            {isExecutiveInvalid && <div className="alert alert-warning">Executive requires G2/G3 grade and 1-3 years experience.</div>}
            {isManagerInvalid && <div className="alert alert-warning">Manager requires G3 grade and minimum 3 years experience.</div>}
            
            { isManagerTaken && <div className="alert alert-warning">Selected department already has a manager!</div> }
            { activeManagerExists && <div className="alert alert-warning">Selected department already has an active manager.</div> }
            { isDesignationMismatch && <div className="alert alert-warning">Managers must have the 'MANAGER' designation.</div> }

            <div className="row">
                <div className="col-md-6">
                    <h4>Account Information</h4>
                    <input className="form-control mb-3" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <select className="form-control mb-3" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="EMPLOYEE">EMPLOYEE</option>
                        <option value="MANAGER">MANAGER</option>
                        <option value="HR">HR</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <h4>Employee Information</h4>
                    <input className="form-control mb-3" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input className="form-control mb-3" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input className="form-control mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className="form-control mb-3" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

                    <select className="form-control mb-3" value={departmentId} onChange={(e) => {
                        const deptId = e.target.value;
                        setDepartmentId(deptId);
                        setDesignation("");
                        if (deptId) {
                            axios.get(`http://localhost:8080/api/employee/designations-by-department/${deptId}`, config)
                                .then(r => setDesignations(r.data))
                                .catch(() => setDesignations([]));
                        }
                    }}>
                        <option value="">Select Department</option>
                        {departments.map(dept => <option key={dept.id} value={dept.id}>{dept.name}</option>)}
                    </select>

                    <select className="form-control mb-3" value={designation} onChange={(e) => setDesignation(e.target.value)}>
                        <option value="">Select Designation</option>
                        {designations.map(item => <option key={item} value={item}>{item}</option>)}
                    </select>

                    <select className="form-control mb-3" value={grade} onChange={(e) => setGrade(e.target.value)}>
                        <option value="">Select Grade</option>
                        {grades.map(item => <option key={item} value={item}>{item}</option>)}
                    </select>

                    <input type="number" className="form-control mb-2" placeholder="Experience (0-5)" value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)} />
                    <div className="alert alert-info">Estimated Salary : ₹ {salary}</div>

                    <button
                        className="btn btn-primary"
                        onClick={onboardEmployee}
                        disabled={activeManagerExists || isDesignationMismatch || isInternInvalid || isExecutiveInvalid || isManagerInvalid}>
                        {activeManagerExists ? "Active Manager Exists" : isDesignationMismatch ? "Designation Invalid" : "Onboard Employee"}
                    </button>
                </div>
            </div>

            <hr />

            <h3>Employees</h3>
            <select className="form-control mb-3" style={{ width: "200px" }} value={statusFilter} onChange={(e) => 
            {
                setStatusFilter(e.target.value);
                loadEmployees(0, e.target.value);
            }}>
                <option value="ALL">All Employees</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="TERMINATED">Terminated</option>
            </select>

            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th style={{ width: "50px" }}>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Designation</th>
                            <th>Grade</th>
                            <th>Experience</th>
                            <th>Department</th>
                            <th>Salary</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees?.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td><td>{item.fullName}</td><td>{item.email}</td><td>{item.designation}</td><td>{item.grade}</td>
                                <td>{item.experienceYears} Years</td><td>{item.departmentName}</td><td>₹ {item.basicSalary?.toLocaleString() ?? 0}</td><td>{item.role}</td>
                                <td>
                                    <select value={item.employeeStatus} onChange={(e) => updateStatus(item.id, e.target.value)}>
                                        <option value="ACTIVE">ACTIVE</option>
                                        <option value="INACTIVE">INACTIVE</option>
                                        <option value="TERMINATED">TERMINATED</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination-container mt-3 d-flex justify-content-center">
                <button className="btn btn-secondary me-2" disabled={page === 0} onClick={() => loadEmployees(page - 1, statusFilter)}>Previous</button>
                <span>Page {page + 1} of {totalPages}</span>
                <button className="btn btn-secondary ms-2" disabled={page === totalPages - 1} onClick={() => loadEmployees(page + 1, statusFilter)}>Next</button>
            </div>
        </div>
    );
};

export default EmployeeOnboarding;