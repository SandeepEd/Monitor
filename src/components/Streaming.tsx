import React, { useEffect, useState } from 'react';
import DeviceService from '../services/device-service';
import Card from '../container/Card';
import Loading from './Loading';

type InputStatus = {
    inputA: string;
    inputB: string;
}

const StreamingComponent: React.FC = () => {
    const [status, setStatus] = useState<InputStatus | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const service = DeviceService.getInstance();
                const rawStatus = await service.getInputStatus();

                const statusArray = rawStatus.split(";");
                if (statusArray.length < 2) throw new Error("Invalid status data received");

                const statusObj: InputStatus = {
                    inputA: statusArray[0].split(": ")[1],
                    inputB: statusArray[1].split(": ")[1],
                }

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

    if (error) {
        return <div className="text-red-500">An error occurred: {error}</div>;
    }

    return (
        <>
            <div className='h-[0.04px] bg-white opacity-20 mx-5'></div>
            <Card>
                {status === null ?
                    <Loading statusType='Input Status' /> :
                    <div className=" rounded-lg shadow-md text-left">
                        <h2 className="text-xl font-semibold mb-2 text-blue-700">Streaming Status</h2>
                        <ul className="space-y-2">
                            <li><strong>Input A:</strong> {status.inputA}</li>
                            <li><strong>Input B:</strong> {status.inputB}</li>
                        </ul>
                    </div>
                }
            </Card>
        </>
    );
};

export default StreamingComponent;
