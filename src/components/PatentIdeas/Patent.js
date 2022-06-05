import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import "./Patent.css";

const axios = require("axios");
const Patent = () => {
  let id = window.localStorage.getItem("id");
  let history = useHistory();

  const [pclassification, setPClassification] = useState(null);
  const [pdate, setPdate] = useState(null);
  const [ppriority_data, setPpriority_data] = useState(null);
  const [papplicant, setPapplicant] = useState(null);
  const [pinventor, setPinventor] = useState(null);
  const [ptitle, setPtitle] = useState(null);
  const [pabstract, setPabstract] = useState(null);
  const [pprice, setPprice] = useState(null);
  const [file, setFile] = useState();
  const [filename, setFileName] = useState("");
  const [pprice_expiry, setPriceExpiry] = useState(null);

  const handleClassification = (event) => {
    setPClassification(event.target.value);
  };
  const handleDate = (event) => {
    setPdate(event.target.value);
  };
  const handlePriority_data = (event) => {
    setPpriority_data(event.target.value);
  };
  const handleApplicant = (event) => {
    setPapplicant(event.target.value);
  };
  const handleInventor = (event) => {
    setPinventor(event.target.value);
  };
  const handleTitle = (event) => {
    setPtitle(event.target.value);
  };
  const handleAbstract = (event) => {
    setPabstract(event.target.value);
  };
  const handlePrice = (event) => {
    setPprice(event.target.value);
  };
  const handleEprice = (event) => {
    setPriceExpiry(event.target.value);
  };
  const handleSubmit = async () => {
    const data = {
      pclassification: pclassification,
      pdate: pdate,
      ppriority_data: ppriority_data,
      papplicant: papplicant,
      pinventor: pinventor,
      ptitle: ptitle,
      pabstract: pabstract,
      pprice: pprice,
      puserid: id,
      pprice_expiry: pprice_expiry,
    };

    // formData.append("pclassification", pclassification);
    // formData.append("pdate", pdate);
    // formData.append("ppriority_data", ppriority_data);
    // formData.append("papplicant", papplicant);
    // formData.append("pinventor", pinventor);
    // formData.append("ptitle", ptitle);
    // formData.append("pabstract", pabstract);
    // formData.append("pprice", pprice);
    // formData.append("puserid", id);
    // formData.append("pprice_expiry", pprice_expiry);
    // formData.append("file", file);
    // formData.append("filename", filename);
    try {
      const response = await axios.post(
        "http://localhost:5000/savepatentIdeas",
        data
      );
      if (response.status === 200) {
        alert("Patent Sucessfully Posted");
        //console.log("Sucessfull");
        //history.push("/Dashboard");
      } else {
        console.log("Failed");
      }
    } catch (e) {
      console.log("Error");
    }
  };
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  console.log(today);
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
      <div class="patent">
        <form id="contact">
          <h3 style={{ paddingTop: "20px" }}>Patent Ideas</h3>
          <br />

          <fieldset>
            <label>Classification: </label>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <input
              placeholder="Classification"
              type="text"
              tabindex="1"
              //required
              autofocus
              // pattern="[a-z][A-Z]"
              onChange={handleClassification}
            />
          </fieldset>
          <fieldset>
            <label>Patent Issued Date: </label>
            &nbsp; &nbsp; &nbsp;
            <input
              placeholder="Filing Date"
              type="date"
              tabindex="2"
              max={today}
              //required
              onChange={handleDate}
            />
          </fieldset>
          <fieldset>
            <label style={{ paddingRight: "5px" }}>Priority Data: </label>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            <input
              placeholder="Priority Data"
              type="text"
              tabindex="3"
              //required
              // pattern="[a-z][A-Z]"
              onChange={handlePriority_data}
            />
          </fieldset>
          <fieldset>
            <label style={{ paddingRight: "45px" }}>Patent Applicant: </label>
            <input
              placeholder="Applicant"
              type="text"
              tabindex="4"
              // pattern="[a-z][A-Z]"
              onChange={handleApplicant}
              //required
            />
          </fieldset>
          <fieldset>
            <label style={{ paddingRight: "50px" }}>Patent Inventor: </label>
            <input
              placeholder="Inventor"
              type="text"
              tabindex="5"
              // pattern="[a-z][A-Z]"
              onChange={handleInventor}
              //required
            />
          </fieldset>
          <fieldset>
            <label style={{ paddingRight: "95px" }}>Idea Title: </label>
            <input
              placeholder="Title"
              type="text"
              tabindex="6"
              // pattern="[a-z][A-Z]"
              onChange={handleTitle}
              //required
            />
          </fieldset>
          <fieldset>
            <label style={{ paddingRight: "65px" }}>Idea Abstract: </label>
            <textarea
              placeholder="Abstract..."
              tabindex="7"
              onChange={handleAbstract}
              // pattern="[a-z][A-Z]"
              //required
            ></textarea>
          </fieldset>
          <fieldset>
            <label>Base Price Of the Idea: </label>

            <input
              placeholder="In INR"
              type="number"
              tabindex="8"
              onChange={handlePrice}
              //required
            />
            <br />
          </fieldset>
          {/* <fieldset>
            <label style={{ paddingRight: "40px" }}>Patent Certificate: </label>

            <input
              placeholder="Upload the File"
              type="file"
              tabindex="9"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setFileName(e.target.files[0].name);
              }}
              //required
            />
            <br />
            <br />
          </fieldset> */}
          <fieldset>
            <label>Patent Expiry Date: </label>
            &nbsp; &nbsp; &nbsp;
            <input
              placeholder="Filing Date"
              type="date"
              tabindex="2"
              min={today}
              //required
              onChange={handleEprice}
            />
          </fieldset>
          <fieldset>
            <button
              name="submit"
              type="submit"
              id="contact-submit"
              data-submit="...Sending"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <br />
            <br />
          </fieldset>
        </form>
      </div>
      <footer1>
        <p>Copyright © 2021 ROI.Inc.</p>{" "}
      </footer1>
    </div>
  );
};

export default Patent;
