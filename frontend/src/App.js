import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from "./Components/Profile"
import Home from './Components/Home';
import Messaging from './Components/Messaging';
import 'bootstrap/dist/css/bootstrap.min.css';
const App=()=> {
  return(
  
<BrowserRouter>
<Routes>
  <Route path="/" element={<Login/>}/>
  <Route path="/register" element={<Register/>}/>
  <Route path="/profile/:id" element={<Profile/>}/>
  <Route path="/default/:id" element={<Home/>}/>
  <Route path="/messaging" element={<Messaging/>}/>
</Routes>
</BrowserRouter>
  );
}

export default App;
