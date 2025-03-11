import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Navb(){
    return (
        <>
        <Navbar bg="primary" data-bs-theme="dark" className='navbar'>
            <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        </>
    )
}

export default Navb;