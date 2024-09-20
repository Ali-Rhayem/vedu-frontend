import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import Home from "./pages/home/home.jsx";
import Class from "./pages/class/class.jsx";
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
import Chats from './pages/chats/chats.jsx';
import ChatPage from "./pages/ChatPage/ChatPage.jsx";
import ProtectedClassRoute from './protectedroutes/ProtectedClassRoute.jsx';
import StreamClientProvider from './components/Call/StreamClientProvider.jsx';
import Meeting from './components/Call/Meeting.jsx';
import Compiler from './components/Call/Compiler/Compiler.jsx';
import ProtectedClassInstructorRoute from './protectedroutes/ProtectedClassInstructorRoute.jsx';
import LandingPage from './pages/LandingPage.jsx';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/class/:classId" element={<ProtectedClassRoute><Class /></ProtectedClassRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/edit-personal-info" element={<ProtectedRoute><EditPersonalInfo /></ProtectedRoute>} />
          <Route path="/edit-address" element={<ProtectedRoute><EditAddress /></ProtectedRoute>} />

          <Route path="/class/:classId/add-assignment" element={<ProtectedClassInstructorRoute><AddAssignment /></ProtectedClassInstructorRoute>} />

          <Route path="/class/:classId/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
          <Route path="/class/:classId/assignments/:assignmentId" element={<ProtectedRoute><AssignmentDetails /></ProtectedRoute>} />
          <Route path="/class/:classId/people" element={<ProtectedRoute><ClassPeople /></ProtectedRoute>} />

          <Route path="/class/:classId/assignments/:assignmentId/submissions" element={<Submissions />} />
          <Route path="/class/:classId/chats" element={<ProtectedRoute><Chats /></ProtectedRoute>} />

          <Route path="/class/:classId/chats/:chatId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route
          path="/class/:classId/meeting"
          element={
            <StreamClientProvider>
              <ProtectedRoute>
                <Meeting />
              </ProtectedRoute>
            </StreamClientProvider>
          }
        />
        <Route path='/class/:classId/compiler' element={<Compiler/>}/>
        </Routes>
      </Router>
  );
}

export default App;
