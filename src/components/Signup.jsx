import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';  
import Navb from './Navb';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Cookies from 'js-cookie';
import ReCAPTCHA from "react-google-recaptcha";

function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPass] = useState("");
    const [confirmpass, setConfirm] = useState("");
    const [captchaValue, setCaptchaValue] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); 

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            navigate('/');  // Redirect to home if logged in
        }
    }, [navigate]);

    const handleSignup = async (e) => {
        e.preventDefault();

        // Check if CAPTCHA is completed
        if (!captchaValue) {
            setMessage("Please complete the CAPTCHA.");
            return;
        }

        // Check if passwords match
        if (password !== confirmpass) {
            setMessage("Passwords do not match.");
            return;
        }

        // If all validations pass, hit the API
        try {
            const response = await axios.post('http://127.0.0.1:8000/signup/', {
                email: email,
                username: username,
                password: password
            });

            if (response.data?.status === false && response.data?.message) {
                const messageData = response.data.message;
                if (typeof messageData === "object") {
                    const firstKey = Object.keys(messageData)[0]; 
                    if (messageData[firstKey] && Array.isArray(messageData[firstKey])) {
                        setMessage(messageData[firstKey][0]); 
                        return;
                    }
                }
                setMessage(JSON.stringify(messageData));
            } else {
                setMessage("Signup successful!");
                navigate("/login");
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Signup failed. Please try again.");
        }
    };

    return (
        <>
            <Navb />
            <div className='authenticate-border'>
                <h1>Sign up</h1>
                {message && <p>{message}</p>}
                <Form className='signup-form' onSubmit={handleSignup}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required value={password} onChange={(e) => setPass(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label>Re-enter password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" required value={confirmpass} onChange={(e) => setConfirm(e.target.value)} />
                    </Form.Group>

                    <ReCAPTCHA
                        sitekey="6LcHKAYrAAAAAGoO9L006SgdCv_00IM--6Q1fiSO"
                        onChange={(value) => setCaptchaValue(value)}
                    />

                    <Button variant="primary" type="submit" className='submit'>
                        Signup
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default Signup;
