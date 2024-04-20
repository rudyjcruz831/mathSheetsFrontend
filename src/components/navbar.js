import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import { useLocation } from 'react-router-dom';

// import mainLogo from 'assets/main-logo-transparent.png';


export default function NavbarMath({ isLoggedIn }) {

    // Assuming you have state to track the user's sign-in status
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    const location = useLocation();
    // Function to check if the current path is the login or register page
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';


    
    // const currentPage = location.pathname;

    // Function to render the buttons based on the current page
    const renderButtons = () => {
        if (isLoginPage || isRegisterPage) {
            return null; // Don't render buttons on the login or register page
        }

        return (
            <Nav>
                <Nav.Link href='/register'><Button style={{background:"#712c9c"}}>Sign Up</Button></Nav.Link>
                <Nav.Link href='/login'><Button style={{background:"#712c9c"}}>Sign In</Button></Nav.Link>
            </Nav>
        );
    };

    return (
        <Navbar style={{height:"75px"}} className="bg-body-tertiary">
            <Container>
                {/* Use the imported image */}
                <Navbar.Brand href="/" style={{color:"#712c9c"}}><Image src="assets/main-logo-transparent.png" rounded width={"20%"} height={"20%"} /> Happy Math</Navbar.Brand>                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {isLoggedIn ? (
                        <Navbar.Text>
                            Signed in as: <a href="#profile">User Name</a>
                        </Navbar.Text>
                    ) : renderButtons()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


// .custom-btn {
//     background: #fff;
//     color: red;
//     border: 2px solid red;
//     border-radius: 3px;
//     padding: 5px 10px;
//     text-transform: uppercase;
//   }


