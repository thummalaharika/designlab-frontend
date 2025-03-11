import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navb from './Navb';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");  // For storing error messages
    const navigate = useNavigate();  // To handle redirection

    // Handle username change
    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    // Handle password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    // Handle form submission (Login)
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent form default submission

        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', {
                username: username,
                password: password
            });

            console.log(response)
            // Check if login is successful and store token in cookies
            if (response.status === 200 && response.data.data.token) {
                console.log("logged in")
                Cookies.set('token', response.data.data.token, { expires: 7 });  // Store the token in cookies for 7 days
                navigate('/');  
            }
        } catch (error) {
            // Handle login errors (e.g., invalid credentials)
            setError("Invalid username or password");
        }
    };

    return (
        <>
            <Navb />
            <div className='authenticate-border'>
                <h1>Login</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message */}
                <Form className='login-form' onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={handleUsername}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={handlePassword}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className='submit'>
                        Login
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default Login;
