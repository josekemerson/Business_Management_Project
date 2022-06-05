import React, { useEffect, useState } from "react";
import "./profile.css";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Modal, Button, Form } from "react-bootstrap";

const axios = require("axios");

const InvestorViewIdeas = () => {
  const token = window.localStorage.getItem("token");
  const [ideas, setIdeas] = useState([]);
  const [topic, setTopic] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState(null);
  async function getIdeas() {
    let response = await axios.get("http://localhost:5000/showUserInvestIdea", {
      headers: { Authorization: token },
    });
    if (response.status === 200) {
      setIdeas(response.data.message);
    }
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  async function handleInvestorIdea(id) {
    const token = window.localStorage.getItem("token");
    let data = {
      postId: id,
      topic: topic,
      description: description,
      category: category,
      price: price,
    };
    let response = await axios.post(
      "http://localhost:5000/updateInvestIdea",
      data,
      {
        headers: { Authorization: token },
      }
    );
    if (response.status === 200) {
      window.location.reload();
    }
  }
  async function deleteIdea(id) {
    let data = {
      postId: id,
    };
    let response = await axios.post(
      "http://localhost:5000/deleteInvestIdea",
      data,
      {
        headers: { Authorization: token },
      }
    );
    if (response.status === 200) {
      window.location.reload();
    }
  }
  async function activateIdea(id) {
    let data = {
      postId: id,
    };
    let response = await axios.post(
      "http://localhost:5000/activateInvestIdea",
      data,
      {
        headers: { Authorization: token },
      }
    );
    if (response.status === 200) {
      window.location.reload();
    }
  }
  async function deleteIdeaPermanant(id) {
    let data = {
      postId: id,
    };
    let response = await axios.post(
      "http://localhost:5000/deleteIdeaPermanant",
      data,
      {
        headers: { Authorization: token },
      }
    );
    if (response.status === 200) {
      window.location.reload();
    }
  }
  useEffect(() => {
    getIdeas();
  }, []);
  return (
    <div>
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
              <li>Ideas</li>
              <li>Advisors</li>
              <li>Banker</li>
              <Link to="/view">
                <li>View Posts </li>
              </Link>
              <li>FAQ </li>
              <Link to="/showcase">
                <li>Log Out</li>
              </Link>
            </ul>
          </nav>
        </header1>
      </div>
      {/* /////////////////////////////////Table Body///////////////////// */}
      <div className="table-idea">
        <Table striped bordered hover size="sm-10">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Status</th>
              <th colSpan="4">Settings</th>
            </tr>
          </thead>
          <tbody>
            {ideas &&
              ideas.length > 0 &&
              ideas.map((idea) => {
                {
                  console.log(idea);
                }
                return (
                  <tr>
                    <td>{idea.topic}</td>
                    <td>{idea.category}</td>
                    <td>{idea.description}</td>
                    <td>{idea.price}</td>
                    <td>{idea.status}</td>
                    <td colSpan="4">
                      <button
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={handleShow}
                      >
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
                                  defaultValue={idea.topic}
                                  onChange={(e) => setTopic(e.target.value)}
                                />
                                <br />
                                <Form.Select
                                  aria-label="Default select example"
                                  onChange={(e) => setCategory(e.target.value)}
                                  defaultValue={idea.category}
                                >
                                  <option disabled selected hidden>
                                    Select Category
                                  </option>
                                  <option value="Construction">
                                    Construction
                                  </option>
                                  <option value="Education">Education</option>
                                  <option value="Entertainment">
                                    Entertainment
                                  </option>
                                </Form.Select>
                                <br />
                                <Form.Control
                                  as="textarea"
                                  placeholder="Description"
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                  defaultValue={idea.description}
                                />
                                <br />
                                <Form.Control
                                  type="text"
                                  placeholder="Price"
                                  onChange={(e) => setPrice(e.target.value)}
                                  defaultValue={idea.price}
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
                                onClick={(e) => handleInvestorIdea(idea._id)}
                              >
                                Save Changes
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </>
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={(handleShow) => deleteIdea(idea._id)}
                      >
                        Deactivate
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => activateIdea(idea._id)}
                      >
                        Activate
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteIdeaPermanant(idea._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      <footer1>
        <p>Copyright © 2021 ROI.Inc.</p>{" "}
      </footer1>
    </div>
  );
};

export default InvestorViewIdeas;
