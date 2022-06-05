import React, { useState, useEffect } from "react";
import "./View.css";
import { Link, useHistory } from "react-router-dom";
import { Table } from "react-bootstrap";
const axios = require("axios");
const View = () => {
  const history = useHistory();
  const [ideas, setIdea] = useState(null);
  const token = window.localStorage.getItem("token");
  async function viewMore(id) {
    window.localStorage.setItem("Viewid", id);
    history.push("/checkout");
  }
  async function getIdeas() {
    let response = await axios.get(
      "http://localhost:5000/showInvestIdeaBusiness",
      {
        headers: { Authorization: token },
      }
    );
    if (response.status === 200) {
      setIdea(response.data.message);
    }
  }
  useEffect(() => {
    getIdeas();
  }, []);
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
            <Link to="/Login">
              <li>Log Out</li>
            </Link>
          </ul>
        </nav>
      </header1>
      
      <div>
        <Table striped bordered hover size="sm-10">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Category</th>
              <th>Description</th>
              <th colSpan="2">INR Price</th>
            </tr>
          </thead>
          {ideas &&
            ideas.length > 0 &&
            ideas.map((idea) => {
              return (
                <tbody>
                  <tr>
                    <td>{idea.topic}</td>
                    <td>{idea.category} </td>
                    <td>{idea.description}</td>
                    <td>{idea.price}</td>
                    <td>
                      <input
                        type="button"
                        className="btn btn-primary"
                        value="View More"
                        onClick={() => {
                          viewMore(idea._id);
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </Table>
      </div>

      <footer1>
        <p>Copyright © 2021 ROI.Inc.</p>{" "}
      </footer1>
    </div>
  );
};

export default View;
