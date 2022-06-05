import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { Link } from "react-router-dom";
import Post from "./Post";
import "../Dashboard.css";
import "./simpleform.css";

// all available theme props
const theme = {
  background: "#f5f8fb",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#EF6C00",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#EF6C00",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

class SimpleForm extends Component {
  render() {
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
        <div className="chat-screen">
          <ThemeProvider theme={theme}>
            <ChatBot
              steps={[
                {
                  id: "q-firstname",
                  message: "What is your first name?",
                  trigger: "firstname",
                },
                {
                  id: "firstname",
                  user: true,
                  trigger: "q-lastname",
                },
                {
                  id: "q-lastname",
                  message: "What is your last name?",
                  trigger: "lastname",
                },
                {
                  id: "lastname",
                  user: true,
                  trigger: "q-email",
                },
                {
                  id: "q-email",
                  message: "Finally. what is you email?",
                  trigger: "email",
                },
                {
                  id: "email",
                  user: true,
                  trigger: "q-submit",
                },
                {
                  id: "q-submit",
                  message: "Do you wish to submit?",
                  trigger: "submit",
                },
                {
                  id: "submit",
                  options: [
                    { value: "y", label: "Yes", trigger: "end-message" },
                    { value: "n", label: "No", trigger: "no-submit" },
                  ],
                },
                {
                  id: "no-submit",
                  message: "Your information was not submitted.",
                  end: true,
                },
                {
                  id: "end-message",
                  component: <Post />,
                  asMessage: true,
                  end: true,
                },
              ]}
            />
          </ThemeProvider>
        </div>
        <footer1>
          <p>Copyright © 2021 ROI.Inc.</p>{" "}
        </footer1>
      </div>
    );
  }
}

export default SimpleForm;
