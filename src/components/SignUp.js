import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import "./Errorsignin.css";
import "./SignUp.css";
import GooglePayButton from "@google-pay/button-react";

const axios = require("axios");
const SignUp = () => {
  let history = useHistory();

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [type, setType] = useState(null);
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validName = /^[a-z A-Z]+$/;
  const validEmail = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
  const validPhone = /[0-9]{10}/;
  const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const validateusername = () => {
    if (!validName.test(username)) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  };

  const validateEmail = () => {
    if (!validEmail.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const validatePhone = () => {
    if (!validPhone.test(phone)) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };

  const validatePassword = () => {
    if (!validPassword.test(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const buttonCursor = document.querySelector(".button"); //To avoid poniterevent and cursor problem

  const handleCreate = async () => {
    const data = {
      uname: username,
      email: email,
      phone: phone,
      password: password,
      type: type,
    };
    console.log(data);
    if (
      usernameError == false &&
      emailError == false &&
      passwordError == false
    ) {
      if (password === password2) {
        try {
          const response = await axios.post(
            "http://localhost:5000/SignUp",
            data
          );
          console.log(response.status);
          if (response.status === 200) {
            history.push("/Login");
          } else {
            console.log("failed");
          }
        } catch (e) {
          console.log("error");
        }
      } else {
        alert("Password Mismatch");
      }
    } else {
      alert("Enter all details");
    }
  };
  function showRazorpay() {}
  return (
    <>
      <section className="showcase login">
        <div className="showcase-overlay">
          <form className="signup-form-control">
            <div className="Input-box">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Full Name"
                onChange={(e) => setUsername(e.target.value)}
                onKeyUp={validateusername}
              />
              <div
                className={
                  usernameError ? "error error-visible " : "error error-hidden"
                }
              >
                Invalid username
              </div>
            </div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your email address"
              required
              onChange={(e) => setEmail(e.target.value)}
              onKeyUp={validateEmail}
            />
            <div
              className={
                emailError ? "error error-visible " : "error error-hidden"
              }
            >
              Invalid Email
            </div>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Your phone number"
              required
              onChange={(e) => setPhone(e.target.value)}
              onKeyUp={validatePhone}
            />
            <div
              className={
                phoneError ? "error error-visible " : "error error-hidden"
              }
            >
              Invalid Phone Number
            </div>
            <input
              type="radio"
              name="type"
              value="business"
              onChange={(e) => setType(e.target.value)}
              required
            />
            Business
            <input
              type="radio"
              name="type"
              value="investor"
              onChange={(e) => setType(e.target.value)}
              required
            />
            Investor
            <input
              type="radio"
              name="type"
              value="advisor"
              onChange={(e) => setType(e.target.value)}
              required
            />
            Advisor
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Choose your password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={validatePassword}
              required
            />
            <div
              className={
                passwordError ? "error error-visible " : "error error-hidden"
              }
            >
              Invalid Password
            </div>
            <input
              type="password"
              name="password2"
              id="password2"
              placeholder="Confirm your password"
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            <input
              className="submit-button"
              type="button"
              value="Create Your Account"
              onClick={handleCreate}
            />

          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
