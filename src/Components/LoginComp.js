import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
// import { useNavigate  } from 'react-router-dom';

function LoginComp({tokencode, setTokenCode}) {
//   const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [oneClick, setOneClick] = useState(false);
  


  const handleOneClick = ()=>{
    setOneClick(true);
    console.log('Testttt')
  }


  // useEffect(() => {
  //   window.otpless = (otplessUser) => {
  //    alert(JSON.stringify(otplessUser));
  //   };
  //  }, [oneClick]);

              

  // let navigate = useNavigate();

  const checkLogin = () => {
    console.log("test");
    axios({
      method: "POST",
      url: "https://api.escuelajs.co/api/v1/auth/login",
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        console.log("assdsadsdas", res.data.access_token);
        setTokenCode(res.data.access_token);
        localStorage.setItem(`userToken`, res.data.access_token);
        console.log(tokencode);
        console.log("check ls", localStorage.getItem("userToken"));
        // navigate('/');
      })
      .catch((err) => {
        console.log("Err", err);
        Swal.fire({
          title: "Email or Password is wrong",
          text: "Please login and continue",
          icon: "error"
        });
      });
  };


  const SignUpHandle = () =>{
    console.log('Singup');
    axios({
      method: 'POST',
      url: 'https://api.escuelajs.co/api/v1/users/',
      data: {
        name: firstName,
        email: email,
        // username: userName,
        password: password,
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfVZyKFiUD2ZNuNdvK81INhRz6jGwXeerSO0FXlAhHQQ&s'
      }
    }).then((res) =>{
        console.log('SIGNUP RES', res);
        setUserId(res.data);
        console.log('USER ID',userId);
        setIsSignUp(true);
        Swal.fire({
          title: "Account Created",
          text: "Please login and continue",
          icon: "success"
        });
    })
  }

  // const GetUserDetail = () =>{
  //   axios.get(`https://fakestoreapi.com/users/4`).then((res)=>{
  //     console.log('Get User',res);
  //   })
  // }


  const ToggleSignUp = () =>{
    if(isSignUp){
      setIsSignUp(false);
    }
    else{
      setIsSignUp(true);
    }
  }



  return (
    <div className="login_per">
      {isSignUp ? 
      <div className="login-container">
        <div className="login-form">
          <h1>Welcome Back</h1>
          <p>Please login to your account</p>
          <div className="input-group">
            <label>Email</label>
          <input
              type="email"
              id="email"
              name="email"
              placeholder="Email ID"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="input-group">
          <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={checkLogin}>Login</button>
          <div className="bottom-text">
            <p>
              Don't have an account?{" "}
              <a className="signUp_btn" onClick={ToggleSignUp}>
                <br /> Sign Up
              </a>
            </p>
            {/* <button onClick={()=> handleOneClick}>One Click</button> */}
          </div>
        </div>
      </div>

      :

      <div className="login-container">
        <div className="login-form">
          <h1>Create Your Account</h1>
          <p>Please login to your account</p>
          <div>
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="First Name"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          {/* <div className="input-group">
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Last Name"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </div> */}
          </div>
          <div className="input-group">
          <label>Email ID</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email ID"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
          <label>Username</label>
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
          <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={SignUpHandle}>Sign Up</button>
          <div className="bottom-text">
            <p>
            Already have an account?{" "}
              <a className="signUp_btn"  onClick={ToggleSignUp}>
                <br /> Login
              </a>
            </p>
          </div>
        </div>
      </div>

  }

    </div>
  );
}

export default LoginComp;
