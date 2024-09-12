import React, { useState, useEffect } from 'react';
import { getUserFromLocalStorage } from '../../pages/callHelpers';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import MeetingSetup from './MeetSetup/MeetingSetup.jsx';
import MeetingRoom from './MeetingRoom/MeetingRoom.jsx';
import { useGetCallById } from '../../pages/useGetCallById';
import { useParams, useNavigate } from 'react-router-dom';

const Meeting = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const user = getUserFromLocalStorage();
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const { call, isCallLoading } = useGetCallById(classId);

  useEffect(() => {
    if (!user || !user.id) {
      console.error("User not found or user ID is missing");
      navigate("/login");
    }
  }, [user, navigate]);

  if (isCallLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <StreamTheme>
        {!isSetupComplete ? (
          <MeetingSetup call={call} onSetupComplete={() => setIsSetupComplete(true)} />
        ) : (
          <StreamCall call={call}>
            <MeetingRoom />
          </StreamCall>
        )}
      </StreamTheme>
    </main>
  );
};

export default Meeting;
