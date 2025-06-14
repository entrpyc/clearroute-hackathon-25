'use client'

import { API_ROUTES, TelemetryKeys } from "@/app/config/constants";
import { useEffect } from "react";

export default function PerformanceEngineerPage() {

  const fetchAnalytics = async() => {
    const res = await fetch(API_ROUTES.TELEMETRY);
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