import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';  
import Navb from './Navb';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPass] = useState("");
    const [confirmpass, setConfirm] = useState("");
    const [isDisabled, setDisabled] = useState(true);
    const [message, setMessage] = useState("");

    const handleEmail = (e) => setEmail(e.target.value);
    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPass(e.target.value);
    const handleConfirm = (e) => setConfirm(e.target.value);

    useEffect(() => {
        setDisabled(confirmpass !== password || !email || !username);
    }, [confirmpass, password, email, username]);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/signup/', {
                email: email,
                username: username,
                password: password
            });
            console.log(response)
            setMessage(response.data.message);
        } catch (error) {
            console.log(error)
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
                        <Form.Control type="email" placeholder="Enter email" required value={email} onChange={handleEmail} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" required value={username} onChange={handleUsername} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required value={password} onChange={handlePassword} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label>Re-enter password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" required value={confirmpass} onChange={handleConfirm} />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" className='submit' disabled={isDisabled}>
                        Signup
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default Signup;
