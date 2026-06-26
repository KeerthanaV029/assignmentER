import Navbar from "../components/Navbar";
import hero from "../assets/hero.png";
import "../css/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home-wrapper">
            <Navbar />

                <div className="row justify-content-center text-center">
                    <div className="col-lg-7 col-md-9">
                        <h1 className="hero-title">
                            Simplify <span className="gradient-text">Payroll, Attendance & Leave</span> Management
                        </h1>
                        <p className="hero-subtitle">
                            Streamline your operations with intelligent payroll, attendance, and leave management. 
    The all-in-one platform to effectively manage, compensate, and engage your workforce.
                        </p>
                        <div className="cta-group">
                            <Link to="/login" className="hero-btn">Get Started</Link>
                        </div>
                    </div>
                </div>

            {/* Features Section */}
            <section className="container features-section">
                <div className="row g-4">
                    {[
                        { icon: "📅", title: "Attendance", desc: "Automated tracking for real-time visibility." },
                        { icon: "📝", title: "Leave Management", desc: "Seamless approval workflow for all." },
                        { icon: "💰", title: "Payroll Processing", desc: "One-click salary and tax generation." }
                    ].map((f, i) => (
                        <div className="col-md-4" key={i}>
                            <div className="feature-card">
                                <div className="feature-icon">{f.icon}</div>
                                <h4>{f.title}</h4>
                                <p>{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;