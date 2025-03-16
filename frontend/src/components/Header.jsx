// Header.jsx

import { Container, Navbar } from "react-bootstrap";

// importo il modulo per il link
// import { Link } from "react-router-dom"


export default function Header() {

    return (

        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="#">Budget Tracker</Navbar.Brand>
            </Container>
        </Navbar>

    );

}