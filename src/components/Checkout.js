import React from "react";
import "./Checkout.css";
import { useHistory } from "react-router-dom";

const Checkout = () => {
  const history = useHistory();
  async function handleCheckout() {
    if (window.confirm("Payment Successfull \nProceed to dashboard")) {
      history.push("/dashboard");
    } else {
      history.push("*");
    }
  }
  return (
    <div>
      <div className="row">
        <div className="col-50">
          <h3>CheckOut</h3>
          <label htmlFor="fname">
            <i className="fa fa-user" /> Full Name
          </label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Full Name"
          />
          <label htmlFor="email">
            <i className="fa fa-envelope" /> Email
          </label>
          <input type="text" id="email" name="email" placeholder="Email" />
        </div>
        <div className="col-50">
          <h3>Payment</h3>
          <label htmlFor="fname">Accepted Cards</label>
          <div className="icon-container">
            <i className="fa fa-cc-visa" style={{ color: "navy" }} />
            <i className="fa fa-cc-amex" style={{ color: "blue" }} />
            <i className="fa fa-cc-mastercard" style={{ color: "red" }} />
            <i className="fa fa-cc-discover" style={{ color: "orange" }} />
          </div>
          <label htmlFor="cname">Name on Card</label>
          <input type="text" id="cname" name="cardname" />
          <label htmlFor="ccnum">Credit card number</label>
          <input
            type="text"
            id="ccnum"
            name="cardnumber"
            placeholder="1111-2222-3333-4444"
          />
          <label htmlFor="expmonth">Exp Month</label>
          <input type="text" id="expmonth" name="expmonth" />
          <div className="row">
            <div className="col-50">
              <label htmlFor="expyear">Exp Year</label>
              <input type="text" id="expyear" name="expyear" />
            </div>
            <div className="col-50">
              <label htmlFor="cvv">CVV</label>
              <input type="text" id="cvv" name="cvv" />
            </div>
          </div>
        </div>
      </div>
      <input
        type="submit"
        defaultValue="Continue to checkout"
        className="btn"
        onClick={() => {
          handleCheckout();
        }}
      />
    </div>
  );
};

export default Checkout;
