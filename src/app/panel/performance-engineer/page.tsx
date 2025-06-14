'use client';

import { API_ROUTES, TELEMETRY_FETCH_INTERVAL, TelemetryKeys } from "@/app/config/constants";
import { useEffect, useState } from "react";

export default function PerformanceEngineerPage() {
  const [rows, setRows] = useState<TelemetryKeys[]>([]);

  const fetchAnalytics = async () => {
    let data;

    try {
      const res = await fetch(API_ROUTES.TELEMETRY);
      data = await res.json();
    } catch (error) {
      console.error("Failed to fetch telemetry:", error);
    }

    return data;
  };

  useEffect(() => {
    const pollTelemetry = () => {
      const interval = setInterval(async () => {
        const data = await fetchAnalytics();
        if(data.done) return clearInterval(interval);

        setRows(prev => [...prev, data.row]);
      }, TELEMETRY_FETCH_INTERVAL); 

      return interval;
    }

    const interval = pollTelemetry();
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(rows)
  }, [rows])

  return <p>AnalyticsPage</p>;
}
