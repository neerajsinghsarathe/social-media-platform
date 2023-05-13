import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {FormGroup} from "react-bootstrap";

function Register() {
    const url = "http://localhost:5500/users/create"
    const navigate = useNavigate();
    const [succMsg, setSuccMsg] = useState();
    const [registerId, setRegisterId] = useState();
    const [state, setState] = useState({
        userID: "",
        userName: "",
        password: "",
        email: "",
    });
    const [errorMessages, setErrorMessages] = useState();
    const [Msg, setMsg] = useState();

    const handleChange = (event) => {
        event.preventDefault();

        setState({...state, [event.target.name]: event.target.value});

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (state.userName === "" || state.password === "" || state.email === "") {
            setErrorMessages("Please Enter all the form fields")
        } else {
            axios.post(url, state).then(response => {
                setSuccMsg(response.data.message);
                setErrorMessages("")
            }).catch(error => {
                setErrorMessages(error.response.data.error)
            });
        }
    }
    return (
        <div className="p-5 mh-100 w-100 d-flex justify-content-center align-items-center flex-column">
            <Form onSubmit={handleSubmit} method="POST"
                  className="bg-white my-5 w-25 p-3 d-flex flex-column border border-dark rounded">
                <Form.Group className="mb-3" controlId="forUserID">
                    <Form.Label>UserId </Form.Label>
                    <Form.Control type="text" name="userID" onChange={handleChange} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="forUserName">
                    <Form.Label>Name </Form.Label>
                    <Form.Control type="text" name="userName" onChange={handleChange} required/>
                </Form.Group>
                <FormGroup>
                    <Form.Label>Email </Form.Label>
                    <Form.Control type="text" name="email" onChange={handleChange} required/>
                </FormGroup>
                <FormGroup className="mb-3" controlId="forPassword">
                    <Form.Label>Password </Form.Label>
                    <Form.Control type="password" name="password" onChange={handleChange} required/>
                </FormGroup>
                {errorMessages ? <div className={"text-danger mb-3"}>{errorMessages}</div> : null}
                <Button type="submit">Register</Button>
            </Form>
            {succMsg ? <div>Registration successful</div> : null}
            {succMsg ? <Button type="button" onClick={() => {
                navigate('/default/' + state.userID)
            }}>Go to Home Page</Button> : null}
        </div>
    )


}

export default Register;
