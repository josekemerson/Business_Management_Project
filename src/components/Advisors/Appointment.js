import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./appointmentstyle.css";

const axios = require("axios");
function Appointment() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  let id = window.localStorage.getItem("id");
  console.log(today);
  const [advisors, setAdvisors] = useState([]);

  async function getAdvisors() {
    let data = {
      advisorId: id,
    };
    let response = await axios.get("http://localhost:5000/getadvisors");
    setAdvisors(response.data.users);
    if (response.status === 200) {
    }
  }

  useEffect(() => {
    getAdvisors();
  }, []);

  const data = {};
  let history = useHistory();

  const [aname, setAName] = useState(null);
  const [aphone, setAPhone] = useState(null);
  const [aadvisor, setAAdvisor] = useState(null);
  const [adate, setADate] = useState(null);
  const [atime, setATime] = useState(null);

  const uname = window.localStorage.getItem("username");
  function handleLogOut() {
    window.localStorage.removeItem("token");
    if (window.localStorage.getItem("token") === null) {
      history.push("/showcase");
    }
  }

  const handleName = (event) => {
    setAName(event.target.value);
  };
  const handlePhone = (event) => {
    setAPhone(event.target.value);
  };
  const handleAdvisor = (event) => {
    setAAdvisor(event.target.value);
  };
  const handleDate = (event) => {
    setADate(event.target.value);
  };
  const handleTime = (event) => {
    setATime(event.target.value);
  };

  const handleSubmit = async () => {
    let value = {
      aadvisor: aadvisor,
    };
    console.log(value);
    // if(){
    if (aphone.length == 10) {
      const data = {
        aname: uname,
        aphone: aphone,
        aadvisor: aadvisor,
        adate: adate,
        atime: atime,
        id: id,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/appointments",
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
    }
    //  }else{
    //    alert("Advisor not available on that date");
    //  }
    else {
      alert("Phone number error");
    }
  };
  return (
    <div>
      <header1>
        <nav>
          <div id="logo">
            <img
              src="https://i.imgur.com/TdccLUv_d.webp?maxwidth=760&fidelity=grand"
              width="100 "
            />
          </div>
          <ul id="menu">
            <Link to="/Dashboard">
              <li>Home</li>
            </Link>

            <Link to="/Appointment">
              <li>Book Appointments </li>
            </Link>
            <Link to="/stock">
              <li>Stock </li>
            </Link>

            <Link to="/view">
              <li>View Posts </li>
            </Link>
            <Link to="/ViewAuction">
              <li>Auction Result</li>
            </Link>
            <Link to="/Profile">
              {" "}
              <li>Profile </li>
            </Link>
            <Link
              onClick={() => {
                handleLogOut();
              }}
            >
              <li>Log Out</li>
            </Link>
          </ul>
        </nav>
      </header1>
      <div id="booking" className="section">
        <div className="section-center">
          <div className="container-new">
            <div className="booking-form">
              <form>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    defaultvalue={uname}
                    placeholder={uname}
                    onChange={handleName}
                    disabled
                  />
                  <span className="form-label">Name</span>
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="number"
                    maxLength="10"
                    minLength="10"
                    placeholder="Enter your Phone number"
                    onChange={handlePhone}
                  />
                  <span className="form-label">Phone</span>
                </div>

                <div className="form-group">
                  <select
                    className="form-control"
                    onChange={handleAdvisor}
                    required
                  >
                    <option value="" selected>
                      Select Advisors
                    </option>
                    {advisors &&
                      advisors.length > 0 &&
                      advisors.map((p) => {
                        if (p.leave != today) {
                          return <option value={p._id}>{p.uname}</option>;
                        }
                      })}
                  </select>
                  <span className="select-arrow"></span>
                  <span className="form-label">Select Advisors</span>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="date"
                        min="2022-05-12"
                        onChange={handleDate}
                        required
                      />
                      <span className="form-label">Pickup Date</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <select
                        className="form-control"
                        onChange={handleTime}
                        required
                      >
                        <option value="" selected>
                          Pick a Time
                        </option>
                        <option value="10:00AM-11:00AM">
                          10:00 AM-11:00 AM
                        </option>
                        <option value="11:00AM-12:00PM">
                          11:00 AM-12:00 PM
                        </option>
                        <option value="12:00PM-01:00PM">
                          12:00 PM-01:00 PM
                        </option>
                      </select>
                      <span className="select-arrow"></span>
                      <span className="form-label">Time</span>
                    </div>
                  </div>
                </div>
                <div className="form-btn">
                  <input
                    type="button"
                    className="submit-btn"
                    onClick={handleSubmit}
                    value="Book Now"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer1>
        <p>Copyright © 2021 ROI.Inc.</p>{" "}
      </footer1>
    </div>
  );
}
export default Appointment;
