import React, { useEffect, useState } from "react";
import "./profile.css";
import { Link } from "react-router-dom";

const axios = require("axios");

const Profile = () => {
  const token = window.localStorage.getItem("token");
  const [user, setUser] = useState([]);
  async function getProfile() {
    let response = await axios.get("http://localhost:5000/myProfile", {
      headers: { Authorization: token },
    });
    if (response.status === 200) {
      setUser(response.data.message);
    }
  }
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
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
            <Link to="/Login">
              <li>Log Out</li>
            </Link>
          </ul>
        </nav>
      </header1>
      </div>
      <div className="container mt-5" style={{ marginTop: "10rem" }}>
        <div className="row d-flex justify-content-center">
          <div className="col-md-7">
            <div className="card p-3 py-4">
              <div className="text-center">
                {" "}
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMLorm5_s9l2JKPgkTzv61U6yVCIFHGULh7A&usqp=CAU"
                  width={100}
                  className="rounded-circle"
                />{" "}
              </div>
              <div className="text-center mt-3">
                {" "}
                <span className="bg-secondary p-1 px-4 rounded text-white">
                  {user.role}
                </span>
                <h5 className="mt-2 mb-0">{user.uname}</h5>{" "}
                <span>{user.email}</span>
                <br />
                <span>{user.phone}</span>
 
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer1>
        <p>Copyright © 2021 ROI.Inc.</p>{" "}
      </footer1>
    </div>
  );
};

export default Profile;
