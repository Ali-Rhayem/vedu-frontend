import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      localStorage.setItem("token", data.access_token);

      console.log("Login successful", data);
      navigate("/home"); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-box">
          <h2>Welcome</h2>
          <p>Login into your account</p>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="***********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="forgot-password">
              <a href="#">Forgot your password?</a>
            </div>
            <button type="submit" className="login-button">
              Sign in
            </button>
            <button type="button" className="google-button">
              Connect with Google
            </button>
          </form>
          <div className="create-account">
            <a onClick={handleRegister}>Create account ?</a>
          </div>
        </div>
        <div className="blue-side"></div>
      </div>
    </div>
  );
}

export default Login;
