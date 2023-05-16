import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from "./pages/Profile"
import Home from './pages/Home';
import Messaging from './pages/Messaging';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile/:id" element={<Profile/>}/>
                <Route path="/feed" element={<Home/>}/>
                <Route path="/messaging" element={<Messaging/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
