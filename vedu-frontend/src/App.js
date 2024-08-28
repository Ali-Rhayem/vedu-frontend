import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from "./pages/login/login.jsx"; 
import Register from "./pages/register/register.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
