import {
  DeviceSettings,
  StreamCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./MeetSetup/MeetingSetup.css";

const MeetingSetup = ({ call, onSetupComplete }) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [isCallJoined, setIsCallJoined] = useState(false);

  useEffect(() => {
    if (!call) {
      console.error("Call object is not defined");
      return;
    }

    const toggleMicCam = async () => {
      if (!isCamOn) {
        console.log("Camera OFF");
        await call.camera.disable();
      } else {
        console.log("Camera ON");
        await call.camera.enable();
      }

      if (!isMicOn) {
        console.log("Microphone OFF");
        await call.microphone.disable();
      } else {
        console.log("Microphone ON");
        await call.microphone.enable();
      }
    };

    toggleMicCam();
  }, [isMicOn, isCamOn, call]);

  const handleJoinMeeting = async () => {
    if (isCallJoined) {
      console.log("Call has already been joined.");
      return;
    }

    if (!call) {
      console.error("Call object is not available");
      return;
    }

    try {
      console.log("Joining the call...");
      await call.join();
      setIsCallJoined(true);
      onSetupComplete();
      console.log("Call joined successfully");
    } catch (error) {
      console.error("Error joining the call:", error);
    }
  };

  return (
    <div className="meeting-setup">
      <StreamCall call={call}>
        <div className="video-preview-container">
          <VideoPreview className="video-preview" />

          <div className="controls-overlay">
            <button
              className="control-button"
              onClick={() => setIsMicOn(!isMicOn)}
            >
              <FontAwesomeIcon
                icon={isMicOn ? faMicrophone : faMicrophoneSlash}
                className="mic-icon"
              />
            </button>
            <button
              className="control-button"
              onClick={() => setIsCamOn(!isCamOn)}
            >
              <FontAwesomeIcon
                icon={isCamOn ? faVideo : faVideoSlash}
                className="vid-icon"
              />
            </button>
          </div>
        </div>

        <div className="controls">
          <button className="join-meeting" onClick={handleJoinMeeting}>
            Join Meeting
          </button>
          <DeviceSettings />
        </div>
      </StreamCall>
    </div>
  );
};

export default MeetingSetup;
