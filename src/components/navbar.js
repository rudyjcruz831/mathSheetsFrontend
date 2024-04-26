import React, { useState, useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import {useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export default function NavbarMath() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const location = useLocation();
    // const [decodedToken, setDecodedToken] = useState(null);
    const [token, setToken] = useState('');
    

    const getRefreshToken = useCallback(async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axios.post('http://localhost:50052/api/mathsheets/user/tokens', {
                refreshToken: refreshToken
            });
            if (response.status === 200) {
                const token1 = response.data.token.idToken;
                const refresh_token = response.data.token.refreshToken;
                localStorage.setItem('idToken', token1);
                localStorage.setItem('refresh_token', refresh_token);
            } else {
                console.log('Failed to sign in. Please check your credentials.', response.data);
                localStorage.clear();
                navigate('/login');
            }
        } catch (error) {
            console.error('Error: ', error);
            localStorage.clear();
            navigate('/login');
        }
    }, [navigate]);


    useEffect(() => {

        var id_token = localStorage.getItem('idToken');
        // const refresh_token = localStorage.getItem('refresh_token');
        if (id_token) {    
            const decode = JSON.parse(atob(id_token.split('.')[1]));
            if (decode.exp * 1000 < new Date().getTime()) {
                getRefreshToken();
                id_token = localStorage.getItem('idToken');
            }
            const decodedToken = jwtDecode(id_token);
            setToken(id_token);
            setIsLoggedIn(true);
            setUserName(decodedToken.users.username);
        } else {
            setIsLoggedIn(false);
            setUserName('');
            if (location.pathname !== '/') {
                navigate('/login');
            }
            // navigate('/login');
        }
    }, [location.pathname,getRefreshToken,]);

    const renderButtons = () => {
        // console.log("isLoggedIn", isLoggedIn)
        const isLandingPage = location.pathname === '/'; // Check if the user is on the landing page
        const isHomePage = location.pathname === '/home'; // Check if the user is on the home page

        if (isLoggedIn) {
            return (
                <Nav>
                    {!isLandingPage && <Nav.Link href="/"></Nav.Link>}
                    {!isHomePage && <Nav.Link href="/home">Dashboard</Nav.Link>}
                    {/* <Navbar.Text style={{paddingRight:"5p", color: "#712c9c"}}>{userName}</Navbar.Text> */}
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
            );
        } else {
            return (
                <Nav>
                    {isLandingPage && <Nav.Link href="/register">Sign Up</Nav.Link>}
                    {isLandingPage && <Nav.Link href="/login">Sign In</Nav.Link>}
                </Nav>
            );
        }
    };

    const handleLogout = async () => {
        // How do i added the token to the header authorization
        // console.log("clicked logout")
        var id_token = localStorage.getItem('idToken');
        if (id_token) {    
            const decode = JSON.parse(atob(id_token.split('.')[1]));
            if (decode.exp * 1000 < new Date().getTime()) {
                getRefreshToken();
                id_token = localStorage.getItem('idToken');
            }
            const decodedToken = jwtDecode(id_token);
        } else {
            
            localStorage.clear();
            if (location.pathname !== '/') {
                navigate('/login');
            }
        }

        const header = { Authorization: `Bearer ${id_token}` }; // Removed the 'headers' key
        try {
            const response = await axios.post('http://localhost:50052/api/mathsheets/user/signout', null, { headers: header })
            console.log("Response: ", response)
            if (response.status === 200) {
                localStorage.clear();
                setIsLoggedIn(false);
                navigate("/login")
            } else {
                // how to handle error here
                if (response.status === 401) {
                    console.log("Unauthorized")
                    localStorage.clear();
                    setIsLoggedIn(false);
                    navigate("/login");
                } else if (response.status === 403) {
                    console.log("Forbidden")
                    localStorage.clear();
                    setIsLoggedIn(false);
                    navigate("/login");
                } else {
                    console.log(response.status)
                    const error = response.data;
                    console.log("Failed to log you out: ", error);
                }
            }
        } catch (error) {
            console.log("Error: ", error);
            localStorage.clear();
            console.error("Error: ", error);
            navigate("/login");
        }
        // localStorage.removeItem('jwt');
        // setIsLoggedIn(false);
    }

    return (
        <Navbar style={{ height: "75px" }} className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/" style={{ color: "#712c9c" }}><Image src="assets/main-logo-transparent.png" rounded width={"20%"} height={"20%"} /> Happy Math</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {renderButtons()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
