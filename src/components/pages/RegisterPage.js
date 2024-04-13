import React, { useState } from 'react';
import { Link } from 'react-router-dom'
// import axios from 'axios'; // Import Axios library for making HTTP requests

import '../../App.css'

export default function SignUpPage() {

    // State variables to store form input values
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        console.log(username, email, password)
        // try {
        //     // Make POST request to your API endpoint with registration data
        //     // const response = await axios.post('YOUR_API_ENDPOINT', {
        //     //     username,
        //     //     email,
        //     //     password
        //     // });

        //     // Handle response from API (e.g., show success message, redirect to homepage)
        //     // console.log(response.data); // Log response data to console
        // } catch (error) {
        //     // Handle errors (e.g., display error message)
        //     console.error('Error:', error);
        // }
    };

    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="first_name" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
