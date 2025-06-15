import { useEffect, useState } from "react";
import { getSnapshot } from "@/services/getSnapshot";
import { TelemetrySnapshot } from '../config/types';

const useTelemetrySnapshot = (snapIndex: number) => {
  const [snapshot, setSnapshot] = useState<TelemetrySnapshot | null>(null);

  useEffect(() => {
    const getTelemetrySnapshot = async () => {
      const data = await getSnapshot(snapIndex);

      setSnapshot(data.snapshot || null);
    }

    getTelemetrySnapshot();
  }, [snapIndex]);

  return {
    snapshot,
  };
};

export default useTelemetrySnapshot;
