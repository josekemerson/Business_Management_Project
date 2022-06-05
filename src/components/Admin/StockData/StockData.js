import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./stockdata.css"

const axios = require("axios");
function StockData() {
  let history = useHistory();

  const [scompanyName, setScompanyName] = useState(null);
  const [sdate, setSdate] = useState(null);
  const [sstockPrice, setSstockPrice] = useState(null);

  const handleCompanyName = (event) => {
    setScompanyName(event.target.value);
  };
  const handleDate = (event) => {
    setSdate(event.target.value);
  };
  const handleStockPrice = (event) => {
    setSstockPrice(event.target.value);
  };
  async function createStock() {
    const data = {
      scompanyName: scompanyName,
      sdate: sdate,
      sstockPrice: sstockPrice,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/saveStock",
        data
      );
      if (response.status === 200) {
        //console.log("Sucessfull");
        history.push("/Stock");
      } else {
        console.log("Failed");
      }
    } catch (e) {
      console.log("Error");
    }
  }

  return (
    <div>
      <form className="Stock">
        <label className="labelstock">Enter the Company Name:</label>
        <input
          type="text"
          placeholder="Company Name"
          onChange={handleCompanyName}
          className="companyname"
          required
        />
     
        <label className="labelstock"> Enter the date of Today:</label>
       
        <input type="date" placeholder="Date" className ="Stockdate"onChange={handleDate}  required />
        <br />
        <label className="labelstock">Enter the Stock Price:</label>
        <input
          type="number"
          placeholder="Stock Price"
          onChange={handleStockPrice}
          className="StockPrice"
          required
        />
        <br />
        <br />
        <input
          type="button"
          value="Enter"
          className="stockbutton"
          onClick={() => {
            createStock();
          }}
        />
      </form>
    </div>
  );
}

export default StockData;
