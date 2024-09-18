import { useState, useEffect } from 'react';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetCallById = (callId) => {
  const [call, setCall] = useState(null);
  const [isCallLoading, setIsLoading] = useState(true);
  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) {
      console.log("Client not initialized");
      return;
    }

    console.log("Client initialized", client);
    const loadCall = async () => {
      try {
        const { calls } = await client.queryCalls({
          filter_conditions: {
            callId,
          },
        });

        if (calls.length > 0) {
          setCall(calls[0]);
        } else {
          console.log("No existing call found, creating new call...");
          const newCall = client.call('default', callId);
          setCall(newCall); 
        }
      } catch (error) {
        console.error("Error loading the call:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCall();
  }, [client, callId]);

  return { call, isCallLoading };
};
