import React, { useEffect, useState } from "react";
import "./Main.css";
import { Table } from "react-bootstrap";
import { Link, Route, useLocation, useHistory } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import "./editform.css";
import Sidebar from "../Sidebar/Sidebar";

const axios = require("axios");

function Main() {
  let history = useHistory();
  const [cid, setId] = useState(null);
  const [cname, setName] = useState(null);
  const [ctype, setType] = useState(false);
  const [ccategory, setCategory] = useState(null);
  const [courses, setCourses] = useState(null);
  const handleSubmit = async (e) => {
    console.log(cid);
    const data = {
      cid: cid,
      cname: cname,
      ctype: ctype,
      ccategory: ccategory,
    };

    const response = await axios.post("http://localhost:5000/addcourse", data);
    if (response.status === 200) {
      history.push("/Admindashboard");
      window.location.reload(false);
    }
  };

  const [show, setShow] = useState(false);
  const [showmodal, setShowModal] = useState(false);
  const [courseEditId, setCourseEditId] = useState();
  const [courseEditName, setCourseEditName] = useState();
  const [courseEditCategory, setCourseEditCategory] = useState();
  const [courseEditType, setCourseEditType] = useState(false);
  const [courseObId, setCourseObId] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditCourse = (obid, id, name, type, category) => {
    // if (type == "paid"){
    //   document.getElementById("radio1").checked="true";
    // }
    // else{
    //   document.getElementById("radio2").checked="true";
    // }
    setCourseEditId(id);
    setCourseEditName(name);
    setCourseEditCategory(category);
    setCourseEditType(type);
    setCourseObId(obid);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  async function getCourses() {
    let response = await axios.get("http://localhost:5000/getcourses");
    if (response.status === 200) {
      setCourses(response.data.courses);
      console.log(response.data.courses);
    }
  }

  async function handleEdit() {
    let data = {
      courseID: courseObId,
      cid: cid,
      cname: cname,
      ctype: ctype,
      ccategory: ccategory,
    };
    let response = axios
      .post("http://localhost:5000/updateCourse", data)
      .then(() => {
        window.location.reload(false);
      });
    if (response.status == 200) {
      handleCloseModal();
    }
  }
  async function handleBlock(id) {
    let data = {
      courseID: id,
    };
    let response = axios
      .post("http://localhost:5000/deleteCourse", data)
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // async function handleActivate(id) {
  //   let data = {
  //     courseID: id,
  //   };
  //   let response = axios
  //     .post("http://localhost:5000/activateUser", data)
  //     .then(() => {
  //       window.location.reload(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  useEffect(() => {
    getCourses();
  }, []);

  const data = {};
  return (
    <div className="d-flex">
      <Sidebar />
      <main>
        <div className="main__container">
          <button className="btn btn-primary" onClick={handleShow}>
            Add Course
          </button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <Form.Control
                  type="text"
                  placeholder="Course ID"
                  onChange={(e) => setId(e.target.value)}
                />
                <br />
                <Form.Control
                  type="text"
                  placeholder="Course Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <br />
                <Form.Check
                  inline
                  name="group1"
                  type="radio"
                  value="paid"
                  onChange={(e) => setType(e.target.value)}
                />
                Paid
                <Form.Check
                  inline
                  name="group1"
                  type="radio"
                  value="Free"
                  onChange={(e) => setType(e.target.value)}
                />
                Free
                <br />
                <br />
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option defaultChecked>Select Category</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Management Studies">Management Studies</option>
                  <option value="Humanities">Humanities</option>
                </Form.Select>
                <br />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleSubmit}>
                Add Course
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Update Modal */}

          <Modal show={showmodal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Update Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <Form.Control
                  type="text"
                  placeholder={courseEditId}
                  onChange={(e) => setId(e.target.value)}
                />
                <br />
                <Form.Control
                  type="text"
                  placeholder={courseEditName}
                  onChange={(e) => setName(e.target.value)}
                />
                <br />
                <Form.Check
                  inline
                  name="group1"
                  type="radio"
                  checked={courseEditType == "paid" ? true : false}
                  value="paid"
                  id="radio1"
                  onChange={(e) => setType(e.target.value)}
                />
                Paid
                <Form.Check
                  inline
                  name="group1"
                  type="radio"
                  checked={courseEditType == "Free" ? true : false}
                  value="Free"
                  id="radio2"
                  onChange={(e) => setType(e.target.value)}
                />
                Free
                <br />
                <br />
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option defaultChecked>{courseEditCategory}</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Management Studies">Management Studies</option>
                  <option value="Humanities">Humanities</option>
                </Form.Select>
                <br />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleEdit}>
                Update Course
              </Button>
            </Modal.Footer>
          </Modal>

          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Course Name</th>
                <th>Course Type</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses &&
                courses.length > 0 &&
                courses.map((p) => {
                  return (
                    <tr>
                      <td>{p.courseId}</td>
                      <td>{p.courseName}</td>
                      <td>{p.courseType}</td>
                      <td>{p.courseCategory}</td>
                      <td>{p.courseStatus}</td>
                      <td colSpan="2">
                        <button
                          className="btn btn-success"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={() => {
                            handleEditCourse(
                              p._id,
                              p.courseId,
                              p.courseName,
                              p.courseType,
                              p.courseCategory,
                              p.courseCategory
                            );
                          }}
                        >
                          Edit <i className="fa fa-pen"></i>
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleBlock(p._id);
                          }}
                        >
                          Delete<i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </main>
    </div>
  );
}

export default Main;
