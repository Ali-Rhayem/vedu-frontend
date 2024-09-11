import { CallControls, PaginatedGridLayout, SpeakerLayout } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

const MeetingRoom = () => {
  const [layout, setLayout] = useState("speaker-left");

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
    <section>
      <h2>Meeting Room</h2>
      <div>
        <button onClick={() => setLayout("grid")}>Grid Layout</button>
        <button onClick={() => setLayout("speaker-left")}>Speaker Left</button>
        <button onClick={() => setLayout("speaker-right")}>Speaker Right</button>
      </div>

      <div>
        <RenderCallLayout />
        <CallControls/>
      </div>
    </section>
  );
};

export default MeetingRoom;
