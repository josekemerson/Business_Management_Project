// import Plot from "react-plotly.js";
// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router";



// const axios = require("axios");

//   const [comapanyName, setCompanyName] = useState([]);
//   const [stockPrice, setStockPrice] = useState([]);
//   const [date, setDate] = useState([]);
//   const [stCompanyName, setCmpName] = useState(null);
//   var newdate = [];
//   var newprice = [];
//   const handleCompanyName = (event) => {
//     setCmpName(event.target.value);
//   };
//   async function getShowStock() {
//     let data = {
//       scomapanyName: stCompanyName,
//     };
//     let response = await axios.post("http://localhost:5000/getStockData", data);
//     if (response.status === 200) {
//       setStockPrice(response.data.stockprice);
//       setDate(response.data.stockdate);
//       // setCompanyName(response.data.cname);
//       // console.log(response.data.stockprice);
//       // console.log(response.data.stockdate);
//     }
//   }

//   useEffect(() => {
//     getShowStock();
//   }, []);

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Company Name"
//         onChange={handleCompanyName}
//       />
//       <input
//         type="button"
//         value="Get the Stock"
//         onClick={() => {
//           getShowStock();
//         }}
//       />

//       {
//         (date &&
//           date.length > 0 &&
//           date.map((p) => {
//             newdate.push(p);
//           }),
//         stockPrice &&
//           stockPrice.length > 0 &&
//           stockPrice.map((a) => {
//             newprice.push(a);
//           }))
//       }
//       \{console.log("huuuu", newdate[0], newdate[1])}
//       <Plot
//         data={[
//           {
//             x: [newdate[0], newdate[1]],
//             y: [newprice[0], newprice[1]],
//             type: "scatter",
//             mode: "lines+markers",
//             marker: { color: "red" },
//           },
//         ]}
//         layout={{ width: 1000, height: 500, title: "Stock" }}
//       />
//     </div>
//   );
// }

import React from 'react'
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { Link } from "react-router-dom";

function Stock() {
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
            <Link to ="/Login">
              <li>Log Out</li>
            </Link>
          </ul>
        </nav>
      </header1>
      <div style={{marginTop:'-20px'}}>
      <TradingViewWidget
    symbol="NASDAQ:AAPL"
    theme={Themes.DARK}
    locale="fr"
    width="1370"
    height="600"
  />
      </div>
          <footer1>
        <p>Copyright © 2021 ROI.Inc.</p>{" "}
      </footer1>
    </div>
  )
}

export default Stock
