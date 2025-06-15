'use client';

import { createContext, useEffect, useState } from 'react';
import { TelemetrySnapshot } from '../config/types';

type SnapshotContextType = {
  allSnapshots: TelemetrySnapshot[];
  currentSnapshot: TelemetrySnapshot | null;
  futureSnapshots: TelemetrySnapshot[];
  setCurrentSnapshot: (snap: TelemetrySnapshot) => void;
  setFutureSnapshots: (snaps: TelemetrySnapshot[]) => void;
  addSnapshot: (snap: TelemetrySnapshot) => void;
  selectSnapshot: (index: number) => void;
};

export const SnapshotContext = createContext<SnapshotContextType>({
  allSnapshots: [],
  currentSnapshot: null,
  futureSnapshots: [],
  setCurrentSnapshot: () => {},
  setFutureSnapshots: () => {},
  addSnapshot: () => {},
  selectSnapshot: () => {},
});

export default function SnapshotProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [allSnapshots, setAllSnapshots] = useState<TelemetrySnapshot[]>([]);
  const [currentSnapshot, setCurrentSnapshot] = useState<TelemetrySnapshot | null>(null);
  const [futureSnapshots, setFutureSnapshots] = useState<TelemetrySnapshot[]>([]);

  const addSnapshot = (snap: TelemetrySnapshot) => {
    setAllSnapshots((val) => [...val, snap]);
  };

  const selectSnapshot = (index: number) => {
    setCurrentSnapshot(allSnapshots[index]);
  }

  useEffect(() => {
    console.log(currentSnapshot)
  }, [currentSnapshot])

  return (
    <SnapshotContext.Provider
      value={{
        addSnapshot,
        allSnapshots,
        currentSnapshot,
        setCurrentSnapshot,
        futureSnapshots,
        setFutureSnapshots,
        selectSnapshot,
      }}
    >
      {children}
    </SnapshotContext.Provider>
  );
}
