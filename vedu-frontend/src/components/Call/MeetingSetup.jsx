import {
  DeviceSettings,
  StreamCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";

const MeetingSetup = ({ call, onSetupComplete }) => {
  const [isMicCamtoggledOn, setIsMicCamtoggledOn] = useState(false);
  const [isCallJoined, setIsCallJoined] = useState(false); 
  const [isVideoEnabled, setIsVideoEnabled] = useState(true); 
  const stopCameraCompletely = () => {
    const videoTrack = call?.localMedia?.video?.getTrack();
    if (videoTrack) {
      console.log("Stopping video track completely");
      videoTrack.stop(); 
      setIsVideoEnabled(false);
    } else {
      console.log("No video track found");
    }

    const mediaStream = call?.localMedia?.getStream();
    if (mediaStream) {
      console.log("Releasing media stream...");
      mediaStream.getTracks().forEach((track) => track.stop()); 
    }
  };

  const startCamera = async () => {
    try {
      console.log("Starting camera");
      await call?.camera.enable();
      setIsVideoEnabled(true);
    } catch (error) {
      console.error("Error enabling camera:", error);
    }
  };

  useEffect(() => {
    if (!call) {
      console.error("Call object is not defined");
      return;
    }

    const toggleMicCam = async () => {
      if (isMicCamtoggledOn) {
        console.log("Toggling mic/camera OFF");
        await call.camera.disable();
        await call.microphone.disable();
        stopCameraCompletely();
      } else {
        console.log("Toggling mic/camera ON");
        await call.camera.enable();
        await call.microphone.enable();
        startCamera(); 
      }
    };

    toggleMicCam();
  }, [isMicCamtoggledOn, call]);

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
      <h2>Meeting Setup</h2>

      {isVideoEnabled && (
        <StreamCall call={call}>
          <VideoPreview />
        </StreamCall>
      )}

      <div className="flex h-16 items-center">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isMicCamtoggledOn}
            onChange={(e) => setIsMicCamtoggledOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>

        <DeviceSettings />
      </div>

      <button onClick={handleJoinMeeting}>Join Meeting</button>
    </div>
  );
};

export default MeetingSetup;
