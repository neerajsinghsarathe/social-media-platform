import React, {useRef} from 'react';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Form, FormGroup, Button, Dropdown} from "react-bootstrap";
import {Header} from "../Components/Header";
import {toast} from "react-toastify";


const Home = () => {
    const {id} = useParams();
    const friendForm = useRef();
    const [newsFeed, setNewsFeed] = useState();
    const [friendsData, setFriendsData] = useState([]);
    const [dropDown, setDropDown] = useState(false);
    const [errorMessages, setErrorMessages] = useState();
    let data = [];
    useEffect(() => {
        /*axios.get().then(response => {
            setNewsFeed(response.data)
        }).catch(error => {
            setErrorMessages(error.response.data.error)
        }, [])*/
    },[])

    useEffect(() => {
        data = friendsData;
    }, [friendsData])
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.get("http://localhost:5500/users/findByUser", {
            params: {
                name: friendForm.current['name'].value
            }
        })
            .then(res => {
                setFriendsData(res.message);
                setDropDown(true);
            })
            .catch(error => {
                setErrorMessages(error.response.data.error)
            });
    }
    return (
        <>
            <Header id={id}/>
            <Form onSubmit={handleSubmit} className={" px-2 pt-3 mx-2 mt-3 d-flex justify-content-center"}
                  ref={friendForm}>
                <FormGroup className=" mx-2 px-2 mb-3 d-flex justify-content-center align-items-center w-50">
                    <Form.Label className={"w-25"}>Search for friends</Form.Label>
                    <Form.Control type="text" name="name"/>
                    <Button className={"mx-3"} type="submit">Search</Button>
                </FormGroup>
                <Dropdown.Menu className={"mt-5"} show={dropDown}>
                    <Dropdown.Header>Dropdown header</Dropdown.Header>
                    <Dropdown.Item>
                    {
                        data.toString()
                        /*data.map((data) => <Dropdown.Item
                            eventKey="2">{data.userName}</Dropdown.Item>)*/
                    }
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Form>
        </>
    )

}
export default Home;
