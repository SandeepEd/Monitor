import React from 'react';
import DeviceService from '../services/device-service';
import Card from '../container/Card';
import { useDeviceStatus } from '../hooks/useDeviceStatus';

const AudioInputComponent: React.FC = () => {
  const { status: inputStatus, error } = useDeviceStatus(DeviceService.getInstance().getAudioInputStatus);

  if (error) {
    return <div className="text-red-500">An error occurred: {error}</div>;
  }

  return (
    <>
    <div className='h-[0.04px] bg-white opacity-20 mx-5'></div>
    <Card>
      {inputStatus === null ? (
        <div className="flex justify-center items-center space-x-2 animate-pulse">
          <div className="h-5 bg-blue-200 rounded-full flex-grow"></div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold text-blue-700">Audio Input Status</h2>
          <p className="mt-2 font-light text-sm">{inputStatus}</p>
        </div>
      )}
    </Card>
    </>
  );
};

export default AudioInputComponent;
