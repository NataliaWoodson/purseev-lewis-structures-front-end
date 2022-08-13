import React from "react";
import "./AboutUs.css";
import { Link } from "react-router-dom";
import catSource from "../assets/cat.jpg";
import Header from "../components/Header";
import adrianaSource from "../assets/adriana.png";
import humaSource from "../assets/huma.jpg";
import nataliaSource from "../assets/natalia.jpg";
import jennySource from "../assets/jenny2.jpeg";

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
            <img className="developer-pics" src={humaSource} alt="logo" />
            <h1 className="names">Huma</h1>
            <p className="description">
              Huma stumbled upon programming completely by happenstance. Being
              told that all kids would need to know programming in the future
              and wanting to make sure her kids would not be at a loss, she went
              on a mission to learn what programming was. Never having been
              exposed to computer science, she taught herself in order to teach
              her three kids, and in the process, found a new passion. Being a
              stay at home mom, she originally did not consider coding as a
              career option until she overheard a conversation between her kids
              about how boys are good at math and therefore a girl could not be
              a programmer. Not knowing any programmers herself, let alone a
              female programmer, she embarked on a journey to become for her
              kids the role model she wished she'd had for herself.
            </p>
            <p className="description">
              Her journey took her to Ada Developers Academy where she not only
              met the first of many female developers but developers from a
              variety of backgrounds and identities. At Ada, Huma honed her
              skills as a developer and expanded her understanding of equity,
              privilege and self-advocacy. With the support of her family and
              the knowledge she gained through the rigorous program at Ada and
              its amazing instructors, Huma will be taking the next step in her
              journey as an intern at Salesforce.
            </p>
          </div>
        </section>
        <section className="bios">
          <div className="bio-container">
            <img className="developer-pics" src={nataliaSource} alt="logo" />
            <h1 className="names">Natalia</h1>
            <p className="description">
              While working as a speech language pathologist, Natalia became
              passionate about the power of assistive technology to change lives
              and enable those with disabilities to communicate. Eager to learn
              more about the inner workings of the tools she worked with, she
              began using online resources to learn how to code and began her
              journey to break into tech. She was accepted into Ada Developers
              Academy, where she furthered her skills as a developer and found a
              community dedicated to increasing diversity and equity in tech. As
              a developer, Natalia is on a mission to harness technology for
              social good. Equipped with the skills and confidence gained from
              her time at Ada, she will continue her journey as an intern at
              Salesforce.
            </p>
          </div>
        </section>
        <section className="bios">
          <div className="bio-container">
            <img className="developer-pics" src={jennySource} alt="logo" />
            <h1 className="names">Jenny</h1>
            <p className="description">
              Jenny's interest in programming was sparked when she was working
              as an accounting specialist. She had to download a lot files
              manually so her coworker helped her create a script to automate
              downloading files from online. She was amazed how a little script
              could make work more efficient and save people so much time. She
              started learning online while balancing working full time. She was
              introduced to programming bootcamps by a colleague who was
              attending one. This grew her curiosity. She researched bootcamps,
              attended information sessions but was turned off by the lack of
              inclusivity (majority of attendees were males and few women of
              color). This led her to apply and was accepted into Ada Developers
              Academy where she would studied programming in a safe and
              inclusive learning environment. Jenny will continue to hone her
              skills as an intern at Indeed.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutUs;
