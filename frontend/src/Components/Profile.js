import {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

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
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Profile Picture</label>
                    <input type="file" accept="image/png, image/jpeg" name="image" onChange={handleChange}
                           value={bio.image}/>
                </div>
                <div className="input-container">
                    <label>About </label>
                    <input type="text" name="about" onChange={handleChange} value={bio.about}/>
                </div>
                <div className="input-container">
                    <label>Gender </label>
                    <input type="text" name="gender" onChange={handleChange} value={bio.gender}/>
                </div>
                <div className="input-container">
                    <label>Hobbies</label>
                    <input type="text" name="hobbies" onChange={handleChange} value={bio.hobbies}/>
                </div>

                <div>{errorMessages}</div>
                <div className="button-container">
                    <input type="submit"/>
                </div>
            </form>
        </div>
    )


}
export default Profile;
