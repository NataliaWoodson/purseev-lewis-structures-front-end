import React from "react";
import "./AboutUs.css";
import { Link } from "react-router-dom";
import catSource from "../images/cat.jpg";

const AboutUs = () => {
  return (
    <main>
      <nav className="nav">
        <Link to="/">game page</Link>
      </nav>
      <h1 className="main-heading">About the developers</h1>
      <div className="about-us-container">
        {/* <img src={require("../images/transparent-100.jpg")} alt="logo" /> */}
        <section>
          <div>
            <img src={catSource} alt="logo" />
          </div>
          <div>
            <h6>Adriana</h6>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque
              exercitationem officia quam molestiae ullam adipisci nisi optio,
              unde iure explicabo cupiditate voluptates veniam, rem distinctio
              quisquam maxime architecto. Quos, saepe
            </p>
          </div>
        </section>
        <section>
          <img src={catSource} alt="logo" />
          <h6>Natalia</h6>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque
            exercitationem officia quam molestiae ullam adipisci nisi optio,
            unde iure explicabo cupiditate voluptates veniam, rem distinctio
            quisquam maxime architecto. Quos, saepe
          </p>
        </section>
        <section>
          <div>
            <img src={catSource} alt="logo" />
          </div>
          <div>
            <h6>Adriana</h6>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque
              exercitationem officia quam molestiae ullam adipisci nisi optio,
              unde iure explicabo cupiditate voluptates veniam, rem distinctio
              quisquam maxime architecto. Quos, saepe
            </p>
          </div>
        </section>
        <section>
          <div>
            <img src={catSource} alt="logo" />
          </div>
          <div>
            <h6>Adriana</h6>
            <p>
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
