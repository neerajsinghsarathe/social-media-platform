import {useState} from "react";
import {Navigate} from "react";
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {FormGroup} from "react-bootstrap";


function Login() {
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState();
    const [state, setState] = useState({
        userID: "",
        password: "",
    });
    const [succMsg, setSuccMsg] = useState({});

    const handleChange = (event) => {

        event.preventDefault();
        setState({...state, [event.target.name]: event.target.value})

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (state.userID === "" || state.password === "") {
            setErrorMessages("Please enter all the form fields")
        } else {
            //  axios.post().then(response=>{setSuccMsg(response.data.message)}).catch(error=>{setErrorMessages("Something went wrong")});
        }
        if (succMsg) {
            navigate('/default/' + state.userID)
        }
    }


    return (
        <div className="p-5 mh-100 w-100 d-flex justify-content-center ">
            <Form onSubmit={handleSubmit}
                  className="bg-white my-5 w-25 p-3 d-flex flex-column border border-dark rounded">
                <FormGroup className="mb-3">
                    <Form.Label>User ID </Form.Label>
                    <Form.Control type="text" name="userID" onChange={handleChange} required/>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label>Password </Form.Label>
                    <Form.Control type="password" name="password" onChange={handleChange} required/>
                </FormGroup>
                <div>{errorMessages}</div>
                <a className={"mt-2"} onClick={() => navigate('/register')}>Already Have an Account ?</a>
                <Button className={"mt-2"} type="submit">Submit</Button>
            </Form>
        </div>
    );
}

export default Login;
