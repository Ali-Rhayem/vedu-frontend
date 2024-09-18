import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { removeInstructor, removeStudent } from "../../redux/classPeopleSlice.js"; 
import {
    setClassPeopleLoading,
    setClassPeopleSuccess,
    setClassPeopleError,
    addInstructor,
    addStudent,
} from "../../redux/classPeopleSlice";

export const useClassPeople = (classId) => {
    const [isOwner, setIsOwner] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [modalError, setModalError] = useState("");

    const course = useSelector((state) =>
        state.courses.courses.find((course) => course.id === parseInt(classId))
    );
    const userData = useSelector((state) => state.user.data);
    const { instructors, students, loading, error, fetchedClasses } = useSelector((state) => ({
        instructors: state.classPeople.instructors[classId] || [],
        students: state.classPeople.students[classId] || [],
        loading: state.classPeople.loading,
        error: state.classPeople.error,
        fetchedClasses: state.classPeople.fetchedClasses[classId],
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        if (course && userData && course.owner_id === userData.id) {
            setIsOwner(true);
        }
    }, [course, userData]);

    useEffect(() => {
        if (!fetchedClasses && course) {
            const fetchClassPeople = async () => {
                try {
                    dispatch(setClassPeopleLoading());

                    const instructorsData = await requestApi({
                        route: `/api/course-instructor/course/${classId}/instructors`,
                        requestMethod: RequestMethods.GET,
                    });

                    const studentsData = await requestApi({
                        route: `/api/course-student/course/${classId}/students`,
                        requestMethod: RequestMethods.GET,
                    });

                    dispatch(
                        setClassPeopleSuccess({
                            classId,
                            instructors: instructorsData,
                            students: studentsData,
                        })
                    );
                } catch (err) {
                    dispatch(setClassPeopleError("Failed to fetch class people"));
                }
            };

            fetchClassPeople();
        }
    }, [classId, course, fetchedClasses, dispatch]);

    const handleAddPerson = async (email) => {
        try {
            const userIdResponse = await requestApi({
                route: "/api/get-user-id",
                requestMethod: RequestMethods.POST,
                body: { email },
            });

            if (!userIdResponse || !userIdResponse.user_id) {
                setModalError("User not found");
                return;
            }

            const userId = userIdResponse.user_id;
            const route =
                modalType === "Instructor"
                    ? "/api/course-instructor"
                    : "/api/course-student";
            const body = {
                course_id: classId,
                [`${modalType.toLowerCase()}_id`]: userId,
            };

            await requestApi({
                route,
                requestMethod: RequestMethods.POST,
                body,
            });

            const instructorsData = await requestApi({
                route: `/api/course-instructor/course/${classId}/instructors`,
                requestMethod: RequestMethods.GET,
            });

            const studentsData = await requestApi({
                route: `/api/course-student/course/${classId}/students`,
                requestMethod: RequestMethods.GET,
            });

            if (modalType === "Instructor") {
                const newInstructor = instructorsData.find(
                    (instructor) => instructor.instructor_id === userId
                );
                if (newInstructor) {
                    dispatch(
                        addInstructor({
                            classId,
                            instructor: newInstructor,
                        })
                    );
                }
            } else {
                const newStudent = studentsData.find(
                    (student) => student.student_id === userId
                );
                if (newStudent) {
                    dispatch(
                        addStudent({
                            classId,
                            student: newStudent,
                        })
                    );
                }
            }

            setModalError("");
            setModalType(null);
        } catch (err) {
            if (err.status === 409) {
                setModalError(err.response.data.message);
            } else {
                setModalError(err.response.data.error);
            }
        }
    };

    const handleRemovePerson = async (personId, personType) => {
        try {
            const route =
                personType === "instructor"
                    ? `/api/course-instructor/${personId}`
                    : `/api/course-student/${personId}`;

            await requestApi({
                route,
                requestMethod: "DELETE",
            });

            if (personType === "instructor") {
                dispatch(removeInstructor({ classId, instructorId: personId }));
            } else if (personType === "student") {
                dispatch(removeStudent({ classId, studentId: personId }));
            }

            alert(`${personType === "instructor" ? "Instructor" : "Student"} removed successfully`);
        } catch (error) {
            console.error(`Error removing ${personType}:`, error);
            alert(`Failed to remove ${personType}. Please try again.`);
        }
    };

    return {
        isOwner,
        modalType,
        setModalType,
        modalError,
        setModalError,
        course,
        instructors,
        students,
        loading,
        error,
        handleAddPerson,
        handleRemovePerson,
    };
};
