import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import type { EnvironmentalData } from "@shared/schema";

interface UseRealTimeDataProps {
  dataTypes?: string[];
  region?: string;
  pollInterval?: number;
}

export function useRealTimeData(
  dataTypes: string[] = [],
  region: string = "global",
  pollInterval: number = 30000
) {
  const [latestData, setLatestData] = useState<EnvironmentalData[]>([]);
  const [isConnected, setIsConnected] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout>();

  const { data, isError, refetch } = useQuery({
    queryKey: ['/api/real-time/latest', { dataTypes: dataTypes.join(','), region }],
    refetchInterval: pollInterval,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  useEffect(() => {
    if (data) {
      setLatestData(data);
      setIsConnected(true);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      setIsConnected(false);
    }
  }, [isError]);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      setIsConnected(true);
      refetch();
    };

    const handleOffline = () => {
      setIsConnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial connection status
    setIsConnected(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [refetch]);

  // Manual refresh function
  const refresh = () => {
    refetch();
  };

  return {
    latestData,
    isConnected,
    refresh,
    isError,
  };
}
