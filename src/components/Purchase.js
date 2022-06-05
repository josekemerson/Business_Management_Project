import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
const axios = require("axios");
const Purchase = () => {
  const [details, setDetails] = useState([]);
  async function purchaseDetails() {
    const investerid = window.localStorage.getItem("Viewid");

    let response = await axios.get(
      "http://localhost:5000/purchaseDetails/" + investerid
    );
    if (response.status === 200) {
      console.log(response.status);
      setDetails(response.data.users);
    }
  }

  useEffect(() => {
    purchaseDetails();
  }, []);
  return (
    <div>
      <Table striped bordered hover size="sm-10">
        <tr>
          <th>Investor Name</th>
          <th>Investor Mail</th>
          <th>Phone</th>
          <th>Topic</th>
          <th>Category</th>
          <th>Detailed Description</th>
          <th>INR Price</th>
        </tr>
        {details &&
          details.length > 0 &&
          details.map((p) => {
            return (
              <tr>
                <th>jose</th>
                <th>jose@gmail.com</th>
                <th>7896584585</th>
                <th>{p.topic}</th>
                <th>{p.category}</th>
                <th>{p.description}</th>
                <th>{p.price}</th>
              </tr>
            );
          })}
      </Table>
    </div>
  );
};

export default Purchase;
