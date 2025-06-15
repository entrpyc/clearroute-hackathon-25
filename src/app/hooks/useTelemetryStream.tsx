import { useRef, useState } from "react";
import { getSnapshot } from "@/services/getSnapshot";
import { TelemetrySnapshot } from '../config/types';

const useTelemetryStream = ({
  onSnap
}: {
  onSnap: (snap: TelemetrySnapshot) => void
}) => {
  const [snapshot, setSnapshot] = useState<TelemetrySnapshot | null>(null);
  const snapIndex = useRef(0);

  const readTelemetryStream = async () => {
    const data = await getSnapshot(snapIndex.current);
    if (data?.done) return;

    setSnapshot(data.snapshot || null);
    if(data.snapshot) onSnap(data.snapshot || null);

    snapIndex.current += 1;
  };

  return {
    readTelemetryStream,
    snapshot,
  };
};

export default useTelemetryStream;
