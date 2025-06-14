import { useEffect, useRef, useState } from "react";
import { getSnapshot } from "@/services/telemetry/getSnapshot";
import { TELEMETRY_STREAM_INTERVAL } from "../config/constants";

const useTelemetryStream = () => {
  const [snapshot, setSnapshot] = useState({});
  const snapIndex = useRef(0);

  useEffect(() => {
    const readTelemetryStream = async () => {
      const data = await getSnapshot(snapIndex.current);
      if (data.done) return;

      setSnapshot(data.snapshot);
      snapIndex.current += 1;
    };

    const interval = setInterval(readTelemetryStream, TELEMETRY_STREAM_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return {
    snapshot,
  };
};

export default useTelemetryStream;
