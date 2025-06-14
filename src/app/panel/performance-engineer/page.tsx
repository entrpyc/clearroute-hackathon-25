'use client'

import { TelemetryKeys } from "@/types/telemetry";
import { useEffect } from "react";

export default function PerformanceEngineerPage() {

  const fetchAnalytics = async() => {
    const res = await fetch('/api/telemetry');
    const data = await res.json();

    console.log(data)
    console.log(data[0][TelemetryKeys.ERS_BATTERY_TEMP])
    return data;
  }

  useEffect(() => {
    fetchAnalytics();
  }, [])
  
  return (
    <p>AnalyticsPage</p>
  )
}