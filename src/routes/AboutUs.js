import React from "react";
import "./AboutUs.css";
import { Link } from "react-router-dom";
import catSource from "../assets/cat.jpg";

const AboutUs = () => {
  return (
    <main>
      <nav className="nav">
        <Link to="/">game page</Link>
      </nav>
      <h1>About the developers</h1>
      <div className="about-us-container">
        {/* <img src={require("../images/transparent-100.jpg")} alt="logo" /> */}
        <img src={catSource} alt="logo" />
      </div>
    </main>
  );
};

export default AboutUs;
