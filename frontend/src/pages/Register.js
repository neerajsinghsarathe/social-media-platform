import {useRef, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {FormGroup} from "react-bootstrap";
import {ToastContainer, toast} from 'react-toastify';

function Register() {
    const url = "http://localhost:5500/users/create"
    const navigate = useNavigate();
    const enteredFormData = useRef();
    const [errorMessages, setErrorMessages] = useState();
    const handleSubmit = (event) => {
        event.preventDefault();
        if (enteredFormData.current['userName'].value === "" || enteredFormData.current['password'].value === "" || enteredFormData.current['email'].value === "") {
            setErrorMessages("Please Enter all the form fields")
        } else {
            const body = {
                "userID": enteredFormData.current['userID'].value,
                "userName": enteredFormData.current['userName'].value,
                "email": enteredFormData.current['email'].value,
                "password": enteredFormData.current['password'].value
            }
            axios.post(url, body).then(response => {
                setErrorMessages("")
                localStorage.setItem("userID", enteredFormData.current['userID'].value);
                localStorage.setItem("userName", enteredFormData.current['userName'].value);
                navigate('/feed')
            }).catch(error => {
                toast.error(error.response.data.error);
            });
        }
    }
    return (
        <div className="p-5 mh-100 w-100 d-flex justify-content-center align-items-center flex-column">
            <Form onSubmit={handleSubmit} method="POST" ref={enteredFormData}
                  className="bg-white my-5 w-25 p-3 d-flex flex-column border border-dark rounded">
                <Form.Group className="mb-3" controlId="forUserID">
                    <Form.Label>UserId </Form.Label>
                    <Form.Control type="text" name="userID" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="forUserName">
                    <Form.Label>Name </Form.Label>
                    <Form.Control type="text" name="userName" required/>
                </Form.Group>
                <FormGroup>
                    <Form.Label>Email </Form.Label>
                    <Form.Control type="text" name="email" required/>
                </FormGroup>
                <FormGroup className="mb-3" controlId="forPassword">
                    <Form.Label>Password </Form.Label>
                    <Form.Control type="password" name="password" required/>
                </FormGroup>
                {errorMessages ? <div className={"text-danger mb-3"}>{errorMessages}</div> : null}
                <Link className={"my-2"} to={'/login'}>Already have an account ?</Link>
                <Button type="submit">Register</Button>
            </Form>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover={false}
                theme="colored"
            />
        </div>
    )


}

export default Register;
