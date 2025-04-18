// Header.jsx

import { Container, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function Header() {

    return (

        <Navbar style={{ backgroundColor: '#abc799' }} variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/" style={{ fontSize: '2rem', color: 'black' }}>Budget Tracker</Navbar.Brand>
            </Container>
        </Navbar>

    );

}