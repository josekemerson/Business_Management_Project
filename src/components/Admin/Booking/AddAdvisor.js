import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "./main.css";

const axios = require("axios");
const AddAdvisor = () => {
  let history = useHistory();

  const [aname, setAName] = useState(null);
  const [aemail, setAEmail] = useState(null);
  const [aphone, setAPhone] = useState(null);

  const handleName = (event) => {
    setAName(event.target.value);
  };
  const handleEmail = (event) => {
    setAEmail(event.target.value);
  };
  const handlePhone = (event) => {
    setAPhone(event.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      advisorname: aname,
      advisoremail: aemail,
      advisorphone: aphone,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/addadvisors",
        data
      );
      if (response.status === 200) {
        //console.log("Sucessfull");
        history.push("/dashboard");
      } else {
        console.log("Failed");
      }
    } catch (e) {
      console.log("Error");
    }
  };
  return (
    <div className="container-contact100">
      <div className="wrap-contact100">
        <form className="contact100-form validate-form">
          <span className="contact100-form-title">Add Advisors</span>
          <div className="wrap-input100 validate-input bg1">
            <span className="label-input100">Name of the Advisor*</span>
            <input
              className="input100"
              type="text"
              name="name"
              id="hname"
              placeholder="Enter Name"
              onChange={handleName}
              required
            />
          </div>
          <div className="wrap-input100 validate-input bg1 rs1-wrap-input100">
            <span className="label-input100">Email *</span>
            <input
              className="input100"
              type="email"
              name="email"
              id="hemail"
              placeholder="Enter Email "
              onChange={handleEmail}
              required
            />
          </div>
          <div className="wrap-input100 bg1 rs1-wrap-input100">
            <span className="label-input100">Phone</span>
            <input
              className="input100"
              type="tel"
              name="phone"
              id="hphone"
              maxLength="10"
              minLength="10"
              placeholder="Enter Number Phone"
              onChange={handlePhone}
              required
            />
          </div>
          <div className="container-contact100-form-btn">
            <button
              type="button"
              className="contact100-form-btn "
              id="hsubmit"
              onClick={handleSubmit}
            >
              <span>
                Submit
                <i
                  className="fa fa-long-arrow-right m-l-7"
                  aria-hidden="true"
                ></i>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddAdvisor;
