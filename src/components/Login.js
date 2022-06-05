import React, { useState } from "react";
import { useHistory } from "react-router";
const axios = require("axios");
const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errmsg, setErrMsg] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async () => {
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post("http://localhost:5000/login", data);
      if (response.status === 200) {
        window.localStorage.setItem("token", response.data.token);
        window.localStorage.getItem("type", response.data.role);
        window.localStorage.setItem("id", response.data.id);
        window.localStorage.setItem("username", response.data.username);
        window.localStorage.setItem("useremail", response.data.useremail);
        window.localStorage.setItem("userphone", response.data.userphone);
        if (response.data.role === "admin") {
          history.push("/useradmin");
        } else {
          if (
            response.data.role === "investor" ||
            response.data.role === "business"
          ) {
            history.push("/dashboard");
          } else if (response.data.role === "advisor") {
            history.push("/advisordash");
          } else {
            console.log("Admin");
          }
        }
      } else {
        history.push("/login");
      }
    } catch (e) {
      alert("Invalid Credentials");
      window.location.reload(true);
      setErrMsg(e);
    }
  };
  return (
    <>
      <section className="showcase login">
        <div className="showcase-overlay">
          <form className="form-control">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your email address"
              required
              onChange={handleEmail}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              onChange={handlePassword}
            />
            <input
              type="button"
              className="submit-button"
              value="Log In"
              onClick={handleSubmit}
            />
            <h4>{errmsg}</h4>
          </form>
        </div>
      </section>
    </>
  );
};
export default Login;
