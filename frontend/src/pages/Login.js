import {useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {FormGroup} from "react-bootstrap";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";


function Login() {
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState();
    const enteredFormData = useRef();
    const handleSubmit = (event) => {
        event.preventDefault();
        if (enteredFormData.current['userID'].value === "" || enteredFormData.current['password'].value === "") {
            setErrorMessages("Please enter all the form fields")
        } else {
            axios.post("http://localhost:5500/users/login", {
                'userID': enteredFormData.current['userID'].value,
                'password': enteredFormData.current['password'].value
            }).then(response => {
                localStorage.setItem("userID", response.data.message.userID)
                localStorage.setItem("userName", response.data.message.userName)
                navigate('/feed')
            }).catch(error => {
                toast.error(error.response.data.error);
            });
        }
    }

    return (
        <div className="p-5 mh-100 w-100 d-flex justify-content-center ">
            <Form onSubmit={handleSubmit} ref={enteredFormData}
                  className="bg-white my-5 w-25 p-3 d-flex flex-column border border-dark rounded">
                <FormGroup className="mb-3">
                    <Form.Label>User ID </Form.Label>
                    <Form.Control type="text" name="userID" required/>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label>Password </Form.Label>
                    <Form.Control type="password" name="password" required/>
                </FormGroup>
                <div>{errorMessages}</div>
                <Link className={"mt-2"} to={'/register'}>Create Account</Link>
                <Button className={"mt-2"} type="submit">Submit</Button>
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
    );
}

export default Login;
