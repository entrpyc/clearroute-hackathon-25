'use client';

import { API_ROUTES, TELEMETRY_FETCH_INTERVAL, TelemetryKeys } from "@/app/config/constants";
import { useEffect } from "react";

export default function PerformanceEngineerPage() {
  const fetchAnalytics = async () => {
    try {
      const res = await fetch(API_ROUTES.TELEMETRY);
      const data = await res.json();
      console.log(data)
      console.log("ERS Battery Temp:", data[0][TelemetryKeys.ERS_BATTERY_TEMP]);
    } catch (error) {
      console.error("Failed to fetch telemetry:", error);
    }
  };

  useEffect(() => {
    fetchAnalytics(); // Initial fetch immediately

    const interval = setInterval(() => {
      fetchAnalytics();
    }, TELEMETRY_FETCH_INTERVAL); 

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return <p>AnalyticsPage</p>;
}
