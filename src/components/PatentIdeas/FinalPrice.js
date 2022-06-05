import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./FinalPrice.css";

const axios = require("axios");

function FinalPrice() {
  let id = window.localStorage.getItem("_id");
  const [auction, setAuction] = useState(null);

  async function getPatentFinalPrice() {
    let response = await axios.get("http://localhost:5000/getFinalPrice");
    if (response.status === 200) {
      setAuction(response.data.message);
      console.log(response.data);
    }
  }

  async function Selected(id) {
    const data={
      auctionid:id,
    };
    let response = axios
      .post("http://localhost:5000/SelectPrice",data)
      .then(() => {
        alert("Idea Choosen");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getPatentFinalPrice();
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
              <th>Title</th>
              <th>Base Price</th>
              <th>Price Expiry Date</th>
              <th>User Name/Organization</th>
              <th>Final Price</th>
              <th>Remarks</th>
            </tr>
          </thead>

          {auction &&
            auction.length > 0 &&
            auction.map((a) => {
              return (
                <tbody>
                  <tr>
                    <td>{a.title}</td>
                    <td>{a.price}</td>
                    <td>{a.price_expiry}</td>
                    <td>{a.userName}</td>
                    <td>{a.FinalPrice}</td>
                    <td>
                      <input
                        type="button"
                        value="Choose"
                        className="FinalPricebutton"
                        onClick={() => {
                          Selected(a._id);
                          
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </Table>
      </div>
    </div>
  );
}

export default FinalPrice;
