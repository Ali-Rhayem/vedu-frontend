import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

const ProtectedClassInstructorRoute = ({ children }) => {
  const { classId } = useParams();
  const courses = useSelector((state) => state.courses.courses);
  const isLoading = useSelector((state) => state.courses.isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const foundClass = courses?.find((course) => course.id === parseInt(classId));

  if (!foundClass) {
    return <Navigate to="/home" />;
  }

  if (foundClass.is_instructor_course) {
    return children;
  } else {
    return <Navigate to={`/class/${classId}`} />;
  }
};

export default ProtectedClassInstructorRoute;