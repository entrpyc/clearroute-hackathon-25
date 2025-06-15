'use client';

import useSnapshotData from "@/app/hooks/useSnapshotData";
import useTelemetryStream from "@/app/hooks/useTelemetryStream";
import SnapshotTimeline from "@/components/SnapshotTimeline";
import { useEffect } from "react";

export default function PerformanceEngineerPage() {
  const { snapshot } = useTelemetryStream();
  const { addSnapshot, selectSnapshot, allSnapshots } = useSnapshotData();

  useEffect(() => {
    if(snapshot) addSnapshot(snapshot);
  }, [snapshot])

  return (
    <SnapshotTimeline
      total={allSnapshots.length}
      onSelect={(index) => selectSnapshot(index)}
    />
  );
}
