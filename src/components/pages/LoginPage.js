import React, {useEffect, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'; // Import Axios library for making HTTP requests


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import '../../App.css'

import { useGoogleLogin } from '@react-oauth/google';



export default function SignInPage() {

    const navigate = useNavigate()
    // const [loading, setLoading] = useState(false);
    // const [showSignInPage, setShowSignInPage] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // const na = useHistory();

    const google_code = ""

    const google_client_id = process.env.GOOGLE_CLIENT_ID;


    const sendCodetoBackend = async (code) =>  {
        try {
            // TODO: Change the url to be dynamic to send to the post
            const response = await axios.post('http://localhost:50052/api/mathsheets/user/google/signin', {
                code : code,
            });
            
        } catch(error){
            console.error('Error: ', error)
        }
    }

    useEffect(() => {
    }, []);
     
    const googleLogin = useGoogleLogin({
        onSuccess: codeResponse => {
            console.log(codeResponse)
            sendCodetoBackend(codeResponse.code)
            
        },
        flow: 'auth-code',
    });

    const loginWithEmailPassword = async (email, password) => {

        console.log("Email, Password: ", email, password)
        try {
            const response = await axios.post('http://localhost:50052/api/mathsheets/user/signin', {
                email: email,
                password: password
            });

            if (response.status === 200){
                console.log(response)
                navigate('/home')
            } else {
                console.log(response)
                setErrorMessage("Faileid to sing in.")
            }
            // Handle response
        } catch(error) {
            console.error('Error: ', error);
            setErrorMessage('Failed to sign in. Please check your credentials.');
        }
    }

    const handleEmailLogin = (e) => {
        e.preventDefault();

        loginWithEmailPassword(email, password);
    }



    const bannerApper = () => {
        setErrorMessage('Error');
    };



    return (

        <div className="text-center m-5-auto">
            <h2>Sign in</h2>
            {/* <form action="/home" onSubmit={handleEmailLogin}>
                <p>
                    <label>email</label><br/>
                    <input type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
                <p>
                    <button onClick={() => loginWithEmailPassword()}>Google Sign In</button>
                </p>
                <p><button onClick={() => googleLogin()}>Sign In with Google</button></p>
            </form> */}


            <Form action="/home" onSubmit={handleEmailLogin}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail" >
                    <Form.Label column sm="2">
                    Email
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type='email' placeholder='email@gmail.com' name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                    Password
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
                    </Col>
                </Form.Group>

                <Button type="submit" onClick={() => loginWithEmailPassword()} variant="outline-secondary" id="button-addon1">Button</Button>
            </Form>



            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}
