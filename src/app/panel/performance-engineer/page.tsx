'use client';

import useTelemetrySnapshot from "@/app/hooks/useTelemetrySnapshot";
import useTelemetryStream from "@/app/hooks/useTelemetryStream";
import { useEffect } from "react";

export default function PerformanceEngineerPage() {
  const { snapshot } = useTelemetryStream();
  const { snapshot: timestampSnap } = useTelemetrySnapshot(4);

  useEffect(() => {
    console.log(snapshot)
  }, [snapshot])

  useEffect(() => {
    console.log(timestampSnap)
  }, [timestampSnap])

  return <p>AnalyticsPage</p>;
}
