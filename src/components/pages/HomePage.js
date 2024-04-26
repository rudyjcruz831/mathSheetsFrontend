import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Import jwtDecode function from jwt-decode
import axios from 'axios';

import { Form, FloatingLabel, Container, Row, Col, Button } from 'react-bootstrap';

export default function HomePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');
    const [subject, setSubject] = useState('Addition');
    const [grade, setGrade] = useState('1');
    const location = useLocation();
    const [pdfData, setPdfData] = useState(null);
    // const [id_token, setIdToken] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    

    const createWorkSheet = async (subject, grade ) => {
        console.log("Subject", subject);
        console.log("Grade", grade);
        
        try {

            // create a header with the token
            var id_token = localStorage.getItem('idToken');
            // const refresh_token = localStorage.getItem('refresh_token');
            if (id_token) {   
                console.log("Home page Token", id_token);
                const decode = JSON.parse(atob(id_token.split('.')[1]));
                if (decode.exp * 1000 < new Date().getTime()) {
                    console.log("Token expired")
                    getRefreshToken();
                    id_token = localStorage.getItem('idToken');
                }
                // const decodedToken = jwtDecode(id_token);
            } else {
                
                localStorage.clear();
                if (location.pathname !== '/') {
                    navigate('/login');
                }
            }


            const headers = { Authorization: `Bearer ${id_token}` };
            const response = await axios.post('http://localhost:50052/api/mathsheets/user/worksheet', {
                subject: subject,
                grade: grade
            }, { headers: headers });
            console.log(response.data);
            if (response.status === 201) {
                // const pdfBase64 = response.data.pdf;
                // Extract base64 string from response data
                const pdfBase64 = response.data.pdf;
                // Convert base64 string to Blob
                const byteCharacters = atob(pdfBase64);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });
                setPdfData(URL.createObjectURL(pdfBlob))

                // const pdfBlob = new Blob([response.data.pdf], {  type: 'application/pdf' });
                // setPdfData(URL.createObjectURL(pdfBlob));
                // setPdfData(URL.createObjectURL(pdfBlob));
            } else {
                console.log('Failed to create PDF.', response.data);
                setErrorMessage('Failed to create PDF.');
                // localStorage.clear();
                // navigate('/login');
            }

        } catch (error) {
            console.error('Error: ', error);
        }

    }

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
         // Function to retrieve session token from cookie
        var idToken = localStorage.getItem("idToken");
        // how do i get user from token 
        if (idToken) {
            const decode = JSON.parse(atob(idToken.split('.')[1]));
            // console.log(decode);
            if (decode.exp * 1000 < new Date().getTime()) {
                getRefreshToken();
                idToken = localStorage.getItem("idToken");
            }
            const decodedToken = jwtDecode(idToken);
            setUser(decodedToken.users);
            setToken(idToken);
            
        } else {
            localStorage.clear();
            navigate("/login");
        }

        // console.log("User from storage", user)     

    },[navigate,getRefreshToken]);


    const handleWorkSheetGene = async (e) => { 
        e.preventDefault();
        createWorkSheet(grade , subject);
    }

    return (

        <Container className="text-center align-items-center justify-content-center m-5-auto">
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <Row>
                <Col>
                    <Form onSubmit={handleWorkSheetGene}>
                        <h5>Generate math worksheet</h5>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">
                                Subject
                            </Form.Label>
                            <Col sm="9">
                                <FloatingLabel controlId="floatingSelect" label="Subject">
                                    <Form.Select aria-label="Floating label select example" value={subject} onChange={(e) => setSubject(e.target.value)} required>
                                        <option value="Addition">Addition</option>
                                        <option value="Subtraction">Subtraction</option>
                                        <option value="Division">Division</option>
                                        <option value="Multiplication">Multiplication</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="3">
                                Grade
                            </Form.Label>
                            <Col sm="9">
                                <FloatingLabel controlId="floatingSelect" label="School Grade">
                                    <Form.Select aria-label="Floating label select example" value={grade} onChange={(e) => setGrade(e.target.value)} required>
                                        <option value="1">1st</option>
                                        <option value="2">2nd</option>
                                        <option value="3">3rd</option>
                                        <option value="4">4th</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Form.Group>
                        <Button type="submit" variant="outline-secondary">submit</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    {pdfData && (
                        <iframe style={{paddingTop:"10px"}} src={pdfData} width="800px" height="600px" ></iframe>
                    )}
                </Col>
            </Row>


            {/* Display PDF */}
            

            
        </Container>

        
        
    );
}
