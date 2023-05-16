import { useEffect, useState } from "react";
import axios from "axios";
const Messaging=()=>{
    const [msgList,setMsgList]=useState({});
    const [errorMessages, setErrorMessages] = useState();
    useEffect=()=>{
        axios.get().then(response=>{setMsgList(response.data)}).catch(error=>{setErrorMessages("Something went wrong")});
    }
    return(
        <>
        <form >
          <div className="input-container">
            <label>Chat with? </label>
            <input type="text" name="friend" required />
          </div>
          </form>
        </>
    )

}
export default Messaging;