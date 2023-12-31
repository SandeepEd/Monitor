// useDeviceStatus.ts
import { useEffect, useState } from "react";

export const useDeviceStatus = (statusGetter: () => Promise<string>) => {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await statusGetter();
        if (status === "RETRY") {
          throw new Error(
            "The server is busy processing another request. Your request will be retried again in next 30 secs. If the problem still persists, please check if the endpoint is working correctly."
          );
        }
        setStatus(status);
        setError(null);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchStatus();

    const intervalId = setInterval(fetchStatus, 30000);

    return () => clearInterval(intervalId);
  }, [statusGetter]);

  return { status, error };
};
