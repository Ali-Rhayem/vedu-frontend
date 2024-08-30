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
import ProtectedRoute from './protectedroutes/protectedroute/ProtectedRoute.jsx';
import Assignments from './pages/assignments/assignments.jsx';
import ClassPeople from './pages/classpeople/classpeople.jsx';
import AssignmentDetails from './pages/assignmentdetails/assignmentdetails.jsx';
import Submissions from './pages/submissions/submissions.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/class/:classId" element={<ProtectedRoute><Class /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="/edit-personal-info" element={<ProtectedRoute><EditPersonalInfo /></ProtectedRoute>} />
        <Route path="/edit-address" element={<ProtectedRoute><EditAddress /></ProtectedRoute>} />
        <Route path="/add-assignment" element={<ProtectedRoute><AddAssignment /></ProtectedRoute>} />
        <Route path="/class/:classId/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
        <Route path="/class/:classId/assignments/:assignmentId" element={<ProtectedRoute><AssignmentDetails /></ProtectedRoute>} />
        <Route path="/class/:classId/people" element={<ProtectedRoute><ClassPeople /></ProtectedRoute>} />
        <Route path="/submissions" element={<ProtectedRoute><Submissions /></ProtectedRoute>} />
        {/* <Route path="/class/:classId/assignments/:assignmentId/submissions" element={<ProtectedRoute><Submissions /></ProtectedRoute>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
