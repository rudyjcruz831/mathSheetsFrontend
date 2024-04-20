import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function SignInPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const loginWithEmailPassword = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:50052/api/mathsheets/user/signin', {
                email: email,
                password: password
            });

            if (response.status === 200) {
                navigate('/home');
            } else {
                setErrorMessage('Failed to sign in. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error: ', error);
            setErrorMessage('Failed to sign in. Please check your credentials.');
        }
    };

    const handleEmailLogin = (e) => {
        e.preventDefault();
        loginWithEmailPassword(email, password);
    };

    return (
        <div className="text-center m-5-auto">
            <h2>Sign in</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <Form onSubmit={handleEmailLogin}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="3">
                        Email
                    </Form.Label>
                    <Col sm="9">
                        <InputGroup>
                            <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </InputGroup>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="3">
                        Password
                    </Form.Label>
                    <Col sm="9">
                        <InputGroup>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </InputGroup>
                    </Col>
                </Form.Group>

                <Button type="submit" variant="outline-secondary">Log In</Button>
            </Form>

            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    );
}
