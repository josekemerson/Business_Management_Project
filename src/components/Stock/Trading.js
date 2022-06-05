import React, { Component } from "react";
import ReactHighcharts from "react-highcharts/ReactHighstock.src";
import priceData from "../../assets/btcdata.json";
import moment from "moment";
import { Link } from "react-router-dom";

export default class App extends Component {
  render() {
    const options = { style: "currency", currency: "USD" };
    const numberFormat = new Intl.NumberFormat("en-US", options);
    const configPrice = {
      yAxis: [
        {
          offset: 20,

          labels: {
            formatter: function() {
              return numberFormat.format(this.value);
            },
            x: -15,
            style: {
              color: "#000",
              position: "absolute",
            },
            align: "left",
          },
        },
      ],
      tooltip: {
        shared: true,
        formatter: function() {
          return (
            numberFormat.format(this.y, 0) +
            "</b><br/>" +
            moment(this.x).format("MMMM Do YYYY, h:mm")
          );
        },
      },
      plotOptions: {
        series: {
          showInNavigator: true,
          gapSize: 6,
        },
      },
      rangeSelector: {
        selected: 1,
      },
      title: {
        text: `Company stock price`,
      },
      chart: {
        height: 600,
      },

      credits: {
        enabled: false,
      },

      legend: {
        enabled: true,
      },
      xAxis: {
        type: "date",
      },
      rangeSelector: {
        buttons: [
          {
            type: "day",
            count: 1,
            text: "1d",
          },
          {
            type: "day",
            count: 7,
            text: "7d",
          },
          {
            type: "month",
            count: 1,
            text: "1m",
          },
          {
            type: "month",
            count: 3,
            text: "3m",
          },
          {
            type: "all",
            text: "All",
          },
        ],
        selected: 4,
      },
      series: [
        {
          name: "Price",
          type: "spline",

          data: priceData,
          tooltip: {
            valueDecimals: 2,
          },
        },
      ],
    };
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
        <ReactHighcharts config={configPrice}></ReactHighcharts>
      </div>
    );
  }
}
