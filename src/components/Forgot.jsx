import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';  
import Navb from './Navb';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Cookies from 'js-cookie';

function Forgot() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); 

    const handleEmail = (e) => setEmail(e.target.value);

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
                const response = await axios.post('http://127.0.0.1:8000/generateotp/', { email:email });
                console.log(response)
                setMessage(response.data.message || "OTP sent successfully!");
                navigate("/verify")
            } catch (error) {
                setMessage(error.response?.data?.error || "Failed to send OTP. Try again.");
            }
        };

    return (
        <>
            <Navb />
            <div className='authenticate-border'>
                <h1>Forgot Credentials</h1>
                {message && <p>{message}</p>}
                <Form className='signup-form' onSubmit={handleSignup}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required value={email} onChange={handleEmail} />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" className='submit' >
                        Verify
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default Forgot;
