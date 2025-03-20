import React, { useState, useEffect } from "react";
import "./register.css";
import axios from "axios";
const Register = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Validation function
  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (isFlipped && user.username.length < 4) {
      setError("Username must be at least 4 characters long.");
      return false;
    }
    if (!emailRegex.test(user.email)) {
      setError("Invalid email format.");
      return false;
    }
    if (user.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const apiUrl = `http://localhost:3000/api/auth/${type}`;
      await axios.post(apiUrl, user);

      setUser({
        username: "",
        email: "",
        password: "",
      });

      setSuccess(type === "login" ? "Login successful!" : "Signup successful!");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className={`flip-container ${isFlipped ? "flipped" : ""}`}>
      <div className="flipper">
        <div className="login-container">
          <div className="left-section">
            <h2>
              <strong>Success starts here</strong>
            </h2>
            <ul className="list-unstyled mt-3">
              <li>✔ Find top freelancers worldwide</li>
              <li>✔ Get quality work done fast</li>
              <li>✔ Secure payments & easy collaboration</li>
              <li>✔ Scale your business effortlessly</li>
            </ul>
          </div>
          <div className="right-section">
            <h3 className="mb-3">Sign in to your account</h3>
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={() => setIsFlipped(true)}>
                Join here
              </a>
            </p>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
            <form onSubmit={(e) => handleSubmit(e, "login")}>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="btn btn-light btn-social btn-outline-dark">
                Login
              </button>
            </form>
            <p className="mt-3 text-muted text-center">
              By joining, you agree to our <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </p>
          </div>
        </div>

        <div className="signup-container">
          <div className="signup-right-section">
            <h2>
              <strong>Join the best freelancing platform</strong>
            </h2>
            <ul className="list-unstyled mt-3">
              <li>✔ Work with trusted clients</li>
              <li>✔ Get paid securely & on time</li>
              <li>✔ Showcase your talent to the world</li>
              <li>✔ Join a community of professionals</li>
            </ul>
          </div>
          <div className="signup-left-section">
            <h3 className="mb-3">Create your account</h3>
            <p>
              Already have an account?{" "}
              <a href="#" onClick={() => setIsFlipped(false)}>
                Sign in
              </a>
            </p>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
            <form onSubmit={(e) => handleSubmit(e, "signup")}>
              <div className="mb-3">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  value={user.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="btn btn-light btn-social btn-outline-dark">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
