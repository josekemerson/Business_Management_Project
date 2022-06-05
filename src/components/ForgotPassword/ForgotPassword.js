import React, { useState } from "react";
import "./ForgotPassword.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const axios = require("axios");
function ForgotPassword() {
  let history = useHistory();
  const [phonenumber, setPhonenumber] = useState(null);
  const handleNumber = (event) => {
    setPhonenumber(event.target.value);
  };

  async function phone() {
    const data = {
      number: phonenumber,
    };
    let response = await axios.post("http://localhost:5000/getsms", data);
    console.log(response.data.status);
    if (response.data.status == true) {
      history.push({
        pathname: "/Verify",
        state: { mobile: phonenumber },
      });
    }
  }

  return (
    <div className="forgot-password">
      <form class="credit-card">
        <div class="form-header">
          <h4 class="title">Enter Phone Number Associated With Account</h4>
        </div>

        <div class="form-body">
          <input
            type="number"
            class="card-number"
            placeholder="enter mobile number"
            maxLength="10"
            onChange={handleNumber}
          />

          <button
            type="submit"
            class="proceed-btn"
            onClick={() => {
              phone();
            }}
          >
            <a href="#">Proceed</a>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
