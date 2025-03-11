import { useState,useEffect  } from 'react'
import { useNavigate } from 'react-router-dom';
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg?url'
import '../App.css'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Placeholder from 'react-bootstrap/Placeholder';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navb from './Navb';
import Cookies from 'js-cookie'; // Assuming you're using js-cookie for managing cookies



function Home() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');  
    }
  }, [navigate]);

  return (
    <>
      <Navb/>
      { !loading && 
        <div className='ip-form'>
            <h1>IP Scanner</h1>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Enter IP Address</Form.Label>
                <Form.Control type="email" placeholder="Eg: 10.3.100.100" />
                </Form.Group>
            </Form>
        </div>
      }
    {loading && 
        <div className='loading'>
            <Placeholder as="p" animation="glow">
                <Placeholder xs={12} />
            </Placeholder>

            <Placeholder as="p" animation="wave">
                <Placeholder xs={12} />
            </Placeholder>
        </div>}
      <div className="card ip-form">
        {!loading && <Button type="submit" variant='success' onClick={()=>setLoading(true)}>Scan</Button>}
        {loading && <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Scanning...
        </Button>}
      </div>
    </>
  )
}

export default Home
