import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

const ProtectedClassRoute = ({ children }) => {
  const { classId } = useParams();
  const courses = useSelector((state) => state.courses.courses) || [];

  const isEnrolled = courses.some((course) => course.id === parseInt(classId));

  if (!isEnrolled) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedClassRoute;
