import React, { useState } from "react";
import axios from "axios";

function LoginComp({tokencode, setTokenCode}) {
//   const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const checkLogin = () => {
    console.log("test");
    axios({
      method: "POST",
      url: "https://fakestoreapi.com/auth/login",
      data: {
        username: userName,
        password: password,
      },
    })
      .then((res) => {
        console.log("assdsadsdas", res.data.token);
        setTokenCode(res.data.token);
        localStorage.setItem('userToken', res.data.token);
        console.log(tokencode);
        console.log("check ls", localStorage.getItem("userToken"))
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-form">
          <h1>Welcome Back</h1>
          <p>Please login to your account</p>
          <div className="input-group">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={checkLogin}>Login</button>
          <div className="bottom-text">
            <p>
              Don't have an account?{" "}
              <a href="#">
                <br /> Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComp;
