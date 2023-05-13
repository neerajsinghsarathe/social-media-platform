import React from 'react';
import {Link, useParams} from 'react-router-dom'
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, FormGroup, Nav, Navbar, NavLink} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as PropTypes from "prop-types";
import {LinkContainer} from 'react-router-bootstrap'

const Home = () => {
    const {id} = useParams();
    const [newsFeed, setNewsFeed] = useState();
    const [friend, setFriend] = useState();
    const [friendDate, setFriendData] = useState();
    const [errorMessages, setErrorMessages] = useState();
    useEffect = () => {
        axios.get().then(response => {
            setNewsFeed(response.data)
        }).catch(error => {
            setErrorMessages("Something went wrong")
        }, [])
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.get().then(res => {
            setFriendData(res.data)
        }).catch(error => {
            setErrorMessages("Something went wrong")
        });
    }
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Nav className="me-auto">
                        <LinkContainer to={"/default/" + id}>
                            <Nav.Link>News Feed</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={"/profile/" + id}>
                            <Nav.Link>Profile</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={"/messaging/" + id}>
                            <Nav.Link>Messages</Nav.Link>
                        </LinkContainer>
                    </Nav>

                </Container>
            </Navbar>
            <Form onSubmit={handleSubmit} className={" px-2 pt-3 mx-2 mt-3 d-flex justify-content-center"}>
                <FormGroup className="mb-3 d-flex align-items-center w-50">
                    <Form.Label className={"w-50"}>Search for friends</Form.Label>
                    <Form.Control type="text" name="friends" onChange={(event) => {
                        setFriend(event.target.value);
                    }}/>
                    <Button className={"mx-3"} type="submit">Search</Button>
                </FormGroup>
            </Form>
        </>
    )

}
export default Home;
