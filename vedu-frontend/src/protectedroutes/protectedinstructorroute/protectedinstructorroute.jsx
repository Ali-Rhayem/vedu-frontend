// protectedinstructorroute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { useSelector } from "react-redux";

const ProtectedInstructorRoute = ({ children, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInstructor, setIsInstructor] = useState(false);
  const { classId } = useParams();
  const userData = useSelector((state) => state.user.data);

  useEffect(() => {
    const fetchUserDataAndCheckInstructor = async () => {
      try {
        let userId;

        if (!userData) {
          // Fetch user data if not already in the Redux store
          const fetchedUserData = await requestApi({
            route: "/api/user",
            requestMethod: RequestMethods.GET,
          });
          userId = fetchedUserData.id;
        } else {
          userId = userData.id;
        }

        // Check if the user is an instructor for the class
        const result = await requestApi({
          route: `/api/courses/${userId}/is-instructor/${classId}`,
          requestMethod: RequestMethods.GET,
        });

        if (result) {
          setIsInstructor(result.is_instructor);
        }
      } catch (error) {
        console.error(
          "Error fetching user data or checking instructor status:",
          error
        );
      } finally {
        setIsLoading(false); // Only set loading to false after the async call is complete
      }
    };

    fetchUserDataAndCheckInstructor();
  }, [classId, userData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isInstructor ? children : <Navigate to={`/class/${classId}`} />;
};

export default ProtectedInstructorRoute;
