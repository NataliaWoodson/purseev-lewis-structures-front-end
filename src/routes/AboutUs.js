import React from "react";
import "./AboutUs.css";
import { Link } from "react-router-dom";
import catSource from "../assets/cat.jpg";
import Header from "../components/Header";
import adrianaSource from "../assets/adriana.png";

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
            <img className="developer-pics" src={adrianaSource} alt="logo" />
            <h1 className="names">Adriana</h1>
            <p className="description">
              As a high school chemistry teacher during the pandemic, Adriana
              struggled to find online chemistry teaching tools that fit her and
              her students’ needs. Deciding she wanted to create her own online
              teaching tools, she taught herself coding to create simple games.
              Soon other teachers at her school were using her games and
              simulations, and she realized the potential impact she could have
              as a coder.
            </p>
            <p className="description">
              After taking a few online courses while juggling raising a toddler
              (with a lot of help from her family!) and her full-time job,
              Adriana was accepted into Ada Developers Academy where she
              expanded her knowledge from theory to practical programming. She
              is now embarking on the next stage of her programming journey as a
              Software Engineering Intern at Google.
            </p>
          </div>
        </section>
        <section className="bios">
          <div className="bio-container">
            <img className="developer-pics" src={catSource} alt="logo" />
            <h1 className="names">Huma</h1>
            <p className="description">
              Huma stumbled upon programming completely by happenstance. Being
              told that all kids would need to know programming in the future
              and wanting to make sure her kids would not be at a loss, she went
              on a mission to learn what programming was. Never having been
              exposed to computer science before, she taught herself in order to
              teach her three kids and, in the process, found a new passion.
              Being a stay at home mom for a few years, she originally did not
              consider coding as a career option. She overheard a conversation
              between her kids about how boys are good at math and therefore a
              girl could not be a programmer. Not knowing any programmers
              herself, let alone a female programmer, she embarked on a journey
              to become for her kids the role model she wished she'd had for
              herself.
            </p>
            <p className="description">
              Her journey took her to Ada Developers Academy where she not only
              met her first female developers but developers from a variety of
              backgrounds and identities. At Ada, Huma honed her skills as a
              developer and expanded her understanding of equity, privilege and
              self-advocacy. With the support of her family and the knowledge
              she gained through the rigorous program at Ada and its amazing
              instructors, Huma will be taking the next step on her journey as
              an intern at Salesforce.
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
            <h1 className="names">Jenny</h1>
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
