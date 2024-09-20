import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./login.css";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { setUser } from "../../redux/userSlice/userSlice";
import Navbar from "./Nav";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await requestApi({
        includeToken: false,
        route: "/api/auth/login",
        requestMethod: RequestMethods.POST,
        body: {
          email: email,
          password: password,
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        navigationFunction: navigate,
      });

      localStorage.setItem("token", response.access_token);

      if (response && response.user) {
        dispatch(setUser(response.user));
      }

      localStorage.setItem("stream_token", response.stream_token);
      localStorage.setItem("user", JSON.stringify(response.user));

      navigate("/home");
    } catch (err) {
      if (err.status === 401) {
        setError("Incorrect email or password");
      } else {
        setError("An error occurred, please try again");
      }
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <Navbar />
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
              {/* <div className="forgot-password">
              <a href="#">Forgot your password?</a>
            </div> */}
              <button type="submit" className="login-button">
                Log in
              </button>
              <button
                type="button"
                className="google-button"
                onClick={handleRegister}
              >
                Create Account
              </button>
            </form>
            {/* <div className="create-account">
            <a onClick={handleRegister}>Create account ?</a>
          </div> */}
          </div>
          <div className="blue-side"></div>
        </div>
      </div>
    </>
  );
}

export default Login;
