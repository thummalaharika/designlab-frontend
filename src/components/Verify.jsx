import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';  
import Navb from './Navb';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Cookies from 'js-cookie';

function Verify() {
    const [email, setEmail] = useState("");
    const [otp_code, setOtp] = useState("");
    const [message, setMessage] = useState("");
    // const navigate = useNavigate(); 

    const handleEmail = (e) => setEmail(e.target.value);
    const handleOtp = (e) => setOtp(e.target.value);

    const navigate = useNavigate();  // To handle redirection
    
        useEffect(() => {
            // Check if token exists in cookies
            const token = Cookies.get('token');
            if (token) {
                navigate('/');  // Redirect to home if logged in
            }
        }, [navigate]);
        const handleSignup = async (e) => {
            e.preventDefault();
            setMessage("");
    
            try {
                const response = await axios.post('http://127.0.0.1:8000/verifyotp/', { email:email,otp_code:otp_code });
                console.log(response)
                Cookies.set('token', response.data.token, { expires: 7 }); // Expires in 7 days
                
                setMessage(response.data.message || "OTP Verified successfully!");
                navigate('/');
            } catch (error) {
                setMessage(error.response?.data?.error || "Invalid OTP or email. Try again.");
            }
        };

    return (
        <>
            <Navb />
            <div className='authenticate-border'>
                <h1>Forgot Password/Username</h1>
                {message && <p>{message}</p>}
                <Form className='signup-form' onSubmit={handleSignup}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Enter email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" required value={email} onChange={handleEmail} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>OTP</Form.Label>
                        <Form.Control type="text" placeholder="Enter OTP" required value={otp_code} onChange={handleOtp} />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" className='submit' >
                        Verify
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default Verify;
