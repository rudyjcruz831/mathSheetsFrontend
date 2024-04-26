import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios'; // Import Axios library for making HTTP requests

import '../../App.css'

export default function SignUpPage() {

    const navigate = useNavigate(); // Get navigate function from useNavigate hook
    // State variables to store form input values
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        console.log(username, email, password, first_name, last_name);
        
        try {
            // Make POST request to your API endpoint with registration data
            const response = await axios.post('http://localhost:50052/api/mathsheets/user/signup', {
                username,
                email,
                first_name,
                last_name,
                password
            });

            // Handle response from API (e.g., show success message, redirect to homepage)
            // console.log(response.data); // Log response data to console
            if (response.status === 201) {
                // console.log(response.data.TokenID)
                // localStorage.setItem('jwt', response.data.TokenID)
                const token = response.data.tokens.idToken;
                const refresh_token = response.data.tokens.refreshToken;
                localStorage.setItem('idToken', token);
                localStorage.setItem('refresh_token', refresh_token);
                navigate('/home');
            } else {
                console.log("Error: ", response.data);
                navigate('/login')
            }

        } catch (error) {
            // Handle errors (e.g., display error message)
            console.error('Error:', error);
        }
    };

    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5 style={{color:"#712c9c"}}>Create your personal account</h5>

            <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    <Form.Control
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                    <Form.Control
                        placeholder="Email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="First Name"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Last Name"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </InputGroup>

                <Form.Check
                    type="checkbox"
                    label="I agree all statements in terms of service"
                    required
                />

                <Button style={{paddingTop:"10px"}} id="sub_btn" type="submit">Register</Button>
            </Form>

            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    );
}
