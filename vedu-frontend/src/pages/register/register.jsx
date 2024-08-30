import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const requestBody = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };

    try {
      const data = await requestApi({
        includeToken: false, 
        route: "/api/auth/register",
        requestMethod: RequestMethods.POST,
        body: requestBody,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        navigationFunction: navigate,
      });

      console.log("Registration successful", data);

      navigate("/login"); 
    } catch (err) {
      setError(err.message); 
    }
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
          <form onSubmit={handleRegister}>
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
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="register-button">
              Register
            </button>
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
