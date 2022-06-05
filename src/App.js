import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Showcase from "./components/Showcase";
import Destinations from "./components/Destinations";
import Footer from "./components/Footer";
import Login from "./components/Login.js";
import SignUp from "./components/SignUp";
import Error from "./components/Error";
import Dashboard from "./components/Dashboard";
import SimpleForm from "./components/chatbot/SimpleForm";
import AdminDashboard from "./components/Admin/Dashboard/admindashboard";
import Profile from "./components/Profile";
import InvestorViewIdeas from "./components/investorViewIdeas";
import View from "./components/View";
import Checkout from "./components/Checkout";
import Purchase from "./components/Purchase";
import Stock from "./components/Stock/Stock";
import Patent from "./components/PatentIdeas/Patent";
import Appointment from "./components/Advisors/Appointment";
import AddAdvisor from "./components/Admin/Booking/AddAdvisor";
import AdvisorDash from "./components/AdvisorDashboard/AdvisorDash";
import AdvisorsProfile from "./components/Advisors/AdvisorsProfile";
import Leave from "./components/AdvisorDashboard/Leave";
import Trading from "./components/Stock/Trading";
import ViewPatent from "./components/PatentIdeas/ViewPatent";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import StockData from "./components/Admin/StockData/StockData";
import AllowPatent from "./components/Admin/AllowPatent/AllowPatent";
import Useradmin from "./components/Admin/UserAdmin/useradmin";
import Verify from "./components/ForgotPassword/Verify";
import ResetPassword from "./components/ForgotPassword/ResetPassword";
import FinalPrice from "./components/PatentIdeas/FinalPrice";
import ViewAuction from "./components/PatentIdeas/ViewAuction";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
          <Showcase />
          <Footer />
        </Route>
        <Route path="/admindashboard" component={AdminDashboard} />
        <Route path="/showcase">
          <Header />
          <Showcase />
          <Footer />
          <Destinations />
        </Route>
        <Route path="/login">
          <Header />
          <Login />
          <Footer />
        </Route>
        <Route path="/signup">
          <Header />
          <SignUp />
          <Footer />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/simpleform">
          <SimpleForm />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/investorViewIdeas">
          <InvestorViewIdeas />
        </Route>
        <Route path="/stock">
          <Stock />
        </Route>
        <Route path="/Trading">
          <Trading />
        </Route>
        <Route path="/Patent">
          <Patent />
        </Route>
        <Route path="/Appointment">
          <Appointment />
        </Route>
        <Route path="/AddAdvisor">
          <AddAdvisor />
        </Route>

        <Route path="/view">
          <View />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/purchase">
          <Purchase />
        </Route>
        <Route path="/advisordash">
          <AdvisorDash />
        </Route>
        <Route path="/advisorsprofile">
          <AdvisorsProfile />
        </Route>
        <Route path="/Leave">
          <Leave />
        </Route>
        <Route path="/ViewPatent">
          <ViewPatent />
        </Route>
        <Route path="/ForgotPassword">
          <ForgotPassword />
        </Route>
        <Route path="/StockData">
          <StockData />
        </Route>
        <Route path="/AllowPatent">
          <AllowPatent />
        </Route>
        <Route path="/useradmin">
          <Useradmin />
        </Route>
        <Route path="/Verify">
          <Verify />
        </Route>
        <Route path="/Restpassword">
          <ResetPassword />
        </Route>
        <Route path="/FinalPrice">
          <FinalPrice />
        </Route>
        <Route path="/ViewAuction">
          <ViewAuction />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
