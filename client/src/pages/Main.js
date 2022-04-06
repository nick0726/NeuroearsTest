import React, { useEffect } from "react";
import LandingImage from "../images/landingimage.jpg";
import { Link, useHistory } from "react-router-dom";
import "../Main.css";
import jwt from "jsonwebtoken";
// const jwt = require('jsonwebtoken');

const MainPage = () => {
  const history = useHistory();
  async function populateQuote() {
    const req = await fetch("http://localhost:3000/mainpage", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = req.json();
    console.log(data);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        alert("Check the ID or password");
        localStorage.removeItem("token");
        history.replace("/login");
      } else {
        populateQuote();
      }
    }
  }, []);

  return (
    <>
      <div
        className='container'
        style={{ backgroundImage: `url(${LandingImage})` }}
      >
        <div className='header'>
          <Link to='/mainpage'>
            <h1>NeuroEars</h1>
          </Link>
          <div className='nav'>
            <ul>
              <li>
                <p>About us</p>
              </li>
              <li>
                <p>Solutions</p>
              </li>
              <li>
                <p>Download</p>
              </li>
              <li>
                <p>Contact us</p>
              </li>
              <li>
                <p>My Page</p>
              </li>
            </ul>
          </div>
        </div>

        <div className='mainIntro'>
          <h2>We serve the best rehabilitation experiences</h2>
          <p>
            You can fix your dizziness, and can get free from vertigo.
            <br />
            Join with us to gain again the comfort dizziness free life agian.
          </p>
          <button className='getStarted'>Get Started</button>
        </div>
      </div>
    </>
  );
};

export default MainPage;
