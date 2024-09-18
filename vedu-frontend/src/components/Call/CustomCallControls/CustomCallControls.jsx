import React from "react";
import {
  CancelCallButton,
  SpeakingWhileMutedNotification,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
} from "@stream-io/video-react-sdk";

const CustomCallControls = ({ onLeave }) => {
  return (
    <div className="str-video__call-controls">
      <SpeakingWhileMutedNotification>
        <ToggleAudioPublishingButton />
      </SpeakingWhileMutedNotification>
      <ToggleVideoPublishingButton />
      <CancelCallButton onLeave={onLeave} />
    </div>
  );
};

export default CustomCallControls;
