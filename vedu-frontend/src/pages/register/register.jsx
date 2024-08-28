import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="blue-side-register">
          <div className="content">
            <img src="path/to/your/image.png" alt="Illustration" />
            <p>lorem ipsum dolor sit amet</p>
          </div>
        </div>
        <div className="register-box">
          <h2>Register</h2>
          <form>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Example"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="***********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="***********"
              />
            </div>
            <button type="submit" className="register-button">Register</button>
          </form>
          <div className="login-link">
            <a onClick={handleLogin}>Already have an account? Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
