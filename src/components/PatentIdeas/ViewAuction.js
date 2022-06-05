import React, { useEffect, useState } from "react";
import { Link , useHistory} from "react-router-dom";
import { Table } from "react-bootstrap";
import jsPDF from "jspdf";
import logo from '../../assets/ROI-logos_black.png';
import GooglePayButton from "@google-pay/button-react";

const axios = require("axios");
function ViewAuction() {
let history = useHistory();
    let id = window.localStorage.getItem("id");
  const [auction, setAuction] = useState(null);

  async function getPatentResults() {
    console.log(id);
    const data = {
      userid: id,
    };
    let response = await axios.post(
      "http://localhost:5000/getAuctionResult",
      data
    );
    if (response.status === 200) {
      setAuction(response.data.auction);
      console.log(response.data.FinalPrice);
    }
  }

  function billGenerator(uname, fprice) {
    const name = uname;
    const price = fprice;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    var doc = new jsPDF("landscape", "px", "a4", "false");
    doc.addImage(logo, "PNG", 20, 20, 60, 60);
    doc.text(150, 125, "Bill Generation");
    doc.text(120, 175, "Name : " + name);
    doc.text(120, 215, "Amount : " + price);
    doc.text(120, 235, "Date : " + today);
    doc.text(120, 255, "Success");
    doc.save("bill.pdf");
    history.push("/dashboard");
  }

  useEffect(() => {
    getPatentResults();
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
            auction.map((p) => {
              if (p.Price_status == "selected") {
                return (
                  <tbody>
                    <tr>
                      <td>{p.title}</td>
                      <td>{p.price}</td>
                      <td>{p.price_expiry}</td>
                      <td>{p.userName}</td>
                      <td>{p.FinalPrice}</td>
                      <td>
                        <GooglePayButton
                          environment="TEST"
                          paymentRequest={{
                            apiVersion: 2,
                            apiVersionMinor: 0,
                            allowedPaymentMethods: [
                              {
                                type: "CARD",
                                parameters: {
                                  allowedAuthMethods: [
                                    "PAN_ONLY",
                                    "CRYPTOGRAM_3DS",
                                  ],
                                  allowedCardNetworks: ["MASTERCARD", "VISA"],
                                },
                                tokenizationSpecification: {
                                  type: "PAYMENT_GATEWAY",
                                  parameters: {
                                    gateway: "example",
                                    gatewayMerchantId:
                                      "exampleGatewayMerchantId",
                                  },
                                },
                              },
                            ],
                            merchantInfo: {
                              merchantId: "12345678901234567890",
                              merchantName: "ROI",
                            },
                            transactionInfo: {
                              totalPriceStatus: "FINAL",
                              totalPriceLabel: "Total",
                              totalPrice: String(p.FinalPrice),
                              currencyCode: "INR",
                              countryCode: "IN",
                            },
                            shippingAddressRequired: true,
                            callbackIntents: ["PAYMENT_AUTHORIZATION"],
                          }}
                          onLoadPaymentData={(paymentRequest) => {
                            //console.log("payment sucess");
                            billGenerator(p.userName, p.FinalPrice);
                            console.log("Success", paymentRequest);
                          }}
                          onPaymentAuthorized={(paymentData) => {
                            console.log(
                              "Payment Authorised Success",
                              paymentData
                            );
                            return { transactionState: "SUCCESS" };
                          }}
                          existingPaymentMethodRequired="false"
                          buttonColor="light"
                          buttonType="pay"
                        />
                      </td>
                    </tr>
                  </tbody>
                );
              }
            })}
        </Table>
      </div>
    </div>
  );
}

export default ViewAuction;
