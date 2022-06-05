import React from "react";
// import logo from "../../../assets/vectors/Logo.svg";
import { Link, Route, useLocation, useHistory } from "react-router-dom";
import "./Sidebar.css";
function Sidebar({ sidebarOpen, closeSidebar }) {
  console.log(closeSidebar);
  let history = useHistory();
  const handleLogOut = () => {
    history.push("/login");
    window.location.reload(false);
  };
  return (
    <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          {/* <img src={logo} alt="logo" /> */}
          <h1>ROI </h1>
        </div>
        <i
          className="fa fa-times"
          id="sidebarIcon"
          onClick={() => closeSidebar()}
        ></i>
      </div>

      <div className="sidebar__menu">
        <div className="sidebar__link">
          <i className="fa fa-plus"></i>
          <Link to="/useradmin">Manage User</Link> <br />
        </div>
        <div className="sidebar__link">
          <i className="fa fa-plus"></i>
          <Link to="/AllowPatent">Allow Patent Ideas</Link> <br />
        </div>

        <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <Link onClick={handleLogOut}>Log out</Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
