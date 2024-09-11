import React, { useEffect, useState } from "react";
import {
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import {
  getStreamToken,
  getUserFromLocalStorage,
} from "../../pages/callHelpers";

const apiKey = process.env.REACT_APP_STREAM_API_KEY;

const StreamClientProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);

  useEffect(() => {
    const initializeClient = async () => {
      const user = getUserFromLocalStorage();
      const token = getStreamToken();

      const videoClient = StreamVideoClient.getOrCreateInstance({
        apiKey,
        user: { id: String(user.id), name: user.name },
        token: token,
      });

      const videoCall = videoClient.call("default", "my-first-call");

      setClient(videoClient);
      setCall(videoCall);
    };

    initializeClient();
  }, []);

  if (!client || !call) {
    return <div>Loading...</div>;
  }

  return (
    <StreamVideo client={client}>
      {children}
    </StreamVideo>
  );
};

export default StreamClientProvider;
