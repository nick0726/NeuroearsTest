import React, { useState } from 'react';
import LandingImage from '../images/landingimage.jpg';
// import landingVideo from "../videos/BrainNeurons.mp4";
// import phoneLanding from "../videos/BrainNeurons.gif";
import { Link } from 'react-router-dom';

function LogIn() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(event) {
    event.preventDefault();
    const resopnse = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        password,
      }),
    });
    const data = await resopnse.json();

    if (data.user) {
      localStorage.setItem('token', data.user);
      alert('Welcome! Login sucessful');
      window.location.href = '/mainpage';
    } else {
      alert('Please check your username and password');
    }
    console.log(data);
  }

  return (
    <>
      <div
        className="landing-box"
        style={{ backgroundImage: `url(${LandingImage})` }}
      >
        {/* <img src={LandingImage} alt={LandingImage} /> */}
        <form onSubmit={loginUser}>
          <div className="login-info">
            <h1>LOGO</h1>
            <div className="input-area">
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                type="text"
                name="id"
                id="id"
                autoComplete="off"
                required
              ></input>
              <label for="id">User Name(ID)</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="pw"
                id="pw"
                autoComplete="off"
                required
              ></input>
              <label for="pw">Password</label>
            </div>
            <div className="buttonBox">
              <div className="logIn">
                <button
                  className="logInBtn"
                  // onClick={() => {
                  //   loginUser(true);
                  // }}
                >
                  LogIn
                </button>
              </div>
              <p>Doesn't have an account?</p>
              <Link to="/signup">
                <div className="signUp">
                  <button className="signUpBtn">SignUp</button>
                </div>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default LogIn;
