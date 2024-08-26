import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import login from "./pages/login/login.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<login />} />
      </Routes>
    </Router>
  );
}

export default App;
