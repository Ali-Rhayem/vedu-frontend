import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import {
  getStreamToken,
  getUserFromLocalStorage,
} from "../../pages/callHelpers";

const apiKey = process.env.REACT_APP_STREAM_API_KEY;

const StreamClientProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const { classId } = useParams(); 

  useEffect(() => {
    const initializeClient = async () => {
      const user = getUserFromLocalStorage();
      const token = getStreamToken();

      const videoClient = StreamVideoClient.getOrCreateInstance({
        apiKey,
        user: { id: String(user.id), name: user.name },
        token: token,
      });

      const videoCall = videoClient.call("default", classId);
      await videoCall.create();
      setClient(videoClient);
      setCall(videoCall);
    };

    initializeClient();
  }, [classId]);

  if (!client || !call) {
    return <div>Loading...</div>;
  }

  return <StreamVideo client={client}>{children}</StreamVideo>;
};

export default StreamClientProvider;
