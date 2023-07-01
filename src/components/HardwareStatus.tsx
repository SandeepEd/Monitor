import React, { useEffect, useState } from 'react';
import DeviceService from '../services/device-service';
import Card from '../container/Card';
import Loading from './Loading';
import ErrorComponent from './Error';

type Status = {
  mode: string;
  state: string;
}

type HardwareStatus = {
  enc1: Status;
  enc2: Status;
  filetransfer: string;
  name: string;
}

const HardwareStatusComponent: React.FC = () => {
  const [status, setStatus] = useState<HardwareStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const service = DeviceService.getInstance();
        const rawStatus = await service.getHardwareStatus();
  
        if (rawStatus === "RETRY") {
          throw new Error(
            "The server is busy processing another request. Your request will be retried again in next 30 secs. If the problem still persists, please check if the endpoint is working correctly."
          );
        }
  
        const statusArray = rawStatus.split(",");
        if (statusArray.length < 6) throw new Error("Invalid status data received");

        const statusObj: HardwareStatus = {
          enc1: {
            mode: statusArray[0].split(":")[1],
            state: statusArray[1],
          },
          enc2: {
            mode: statusArray[2].split(":")[1],
            state: statusArray[3],
          },
          filetransfer: statusArray[4].split(":")[1],
          name: statusArray[5].split(":")[1],
        };

        setStatus(statusObj);
        setError(null);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchStatus();

    const intervalId = setInterval(fetchStatus, 30000); // Fetches every 30 seconds

    return () => clearInterval(intervalId); // cleanup function to stop interval when component unmounts
  }, []);

  const getStateMessage = (state: string) => {
    switch (state) {
      case 'ON':
        return 'Online';
      case 'OFF':
        return 'Offline';
      case 'READY':
        return 'Idle';
      case 'DISABLED':
        return 'Disabled';
      default:
        return 'Unknown';
    }
  }

  if (error) {
    return <ErrorComponent errorMessage={error} labelMessage={'hardware status'} />;
  }

  return (
    <Card>
      {status === null ?
        <Loading statusType='Hardware Status' /> :
        <div className=" rounded-lg shadow-md text-left">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Hardware</h2>
          <ul className="space-y-2">
          <li><strong>Name:</strong> {status.name}</li>
            <li><strong>Encoder 1 Mode:</strong> {status.enc1.mode}</li>
            <li><strong>Encoder 1 State:</strong> {getStateMessage(status.enc1.state)}</li>
            <li><strong>Encoder 2 Mode:</strong> {status.enc2.mode}</li>
            <li><strong>Encoder 2 State:</strong> {getStateMessage(status.enc2.state)}</li>
            <li><strong>File Transfer:</strong> {status.filetransfer}</li>
          </ul>
        </div>
      }

    </Card>
  );
};

export default HardwareStatusComponent;
