import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';  
import Navb from './Navb';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Cookies from 'js-cookie';
import ReCAPTCHA from "react-google-recaptcha";

function Reset() {
    const [password, setPass] = useState("");
    const [confirmpass, setConfirm] = useState("");
    const [captchaValue, setCaptchaValue] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); 

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            navigate('/login');  // Redirect to home if logged in
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
            const response = await axios.post('http://127.0.0.1:8000/reset/', {
                token: Cookies.get('token'),
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
                setMessage("Reset successful!");
                navigate("/");
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Reset failed. Please try again.");
        }
    };

    return (
        <>
            <Navb />
            <div className='authenticate-border'>
                <h1>Reset password</h1>
                {message && <p>{message}</p>}
                <Form className='signup-form' onSubmit={handleSignup}>

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
                        Reset
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default Reset;
