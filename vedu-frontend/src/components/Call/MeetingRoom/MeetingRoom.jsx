import React, { useState, useEffect, useRef } from "react";
import {
  CallControls,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  CallStatsButton,
} from "@stream-io/video-react-sdk";
import { useNavigate, useParams } from "react-router-dom";
import Compiler from "../Compiler/Compiler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import "./MeetingRoom.css";

const MeetingRoom = () => {
  const { classId } = useParams();
  const userData = useSelector((state) => state.user.data);
  const courses = useSelector((state) => state.courses.courses) || [];
  const foundClass = courses.find((course) => course.id === parseInt(classId));
  const [IsInstructor, setIsInstructor] = useState(false);
  const [HasEditAccess, setHasEditAccess] = useState(false);
  const [layout, setLayout] = useState("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userDropdownVisible, setUserDropdownVisible] = useState(false);
  const [showCompiler, setShowCompiler] = useState(false);
  const [accessRequests, setAccessRequests] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const socket = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (foundClass?.is_instructor_course) {
      setIsInstructor(true);
      setHasEditAccess(true);
    }
  }, [foundClass]);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io("http://localhost:3001");

      socket.current.emit("join", {
        classId,
        userData,
        isInstructor: IsInstructor,
      });

      socket.current.on("toggle-compiler-update", (isCompilerVisible) => {
        setShowCompiler(isCompilerVisible);
      });

      socket.current.on("access-granted", () => {
        setHasEditAccess(true);
      });

      socket.current.on("access-updated", (hasAccess) => {
        setHasEditAccess(hasAccess);
      });

      if (IsInstructor) {
        socket.current.on("user-list-update", (users) => {
          setConnectedUsers(users);
        });

        socket.current.on("access-request-update", (requests) => {
          setAccessRequests(requests);
        });
      }
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, [IsInstructor, userData, classId]);

  const handleToggleCompiler = () => {
    const newCompilerState = !showCompiler;
    setShowCompiler(newCompilerState);

    socket.current.emit("toggle-compiler", newCompilerState);
  };

  const handleRequestEditAccess = () => {
    socket.current.emit("request-edit-access", userData);
  };

  const handleRespondToRequest = (userId, approve) => {
    socket.current.emit("respond-to-request", { userId, approve });
  };

  const handleUpdateUserAccess = (userId, hasEditAccess) => {
    socket.current.emit("update-user-access", { userId, hasEditAccess });
  };

  const RenderCallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      case "speaker-left":
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section
      className={`meeting-room-section ${showCompiler ? "compiler-open" : ""}`}
    >
      <div className="meeting-room-container">
        {IsInstructor && (
          <div className="instructor-controls">
            <button
              className="toggle-compiler-button"
              onClick={handleToggleCompiler}
            >
              <FontAwesomeIcon icon={faCode} />
              {showCompiler ? " Hide Editor" : " Show Editor"}
            </button>
          </div>
        )}

        {showCompiler && !IsInstructor && !HasEditAccess && (
          <button
            className="request-access-button"
            onClick={handleRequestEditAccess}
          >
            Request Edit Access
          </button>
        )}

        {IsInstructor && accessRequests.length > 0 && (
          <div className="access-requests">
            <h3>Access Requests</h3>
            {accessRequests.map((request) => (
              <div key={request.userId} className="request-item">
                <span>{request.userData.name}</span>
                <button
                  onClick={() => handleRespondToRequest(request.userId, true)}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleRespondToRequest(request.userId, false)}
                >
                  Deny
                </button>
              </div>
            ))}
          </div>
        )}

        {showCompiler ? (
          <Compiler
            isInstructor={IsInstructor}
            HasEditAccess={HasEditAccess}
            socket={socket.current}
          />
        ) : (
          <div className="call-layout-container">
            <RenderCallLayout />
          </div>
        )}

        <div
          className={`participants-list-container ${
            showParticipants ? "show-block" : ""
          }`}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div
        className={`call-controls-container ${
          showCompiler ? "below-compiler" : ""
        }`}
      >
        <CallControls onLeave={() => navigate(`/class/${classId}`)} />

        <div className="dropdown-menu">
          <div className="dropdown-trigger">
            <button
              className="dropdown-button"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              Change Layout
            </button>

            {dropdownVisible && (
              <div className="dropdown-content">
                {["Grid", "Speaker-Left", "Speaker-Right"].map(
                  (item, index) => (
                    <div key={index}>
                      <button
                        onClick={() => {
                          setLayout(item.toLowerCase().replace("-", " "));
                          setDropdownVisible(false);
                        }}
                        className="dropdown-item"
                      >
                        {item}
                      </button>
                      {index < 2 && <hr className="dropdown-separator" />}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        <CallStatsButton />

        <button
          className="participants-toggle-button"
          onClick={() => setShowParticipants((prev) => !prev)}
        >
          Show Participants
        </button>

        <div className="user-access-dropdown">
          <button
            className="dropdown-button"
            onClick={() => setUserDropdownVisible(!userDropdownVisible)}
          >
            Manage Users
          </button>

          {userDropdownVisible && (
            <div className="dropdown-content user-list-dropdown">
              {connectedUsers.map((user) => (
                <div key={user.userId} className="user-item">
                  <span>{user.userData.name}</span>
                  <button
                    onClick={() =>
                      handleUpdateUserAccess(user.userId, !user.hasEditAccess)
                    }
                  >
                    {user.hasEditAccess ? "Remove Access" : "Grant Access"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
