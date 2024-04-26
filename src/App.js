// import logo from './logo.svg';
// import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import ForgetPasswordPage from './components/pages/ForgetPasswordPage'
import HomePage from './components/pages/HomePage'
import NavbarMath from './components/navbar'

import { GoogleOAuthProvider } from '@react-oauth/google';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
// import { toBeRequired } from '@testing-library/jest-dom/matchers'

const google_client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {

  return (
    <GoogleOAuthProvider clientId={google_client_id}>
      <Router>
        <NavbarMath isLoggedIn></NavbarMath>
          <Routes>
              <Route exact path="/" element={ <LandingPage/> } />
              <Route path="/login" element={ <LoginPage/> } />
              <Route path="/register" element={ <RegisterPage/> } />
              <Route path="/forget-password" element={ <ForgetPasswordPage/> } />
              <Route path="/home" element={ <HomePage/> } />
          </Routes>
        <Footer />
      </Router>
    </GoogleOAuthProvider>
  );
}

const Footer = () => {
  return (
    <footer style={FooterStyle} className="text-white py-3 fixed-bottom w-100">
      <div className="container text-center">
        Designed & coded by <a href="/" target="_blank" rel="noopener noreferrer" className="text-white">Happy Math</a>
      </div>
    </footer>
  );
};



// const FooterStyle = {
//   background: "#712c9c",
//   fontSize: ".8rem",
//   color: "#712c9c",
//   position: "absolute",
//   bottom: 0,
//   padding: "1rem",
//   margin: 0,
//   width: "100%",
//   opacity: ".5"
// }

const FooterStyle =  {
  position: "absolute",
  bottom: "0",
  width: "100%",
  background: "#712c9c",
}


export default App;
