'use client';

import useTelemetryStream from "@/app/hooks/useTelemetryStream";
import { useEffect } from "react";

export default function PerformanceEngineerPage() {
  const { snapshot } = useTelemetryStream();

  useEffect(() => {
    console.log(snapshot)
  }, [snapshot])

  return <p>AnalyticsPage</p>;
}
