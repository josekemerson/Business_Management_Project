import React, { useEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";
import "./AdvisorDash.css";

const axios = require("axios");
const AdvisorDash = () => {
  const history = useHistory();
  let id = window.localStorage.getItem("id");
  const [appointments, setAppointments] = useState([]);

  async function getAppointments() {
    let data = {
      advisorId: id,
    };
    let response = await axios.post(
      "http://localhost:5000/showAppointments",
      data
    );
    setAppointments(response.data.users);
    if (response.status === 200) {
    }
  }

  useEffect(() => {
    getAppointments();
  }, []);
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
      <table>
        <tr>
          <th>Name of the user</th>
          <th>User Phone</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
        {appointments &&
          appointments.length > 0 &&
          appointments.map((p) => {
            return (
              <tr>
                <td>{p.AppointName}</td>
                <td>{p.AppointPhone}</td>
                <td>{p.AppointDate}</td>
                <td>{p.AppointTime}</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default AdvisorDash;
