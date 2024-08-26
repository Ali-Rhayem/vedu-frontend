import React from "react";
import "./Register.css";

function Register() {

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
              />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Example@gmail.com"
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="***********"
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
            <a>Already have an account? Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
