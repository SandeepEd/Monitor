import React from 'react';
import DeviceService from '../services/device-service';
import Card from '../container/Card';
import { useDeviceStatus } from '../hooks/useDeviceStatus';
import Loading from './Loading';
import ErrorComponent from './Error';

const AudioInputComponent: React.FC = () => {
  const { status: inputStatus, error } = useDeviceStatus(DeviceService.getInstance().getAudioInputStatus);

  if (error) {
    return <ErrorComponent errorMessage={error} labelMessage='audio input status' />;
  }

  const formattedResult = inputStatus?.split(":")[1];

  return (
    <>
      <div className='h-[0.04px] bg-white opacity-20 mx-5'></div>
      <Card>
        {inputStatus === null ? (
          <Loading statusType='Audio Input Status' />
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-blue-700">Audio Input</h2>
            <p className="mt-2 font-normal text-sm"><strong>{formattedResult} </strong> 
                 ports are currently being used</p>
          </div>
        )}
      </Card>
    </>
  );
};

export default AudioInputComponent;
