// useDeviceStatus.ts
import { useEffect, useState } from 'react';

export const useDeviceStatus = (statusGetter: () => Promise<string>) => {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  console.log('useDeviceStatus', statusGetter)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await statusGetter();
        setStatus(status);
        setError(null);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchStatus();

    const intervalId = setInterval(fetchStatus, 3000);

    return () => clearInterval(intervalId);
  }, [statusGetter]);

  return { status, error };
};
