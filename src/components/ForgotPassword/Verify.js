import React, { useState, useEffect } from "react";
import "./ForgotPassword.css";
import { useHistory } from "react-router";
import { Link, useLocation } from "react-router-dom";

const axios = require("axios");
function Verify() {
  const [otpnumber, setOTPnumber] = useState(null);
  const [mob, setmob] = useState(null);
  let history = useHistory();
  const location = useLocation();

  const handleCode = (event) => {
    setOTPnumber(event.target.value);
  };

  async function otp() {
    const data = {
      code: otpnumber,
      mobile: mob,
    };
    let response = await axios.post("http://localhost:5000/verify", data);

    if (response.status == 200 && response.data.status == true) {
      history.push({
        pathname: "/Restpassword",
        state: { mobile: mob },
      });
    }
  }

  useEffect(() => {
    setmob(location.state.mobile);
  }, []);
  return (
    <div className="forgot-password">
      <form class="credit-card">
        <div class="form-header">
          <h4 class="title">OTP Number</h4>
        </div>

        <div class="form-body">
          <input
            type="number"
            class="card-number"
            placeholder="Enter OTP number"
            maxLength="10"
            onChange={handleCode}
          />

          <button
            type="submit"
            class="proceed-btn"
            onClick={() => {
              otp(mob);
            }}
          >
            <a href="#">Proceed</a>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Verify;
