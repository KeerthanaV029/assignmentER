import { Link } from "react-router-dom";
import "../css/Home.css";

const Navbar = () => {

    return (
        <nav className="custom-navbar d-flex justify-content-between align-items-center">

            <div className="navbar-logo">
                
                    <i className="bi bi-shield-check" style={{ marginRight: '10px' }}></i>
                    PayrollPro
    
            </div>

            <div>
                <Link
                    to="/"
                    className="nav-link-custom"
                >
                    Home
                </Link>

                <Link
                    to="/login"
                    className="login-btn"
                >
                    Login
                </Link>
            </div>

        </nav>
    )
}

export default Navbar;