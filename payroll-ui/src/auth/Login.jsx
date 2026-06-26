import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const loginApi = "http://localhost:8080/api/auth/login";
    const userDetailsApi = "http://localhost:8080/api/auth/user-details";

    const navigate = useNavigate();

    const onLogin = async (e) => {
        e.preventDefault();
        setErrMsg(""); 

        const config = {
            headers: {
                'Authorization': "Basic " + window.btoa(username + ":" + password)
            }
        };

        try {
            // 1. Authenticate and get Token
            const response = await axios.get(loginApi, config);
            const token = response.data.token;
            
            localStorage.setItem("token", token);
            localStorage.setItem("username", username);

            // 2. Fetch User Details to get the Role
            const config_details = {
                headers: { 'Authorization': "Bearer " + token }
            };

            const resp = await axios.get(userDetailsApi, config_details);
            const role = resp.data.role;
            localStorage.setItem("role", role);

            // 3. Simplified Navigation Logic
            if (role === "HR") {
                navigate("/admin");
            } else if (role === "MANAGER") {
                navigate("/manager");
            } else if (role === "PAYROLL_PROCESSOR") {
                navigate("/payroll");
            } else {
                // Default for regular employees
                navigate("/employee");
            }

        } catch (err) {
            console.error(err);
            setErrMsg("Invalid username or password.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">PayrollPro</h2>
                <p className="login-subtitle">Sign in to continue</p>

                {errMsg && <div className="alert alert-danger">{errMsg}</div>}

                <form onSubmit={onLogin}>
                    <div className="mb-3">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="login-btn-custom">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;