import { useEffect, useState } from "react";
import { getSnapshot } from "@/services/telemetry/getSnapshot";

const useTelemetrySnapshot = (snapIndex: number) => {
  const [snapshot, setSnapshot] = useState({});

  useEffect(() => {
    const getTelemetrySnapshot = async () => {
      const data = await getSnapshot(snapIndex);

      setSnapshot(data.snapshot || {});
    }

    getTelemetrySnapshot();
  }, [snapIndex]);

  return {
    snapshot,
  };
};

export default useTelemetrySnapshot;
