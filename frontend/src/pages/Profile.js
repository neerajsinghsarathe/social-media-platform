import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {CloseButton, FormGroup, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {Header} from "../Components/Header";

const Profile = () => {
    const id = useParams();
    const [bio, setBio] = useState({
        about: "",
        gender: "",
        hobbies: "",
        imageURL: "",
    });
    const [image, setImage] = useState([]);
    const [succMsg, setSuccMsg] = useState();
    const [errorMessages, setErrorMessages] = useState();

    useEffect(() => {
        // axios.get().then(response=>{setBio(response.data)}).catch(error=>{setErrorMessages("Something went wrong")})
    }, []);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange = (event) => {
        event.preventDefault();
        if (event.target.name == "image") {
            setImage(event.target.value)
        }
        setBio({...bio, [event.target.name]: event.target.value});
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:5500/upload", image).then(response => {
            setBio({...bio, imageURL: response.data})
        }).catch(error => {
            setErrorMessages("Something went wrong")
        });
        // axios.put().then(response=>{setSuccMsg("Updated successfully")}).catch(error=>{setErrorMessages("Something went wrong")});
    }
    return (
        <>
            <Header id={id} />
            <Button variant="primary" onClick={handleShow}>
                Update Profile
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    <div className={"d-flex justify-content-end"}>
                        <CloseButton onClick={handleClose} />
                    </div>
                    <div className="form">
                        <Form onSubmit={handleSubmit}>
                            <FormGroup className="input-container">
                                <Form.Label>Profile Picture</Form.Label>
                                <Form.Control type="file" accept="image/png, image/jpeg" name="image" onChange={handleChange}
                                       value={bio.image}/>
                            </FormGroup>
                            <FormGroup className="input-container">
                                <Form.Label>About </Form.Label>
                                <Form.Control type="text" name="about" onChange={handleChange} value={bio.about}/>
                            </FormGroup>
                            <div className="input-container">
                                <Form.Label>Gender </Form.Label>
                                <Form.Select type="text" name="gender" onChange={handleChange}>
                                    <option value="" selected={true} hidden={true}></option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Non-Binary">Non-Binary</option>
                                </Form.Select>
                            </div>
                            <div className="input-container">
                                <Form.Label>Hobbies</Form.Label>
                                <Form.Control type="text" name="hobbies" onChange={handleChange} value={bio.hobbies}/>
                            </div>

                            <div>{errorMessages}</div>
                            <div className="button-container">
                                <Button type="submit" className={"w-100 mt-3"}>SUBMIT</Button>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
               {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>*/}
            </Modal>
        </>
    )


}
export default Profile;
