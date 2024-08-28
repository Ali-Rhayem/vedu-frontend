import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from "./pages/login/login.jsx"; 
import Register from "./pages/register/register.jsx"
import Home from "./pages/home/home.jsx"
import Class from "./pages/class/class.jsx"
import Profile from './pages/profile/profile.jsx';
import EditProfile from './pages/editprofile/editprofile.jsx';
import EditPersonalInfo from './pages/editpersonalinfo/editpersonalinfo.jsx';
import EditAddress from './pages/editaddress/editaddress.jsx';
import AddAssignment from './pages/addassignment/addassignment.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/class" element={<Class />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/edit-personal-info" element={<EditPersonalInfo />} />
        <Route path="/edit-address" element={<EditAddress />} />
        <Route path="/add-assignment" element={<AddAssignment />} />
      </Routes>
    </Router>
  );
}

export default App;
