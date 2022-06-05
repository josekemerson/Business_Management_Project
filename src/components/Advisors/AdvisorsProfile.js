import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./AdvisorsProfile.css";

const axios = require("axios");
function AdvisorsProfile() {
  let id = window.localStorage.getItem("id");
  const [appointments, setApppointments] = useState([]);
  async function getAppointments() {
    let data = {
      advisorId: id,
    };
    let response = await axios.post(
      "http://localhost:5000/showAppointments",
      data
    );
    setApppointments(response.data.users);
    if (response.status === 200) {
    }
  }

  useEffect(() => {
    getAppointments();
  }, []);
  return (
    <div>
      <table className="table1">
        <tr>
          <th>Advisors Name</th>
          <th>Phone Number</th>
          <th>Appointment Date</th>
          <th>Appointment Time</th>
        </tr>
        {appointments &&
          appointments.length > 0 &&
          appointments.map((p) => {
            return (
              <tr>
                <td>Alfreds Futterkiste</td>
                <td>Maria Anders</td>
                <td>Germany</td>
                <td>1</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
}

export default AdvisorsProfile;
