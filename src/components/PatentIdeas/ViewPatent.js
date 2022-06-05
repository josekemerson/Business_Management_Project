import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const axios = require("axios");

function ViewPatent() {
  let id = window.localStorage.getItem("id");
  let uname = window.localStorage.getItem("username");
  

  const [patentideas, setPatentIdea] = useState(null);
  const [finalprice, setFinalprice] = useState(null);
  const token = window.localStorage.getItem("token");

  const handleFinalPrice = (event) => {
    setFinalprice(event.target.value);
  };
  async function viewMore(id) {
    window.localStorage.setItem("Viewid", id);
  }

  async function FinalPatent(title, price, date) {
    alert("Final Price Added");
    const data = {
      fprice: finalprice,
      pttitle: title,
      bprice: price,
      ptprice_expiry: date,
      userid: id,
      uname: uname,
    };
    let response = await axios.post("http://localhost:5000/PostPrice", data);
    if (response.status === 200) {
      setFinalprice(response.data.message);
      window.location.reload(false);
    }
  }

  async function getPatentIdeas() {
    let response = await axios.get("http://localhost:5000/getpatentideas");
    if (response.status === 200) {
      setPatentIdea(response.data.message);
    }
  }
  useEffect(() => {
    getPatentIdeas();
  }, []);

  const data = {};
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
            <Link to="/showcase">
              <li>Log Out</li>
            </Link>
          </ul>
        </nav>
      </header1>

      <div>
        <Table striped bordered hover size="sm-10">
          <thead>
            <tr>
              <th>Classification</th>
              <th>Date</th>
              <th>Priority Data</th>
              <th>Applicant</th>
              <th>Inventor</th>
              <th>Title</th>
              <th>Abstract</th>
              <th>Base Price</th>
              <th>Price Expiry Date</th>
              <th colSpan="3">Remarks</th>
            </tr>
          </thead>
          {patentideas &&
            patentideas.length > 0 &&
            patentideas.map((i) => {
              if (i.status == "active") {
                return (
                  <tbody>
                    <tr>
                      <td>{i.classification}</td>
                      <td>{i.date} </td>
                      <td>{i.priority_data}</td>
                      <td>{i.applicant}</td>
                      <td>{i.inventor}</td>
                      <td>{i.title}</td>
                      <td>{i.abstract}</td>
                      <td>{i.price}</td>
                      <td>{i.price_expiry}</td>
                      <td>
                        <input
                          type="number"
                          onChange={handleFinalPrice}
                        ></input>
                      </td>
                      <td>
                        <input
                          type="button"
                          className="patent-button"
                          value="Submit"
                          onClick={() => {
                            FinalPatent(i.title, i.price, i.price_expiry);
                          }}
                        />
                      </td>
                      {id == i.userId ? (
                        <td>
                          <Link to="/FinalPrice">
                            <input
                              type="button"
                              className="patent-button"
                              value="My Patent Price"
                            />
                          </Link>
                        </td>
                      ) : (
                        <td></td>
                      )}
                    </tr>
                  </tbody>
                );
              }
            })}
        </Table>
      </div>

      <footer1>
        <p>Copyright © 2021 ROI.Inc.</p>{" "}
      </footer1>
    </div>
  );
}

export default ViewPatent;
