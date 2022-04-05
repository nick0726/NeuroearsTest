import React from 'react';
import './App.css';
import Landing from './pages/Landing';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import MainPage from './pages/Main';

import { Link, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Route exact path="/">
        <Landing></Landing>
      </Route>

      <Route exact path="/signup">
        <SignUp></SignUp>
      </Route>

      <Route path="/login">
        <LogIn></LogIn>
      </Route>

      <Route path="/mainpage">
        <MainPage></MainPage>
      </Route>

      {/*
      <Route path='/'>
        <div>로그인한페이지에요</div>
      </Route>

 */}
    </>
  );
}

export default App;
