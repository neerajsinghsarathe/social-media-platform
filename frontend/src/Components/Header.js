import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import React from "react";
import {useParams} from 'react-router-dom';

export const Header = (props) => {
    const {id} = useParams();
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Nav className="me-auto">
                    <LinkContainer to={"/feed"}>
                        <Nav.Link>News Feed</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={`/profile/${localStorage.getItem("userID")}`}>
                        <Nav.Link>Profile</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={"/messaging/" + props.id}>
                        <Nav.Link>Messages</Nav.Link>
                    </LinkContainer>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Welcome {localStorage.getItem("userName")}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
