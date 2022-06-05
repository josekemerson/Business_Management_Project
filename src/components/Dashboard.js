import React, { useState } from "react";
import "./Dashboard.css";
import { Link, useHistory } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";


const axios = require("axios");
function Dashboard() {
  const history = useHistory();
  const usertype = window.localStorage.getItem("type");
  const [topic, setTopic] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState(null);
  if (usertype === "business") {
    var btnname1 = "Post Ideas";
    var btnname2 = "View Ideas";
  } else {
    var btnname1 = "View Ideas";
    var btnname2 = "Post Ideas";
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleLogOut() {
    window.localStorage.removeItem("token");
    if (window.localStorage.getItem("token") === null) {
      history.push("/showcase");
    }
  }

  //Save Investor Idea
  async function handleInvestorIdea() {
    const token = window.localStorage.getItem("token");
    let data = {
      topic: topic,
      description: description,
      category: category,
      price: price,
    };
    let response = axios
      .post("http://localhost:5000/saveInvestIdea", data, {
        headers: { Authorization: token },
      })
      .then(() => {
        window.location.reload(false);
        alert("Idea Added");
      })
      .catch((error) => {
        alert("Internal Server Error");
      });
  }

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
            <Link to="/Stock">
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
            <Link
              onClick={() => {
                handleLogOut();
              }}
            >
              <li>Log Out</li>
            </Link>
          </ul>
        </nav>
      </header1>
      <div id="content">
        <section className="info">
          <p> Mandy Hale:</p>
          <p>
            “There is nothing more beautiful than someone who goes out of their
            way to make life beautiful for others.”
          </p>
          <div className="button1">
            <p>
              <Link to="/SimpleForm">Speak to me?</Link>
            </p>
          </div>
        </section>
        <section className="gallery">
          <div id="hero-image">
            <div className="text-cont">
              <div className="promo-text">
                <p>Patent Ideas</p>
                <img src="https://i.imgur.com/buWQHmk_d.webp?maxwidth=760&fidelity=grand" />
              </div>
              <div className="button1">
                <p><Link to="/ViewPatent">view</Link></p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="photo-item">
              <img src="https://i.imgur.com/xggRlWy.jpeg" />
              <div className="text-cont">
                <div className="promo-text">
                  <p>Business people</p>
                  <img src="https://i.imgur.com/TdccLUv_d.webp?maxwidth=760&fidelity=grand" />
                </div>
                <div className="button1">
                  <p>{btnname1}</p>
                </div>
              </div>
            </div>
            <div className="photo-item">
              <img src="https://i.imgur.com/w0owq3g.jpg" />
              <div className="text-cont">
                <div className="promo-text">
                  <p>Investors</p>
                  <img src="https://i.imgur.com/K3AicFO_d.webp?maxwidth=760&fidelity=grand" />
                </div>
                <div className="button1">
                  <>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Ideas</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form>
                          <Form.Control
                            type="text"
                            placeholder="Topics"
                            onChange={(e) => setTopic(e.target.value)}
                          />
                          <br />
                          <Form.Select
                            aria-label="Default select example"
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option disabled selected hidden>
                              Select Category
                            </option>
                            <option value="Construction">Construction</option>
                            <option value="Education">Education</option>
                            <option value="Entertainment">Entertainment</option>
                          </Form.Select>
                          <br />
                          <Form.Control
                            as="textarea"
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                          />
                          <br />
                          <Form.Control
                            type="number"
                            placeholder="Price"
                            onChange={(e) => setPrice(e.target.value)}
                          />
                          <br />
                        </form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={(e) => handleInvestorIdea()}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>
                  <p onClick={handleShow}>{btnname2}</p>
                </div>
              </div>
            </div>
            <div className="photo-item">
              <img src="https://i.imgur.com/2ynhmed.jpg" />
              <div className="text-cont">
                <div className="promo-text">
                  <p>Patent Ideas</p>
                  <img src="https://i.imgur.com/iyihjmj_d.webp?maxwidth=760&fidelity=grand" />
                </div>
                <div className="button1">
                  <p><Link to="/Patent">Post</Link></p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="info">
          <p>May all your dreams come true</p>
          <p>
            A lot of people suffer from impotence. All the money's gone. The
            days we spend go on and on.{" "}
          </p>
          <div className="button1">
            <Link to="/investorViewIdeas">
              <p>My Ideas</p>
            </Link>
          </div>
        </section>
        <section className="transparent-text">
          <div id="center">
            <img src="https://i.imgur.com/t2Z7JJk.png" />
          </div>
        </section>
      </div>

      <footer1>
        <p>Copyright © 2021 ROI.Inc.</p>{" "}
      </footer1>
    </div>
  );
}

export default Dashboard;
