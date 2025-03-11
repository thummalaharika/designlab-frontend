import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';  
import Navb from './Navb';
import { useEffect, useState } from 'react';

function Signup() {

    const [password, setPass] = useState("");
    const [confirmpass, setConfirm] = useState("");
    const [isDisabled, setDisabled] = useState(true);

    const handlePassword=(e)=>{
        setPass(e.target.value);
    }

    const handleConfirm=(e)=>{
        setConfirm(e.target.value);
    }

    useEffect(()=>{
        if(confirmpass==password){
            setDisabled(false);
        }else{
            setDisabled(true);
        }
    }, [confirmpass,password])

  return (
    <>
    <Navb/>
    <div className='authenticate-border'>
        <h1>Sign up</h1>
        <Form className='signup-form'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required value={password} onChange={handlePassword} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
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