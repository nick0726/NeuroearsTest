import React, { useState } from 'react';
import LandingImage from '../images/landingimage.jpg';
// import landingVideo from "../videos/BrainNeurons.mp4";
// import phoneLanding from "../videos/BrainNeurons.gif";
import { Link, Route, Switch } from 'react-router-dom';

function Landing() {
  return (
    <>
      <div
        className="landing-box"
        style={{ backgroundImage: `url(${LandingImage})` }}
      >
        {/* <img src={LandingImage} alt={LandingImage} /> */}
        <form action="">
          <div className="login-info">
            <h1>LOGO</h1>
            <div className="buttonBox">
              <Link to="/login">
                <div className="logIn">
                  <button
                    className="logInBtn"
                    // onClick={() => setLandingOn(false)}
                  >
                    LogIn
                  </button>
                </div>
              </Link>
              <p>Doesn't have an account?</p>
              <Link to="/signup">
                <div className="signUp">
                  <button className="signUpBtn">SignUp</button>
                </div>
              </Link>
            </div>
          </div>
        </form>

        {/* <video
          id='landing-video'
          autoPlay='autoplay'
          loop='Loop'
          volume='0.2'
          muted='false'
        >
          <source src={landingVideo} type='video/mp4' alt={landingVideo} />
        </video> */}
        {/* <img id='pcLanding' src={LandingImage} alt={LandingImage} /> */}
        {/* <img id='phone-landing' src={phoneLanding} alt={phoneLanding}></img> */}
        {/* <img src={LandingImage} alt={LandingImage}></img> */}
      </div>
    </>
  );
}

export default Landing;
