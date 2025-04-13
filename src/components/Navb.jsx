import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navb() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Check if the user is logged in by checking the token
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    // Handle the logout action
    const handleLogout = () => {
        Cookies.remove('token');  // Remove the token from cookies
        Cookies.remove('username');
        setIsLoggedIn(false);  // Update the logged-in state
        navigate('/login');  // Redirect to the login page
    };

    const handleReset = () => {
        // Cookies.remove('token');  // Remove the token from cookies
        // setIsLoggedIn(false);  // Update the logged-in state
        navigate('/reset');  // Redirect to the login page
    };

    return (
        <>
        <Navbar bg="primary" data-bs-theme="dark" className='navbar'>
            <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav className="me-auto">
                { !isLoggedIn && 
                    <>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/signup">Signup</Nav.Link>
                    </>
                }
                { isLoggedIn && 
                    <>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        <Nav.Link onClick={handleReset}>Reset password</Nav.Link>
                        <Navbar.Brand href="/" style={{"marginLeft":"12px"}}>Weclome, {Cookies.get('username')}</Navbar.Brand>
                    </>
                }
            </Nav>
            </Container>
        </Navbar>
        </>
    );
}

export default Navb;
