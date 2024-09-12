import {
  CallControls,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  CallStatsButton,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import "./MeetingRoom/MeetingRoom.css"; 
import { useNavigate, useParams } from "react-router-dom";

const MeetingRoom = () => {
  const [layout, setLayout] = useState("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const {classId} = useParams();

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
    <section className="meeting-room-section">
      <div className="meeting-room-container">
        <div className="call-layout-container">
          <RenderCallLayout />
        </div>
        <div
          className={`participants-list-container ${
            showParticipants ? "show-block" : ""
          }`}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className="call-controls-container">
        <CallControls onLeave={() => navigate(`/class/${classId}`)}/>

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
      </div>
    </section>
  );
};

export default MeetingRoom;
