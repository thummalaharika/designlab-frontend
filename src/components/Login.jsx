import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navb from './Navb';
import { useState } from 'react';

function Login() {
    const [password, setPassword] = useState("");
    const handlePassword=(e)=>{
        setPassword(e.target.value);
    }
  return (
    <>
    <Navb/>
    <div className='authenticate-border'>
        <h1>Login</h1>
        <Form className='login-form'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required value={password} onChange={handlePassword}/>
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