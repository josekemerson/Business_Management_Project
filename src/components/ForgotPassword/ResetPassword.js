import React, { useState, useEffect } from "react";
import "./ForgotPassword.css";
import { Link, useLocation } from "react-router-dom";
const axios = require("axios");
function ResetPassword() {
  const location = useLocation();
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [mob, setMob] = useState(null);
  const [passwordError, setPasswordError] = useState(false);
  const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const validatePassword = () => {
    if (!validPassword.test(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  //   const [phonenumber, setPhonenumber] = useState(null);
  //   const handleNumber = (event) => {
  //     setPhonenumber(event.target.value);
  //   };
  async function resetPassword() {
    const data = {
      pass1: password,
      pass2: password2,
      mobile: mob,
    };
    let response = await axios.post("http://localhost:5000/Resetpass", data);
    if (response.status === 200) {
      alert("Otp Sent");
    }
  }
  useEffect(() => {
    setMob(location.state.mobile);
  }, []);
  return (
    <div>
      <div class="card login-form">
        <div class="card-body">
          <h3 class="card-title text-center">Reset password</h3>

          <div class="card-text">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">
                  Enter your Password to Reset.
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="form-control form-control-sm"
                  placeholder="Enter the Password"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={validatePassword}
                  required
                  //   onChange={handleNumber}
                />
                <br />
                <div
                  className={
                    passwordError
                      ? "error error-visible "
                      : "error error-hidden"
                  }
                >
                  Invalid Password
                </div>
                <br />
                <input
                  type="password"
                  name="password2"
                  class="form-control form-control-sm"
                  placeholder="Confirm the Password"
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                  //   onChange={handleNumber}
                />
              </div>

              <button
                type="submit"
                class="btn btn-primary btn-block"
                onClick={() => {
                  resetPassword();
                }}
              >
                Password Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
