import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from "./pages/login/login.jsx"; 
import Register from "./pages/register/register.jsx"
import Home from "./pages/home/home.jsx"
import Class from "./pages/class/class.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/class" element={<Class />} />
      </Routes>
    </Router>
  );
}

export default App;
