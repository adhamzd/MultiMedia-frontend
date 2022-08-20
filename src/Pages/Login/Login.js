import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import Logo from "../../images/logo.png";
import Error from "../../Components/Error/Error";
import "./Login.css";

const Login = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wrong, setWrong] = useState(false);
  const [type, setType] = useState("password");
  const [error, setError] = useState(false);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("../dashboard/members", { replace: true });
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setWrong(false);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACK_URL}admin/login`,
        requestOptions
      );
      const res = await response.json();
      if (res.token) {
        sessionStorage.setItem("token", res.token);
        navigate("../dashboard/members", { replace: true });
      } else {
        setWrong(true);
      }
    } catch (e) {
      setError(true);
    }
  };

  const toggllePassword = () => {
    type === "password" ? setType("text") : setType("password");
    return;
  };

  return (
    <div className="loginPage">
      <HelmetProvider>
        <Helmet>
          <title>Multi Media | Login</title>
        </Helmet>
      </HelmetProvider>
      {error ? (
        <Error />
      ) : (
        <>
          <img src={Logo} alt={"logo"} className="logo" />
          <form className="loginForm" onSubmit={(e) => onSubmit(e)}>
            <label className="loginLabel">
              <h3>USERNAME</h3>
              <input
                className="loginInput"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <br />
            <label className="loginLabel">
              <h3>PASSWORD</h3>
              <input
                className="loginInput"
                type={type}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div onClick={toggllePassword} className="passIcon">
                {type === "password" ? (
                  <AiFillEye style={{ color: "grey" }} />
                ) : (
                  <AiFillEyeInvisible style={{ color: "grey" }} />
                )}
              </div>
            </label>
            <br />
            <button type="submit" className="loginButton">
              Login
            </button>
          </form>
        </>
      )}
      {wrong && (
        <div style={{ color: "red", fontSize: "1.5rem", marginTop: "12px" }}>
          Invalid Username or password
        </div>
      )}
    </div>
  );
};

export default Login;
