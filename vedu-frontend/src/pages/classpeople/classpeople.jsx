import React, { useState } from "react";
import "./classpeople.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Tabs from "../../components/Tabs/tabs";
import AddPersonModal from "../addpersonmodal/addpersonmodal";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useParams } from "react-router-dom";
import { useClassPeople } from "./useClassPeople";
import { useSelector } from "react-redux";

function ClassPeople() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const userData = useSelector((state) => state.user.data);
  const { classId } = useParams();
  const {
    isOwner,
    modalType,
    setModalType,
    modalError,
    setModalError,
    instructors,
    students,
    loading,
    error,
    handleAddPerson,
    handleRemovePerson,
  } = useClassPeople(classId);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="people-page">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="people-page-container">
        <Sidebar isVisible={isSidebarVisible} closeSidebar={closeSidebar} />
        <div className="content">
          <Tabs />
          <div className="people-content">
            <div className="teachers-div">
              <h3>Teachers</h3>
              {isOwner && (
                <button
                  className="add-person-button"
                  onClick={() => setModalType("Instructor")}
                >
                  <i className="fas fa-user-plus"></i>
                </button>
              )}
            </div>
            <div className="people-section teachers">
              {instructors.length > 0 ? (
                instructors.map((instructor) => {
                  const instructorData = instructor?.instructor;
                  if (!instructorData) {
                    return null;
                  }

                  return (
                    <div className="person-item" key={instructor.id}>
                      <div className="person-icon">
                        <img
                          src={
                            instructorData.profile_image
                              ? `http://127.0.0.1:8000/${instructorData.profile_image}`
                              : "/assets/images/defaultpfp.jpg"
                          }
                          alt={`${instructorData.name}'s profile`}
                          className="person-image"
                        />
                      </div>
                      <div className="person-details">
                        <span>{instructorData.name}</span>
                        {isOwner && instructorData.id !== userData.id && (
                          <i
                            className="fas fa-trash delete-person-icon"
                            onClick={() =>
                              handleRemovePerson(instructor.id, "instructor")
                            }
                          ></i>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No instructors found</p>
              )}
            </div>

            <div className="students-div">
              <h3>Students</h3>
              {isOwner && (
                <button
                  className="add-person-button"
                  onClick={() => setModalType("Student")}
                >
                  <i className="fas fa-user-plus"></i>
                </button>
              )}
            </div>
            <div className="people-section students">
              {students.length > 0 ? (
                students.map((student) => (
                  <div className="person-item" key={student.id}>
                    <div className="person-icon">
                      <img
                        src={
                          student.student.profile_image
                            ? `http://127.0.0.1:8000/${student.student.profile_image}`
                            : "/assets/images/defaultpfp.jpg"
                        }
                        alt={`${student.student.name}'s profile`}
                        className="person-image"
                      />
                    </div>
                    <div className="person-details">
                      <span>{student.student.name}</span>
                      {isOwner && (
                        <i
                          className="fas fa-trash delete-person-icon"
                          onClick={() =>
                            handleRemovePerson(student.id, "student")
                          }
                        ></i>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No students found</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {modalType && (
        <AddPersonModal
          type={modalType}
          onClose={() => {
            setModalType(null);
            setModalError("");
          }}
          onSubmit={handleAddPerson}
          error={modalError}
          setModalError={setModalError}
        />
      )}
    </div>
  );
}

export default ClassPeople;
