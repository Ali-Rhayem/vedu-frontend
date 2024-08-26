import React from "react";
import "./Login.css";

function Login() {

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-box">
          <h2>Welcome</h2>
          <p>Login into your account</p>
          <form>
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
            <div className="forgot-password">
              <a href="#">Forgot your password?</a>
            </div>
            <button type="submit" className="login-button">Sign in</button>
            <button type="button" className="google-button">Connect with Google</button>
          </form>
          <div className="create-account">
            <a>Create account ?</a>
          </div>
        </div>
        <div className="blue-side"></div>
      </div>
    </div>
  );
}

export default Login;
