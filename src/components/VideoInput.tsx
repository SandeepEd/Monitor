import React, { useEffect, useState } from 'react';
import DeviceService from '../services/device-service';
import Card from '../container/Card';
import { useDeviceStatus } from '../hooks/useDeviceStatus';

const VideoInputComponent: React.FC = () => {
  // const [inputStatus, setInputStatus] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchStatus = async () => {
  //     const service = DeviceService.getInstance();
  //     const status = await service.getVideoInputStatus();
  //     setInputStatus(status);
  //   };

  //   fetchStatus();

  //   const intervalId = setInterval(fetchStatus, 30000); // Fetches every 30 seconds

  //   return () => clearInterval(intervalId);
  // }, []);

  const { status: inputStatus, error } = useDeviceStatus(DeviceService.getInstance().getVideoInputStatus);

  if (error) {
    return <div className="text-red-500">An error occurred: {error}</div>;
  }

  return (
    <Card>
      {inputStatus === null ? (
        <div className="flex justify-center items-center space-x-2 animate-pulse">
          <div className="h-5 rounded-full flex-grow"></div>
          Loading...
        </div>
      ) : (
        <>
        <div>
          <h2 className="text-xl font-semibold text-blue-700">Video Input Status</h2>
          <p className="mt-2 font-light text-sm">{inputStatus}</p>
        </div>
        
        </>
      )}
    </Card>
  );
};

export default VideoInputComponent;
