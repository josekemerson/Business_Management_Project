import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./AdvisorDash.css";
import "./Leave.css";
const axios = require("axios");
function Leave() {
  const history = useHistory();
  let id = window.localStorage.getItem("id");
  const [leave, setLeave] = useState([]);
  const [lreason, setLreason] = useState(null);
  const [ldate, setLdate] = useState(null);

  const handleReason = (event) => {
    setLreason(event.target.value);
  };
  const handleDate = (event) => {
    setLdate(event.target.value);
  };
  async function getleave() {
    let data = {
      advisorid: id,
      lreason: lreason,
      ldate: ldate,
    };

    let response = await axios.post("http://localhost:5000/leave", data);
    setLeave(response.data.users);
    if (response.status === 200) {
      let newdata = {
        advisorid: id,
        date: ldate,
      };

      let response = await axios.post("http://localhost:5000/setdate", newdata);
      if (response.status === 200) {
        console.log("Leave Updated");
      } else {
        console.log("Updation Failed");
      }

      alert("Leave Applied");
    } else {
      alert("Failed");
    }
  }
  function handleLogOut() {
    window.localStorage.removeItem("token");
    if (window.localStorage.getItem("token") === null) {
      history.push("/showcase");
    }
  }

  return (
    <div>
      <header className="header5" role="banner">
        <h1 className="logo">
          <a href="/admin_pannel">
            Advisor <span>Pannel</span>
          </a>
        </h1>
        <div className="nav-wrap">
          <nav className="main-nav" role="navigation">
            <ul className="unstyled list-hover-slide">
              <li>
                <a href="/AdvisorDash">My Booking</a>
              </li>
              <li>
                <a href="/Leave">Apply Leave</a>
              </li>
              <Link
                onClick={() => {
                  handleLogOut();
                }}
              >
                <li>Log Out</li>
              </Link>
            </ul>
          </nav>
        </div>
      </header>
      
            <form>
            <div class="form-group">
                <span className="form-label">Reason</span>
                <input
                  className="form-control"
                  type="text"
                  
                  placeholder="Enter reason"
                  onChange={handleReason}
                  required
                  style={{ width: "50%" , marginLeft:"25%"}}
                /><br />
         

             
                    <input
                      className="form-control"
                      type="date"
                      min="2022-05-12"
                      onChange={handleDate}
                      required
                      style={{ width: "50%" , marginLeft:"25%"}}
                    />
                    <span className="form-label">Pickup Leave Date</span>
             
          
                <input
                  type="button"
                  className="submit-btn"
                  style={{ width: "50%" }}
                  onClick={() => {
                    getleave();
                  }}
                  value="Apply Leave"
                />
              </div>
            </form>
            </div>
    
  );
}

export default Leave;
