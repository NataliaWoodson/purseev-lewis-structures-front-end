import React from "react";
import "./AboutUs.css";
import { Link } from "react-router-dom";
import catSource from "../assets/cat.jpg";
import Header from "../components/Header";

const AboutUs = () => {
  return (
    <main>
      {/* <nav className="nav">
        <Link to="/">game page</Link>
      </nav> */}
      <Header />
      <h1 className="main-heading">About the developers</h1>
      <div className="about-us-container">
        {/* <img src={require("../images/transparent-100.jpg")} alt="logo" /> */}
        <section className="bios">
          <div className="bio-container">
            <img className="developer-pics" src={catSource} alt="logo" />
            <h1 className="names">Adriana</h1>
            <p className="description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque
              exercitationem officia quam molestiae ullam adipisci nisi optio,
              unde iure explicabo cupiditate voluptates veniam, rem distinctio
              quisquam maxime architecto. Quos, saepe
            </p>
          </div>
        </section>
        <section className="bios">
          <div className="bio-container">
            <img className="developer-pics" src={catSource} alt="logo" />
            <h1 className="names">Natalia</h1>
            <p className="description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque
              exercitationem officia quam molestiae ullam adipisci nisi optio,
              unde iure explicabo cupiditate voluptates veniam, rem distinctio
              quisquam maxime architecto. Quos, saepe
            </p>
          </div>
        </section>
        <section className="bios">
          <div className="bio-container">
            <img className="developer-pics" src={catSource} alt="logo" />
            <h1 className="names">Adriana</h1>
            <p className="description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque
              exercitationem officia quam molestiae ullam adipisci nisi optio,
              unde iure explicabo cupiditate voluptates veniam, rem distinctio
              quisquam maxime architecto. Quos, saepe
            </p>
          </div>
        </section>
        <section className="bios">
          <div className="bio-container">
            <img className="developer-pics" src={catSource} alt="logo" />
            <h1 className="names">Adriana</h1>
            <p className="description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque
              exercitationem officia quam molestiae ullam adipisci nisi optio,
              unde iure explicabo cupiditate voluptates veniam, rem distinctio
              quisquam maxime architecto. Quos, saepe
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutUs;
