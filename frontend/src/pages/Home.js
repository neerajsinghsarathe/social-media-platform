import React, {useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Form, FormGroup, Button, Dropdown} from "react-bootstrap";
import {Header} from "../Components/Header";


const Home = () => {
    const navigate = useNavigate();
    const friendForm = useRef();
    const [newsFeed, setNewsFeed] = useState();
    const [friendsData, setFriendsData] = useState([]);
    const [dropDown, setDropDown] = useState(false);
    const [errorMessages, setErrorMessages] = useState();
    useEffect(() => {
        /*axios.get().then(response => {
            setNewsFeed(response.data)
        }).catch(error => {
            setErrorMessages(error.response.data.error)
        }, [])*/
    }, [])
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.get("http://localhost:5500/users/findByUser", {
            params: {
                name: friendForm.current['name'].value
            }
        })
            .then(res => {
                setFriendsData(res.data.message);
                setDropDown(true);
            })
            .catch(error => {
                setErrorMessages(error.response.data.error)
            });
    }
    return (
        <>
            <Header/>
            <Form onSubmit={handleSubmit} className={" px-2 pt-3 mx-2 mt-3 d-flex justify-content-center"}
                  ref={friendForm}>
                <FormGroup className=" mx-2 px-2 mb-3 d-flex justify-content-center align-items-center w-50">
                    <Form.Label className={"w-25"}>Search for friends</Form.Label>
                    <Form.Control type="text" name="name"/>
                    <Button className={"mx-3"} type="submit">Search</Button>
                </FormGroup>
                <Dropdown.Menu className={"mt-5 w-25 "} show={dropDown}>
                    {
                        friendsData.length !== 0 ? friendsData.map((data) => {
                            return <Dropdown.Item
                                eventKey={data.userID}
                                onClick={() => {navigate('/profile/' + data.userID)}}>{data.userName} <span className={"text-secondary"}>(@{data.userID})</span></Dropdown.Item>}) : <Dropdown.Header>No User Found</Dropdown.Header>
                        }

                        </Dropdown.Menu>
                        </Form>
                        </>
                        )

                    }
export default Home;
