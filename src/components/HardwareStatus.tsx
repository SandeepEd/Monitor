// HardwareStatusComponent.tsx
import React, { useEffect, useState } from 'react';
import DeviceService from '../services/device-service';
import Card from '../container/Card';

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
        console.log(rawStatus);

        const statusArray = rawStatus.split(",");
        console.log(statusArray);
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
        }

        console.log(statusObj);

        setStatus(statusObj);
        setError(null);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchStatus();

    const intervalId = setInterval(fetchStatus, 3000); // Fetches every 30 seconds

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
    return <div className="text-red-500">An error occurred: {error}</div>;
  }

  if (status === null) {
    return <p>Loading...</p>;
  }

  return (
    <Card>
    <div className=" p-5 rounded-lg shadow-md mb-5 text-left">
      <h2 className="text-xl font-semibold mb-2 text-blue-700">Hardware Status</h2>
      <ul className="space-y-2">
        <li><strong>Encoder 1 Mode:</strong> {status.enc1.mode}</li>
        <li><strong>Encoder 1 State:</strong> {getStateMessage(status.enc1.state)}</li>
        <li><strong>Encoder 2 Mode:</strong> {status.enc2.mode}</li>
        <li><strong>Encoder 2 State:</strong> {getStateMessage(status.enc2.state)}</li>
        <li><strong>File Transfer:</strong> {status.filetransfer}</li>
        <li><strong>Name:</strong> {status.name}</li>
      </ul>
    </div>
    </Card>
  );
};

export default HardwareStatusComponent;
