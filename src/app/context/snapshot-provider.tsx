'use client';

import { createContext, useEffect, useState } from 'react';
import { TelemetrySnapshot } from '../config/types';

type SnapshotContextType = {
  allSnapshots: TelemetrySnapshot[];
  currentSnapshot: TelemetrySnapshot | null;
  futureSnapshots: TelemetrySnapshot[];
  allSnapshotsAndFutures: TelemetrySnapshot[];
  currentSnapshotIndex: number;
  setCurrentSnapshot: (snap: TelemetrySnapshot) => void;
  addFutureSnapshots: (snaps: TelemetrySnapshot[]) => void;
  addSnapshot: (snap: TelemetrySnapshot) => void;
  selectSnapshot: (index: number) => void;
};

export const SnapshotContext = createContext<SnapshotContextType>({
  allSnapshots: [],
  currentSnapshot: null,
  futureSnapshots: [],
  allSnapshotsAndFutures: [],
  currentSnapshotIndex: 0,
  setCurrentSnapshot: () => {},
  addFutureSnapshots: () => {},
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
  const [currentSnapshotIndex, setCurrentSnapshotIndex] = useState<number>(0);
  const [futureSnapshots, setFutureSnapshots] = useState<TelemetrySnapshot[]>([
    {
    "Lap": "1",
    "Time": "0:03:31",
    "Lap Time": "03:31.0",
    "Sector 1 Time (s)": "74.23",
    "Sector 2 Time (s)": "74.22",
    "Sector 3 Time (s)": "63.47",
    "Top Speed (km/h)": "233.6",
    "Tire Pressure (PSI)": "29.9",
    "Fuel Level (%)": "97.5",
    "Tire Type": "Medium",
    "Driver": "E. GUERRIERI",
    "Pit Stop": "No",
    "Pit Time (sec)": "",
    "Tire Pressure FL": "30.29",
    "Tire Pressure FR": "29.09",
    "Tire Pressure RL": "28.96",
    "Tire Pressure RR": "29.29",
    "Tire Temp Inner FL": "87.3",
    "Tire Temp Mid FL": "82.9",
    "Tire Temp Outer FL": "87.0",
    "Tire Temp Inner FR": "93.8",
    "Tire Temp Mid FR": "100.6",
    "Tire Temp Outer FR": "80.7",
    "Tire Temp Inner RL": "95.4",
    "Tire Temp Mid RL": "93.3",
    "Tire Temp Outer RL": "87.6",
    "Tire Temp Inner RR": "104.3",
    "Tire Temp Mid RR": "97.8",
    "Tire Temp Outer RR": "104.7",
    "Tire Wear FL": "8.6",
    "Tire Wear FR": "5.9",
    "Tire Wear RL": "0.4",
    "Tire Wear RR": "1.7",
    "Brake Temp Front": "798.0",
    "Brake Temp Rear": "382.2",
    "Brake Pressure Front": "80.2",
    "Brake Pressure Rear": "89.5",
    "Brake Bias": "59.6",
    "Oil Temp": "100.1",
    "Water Temp": "98.1",
    "Fuel Burn per Lap": "2.07",
    "Throttle Map": "Aggressive",
    "Engine Map Mode": "Safe",
    "ERS State of Charge": "62.8",
    "ERS Battery Temp": "49.8",
    "ERS Deploy Mode": "Medium",
    "Throttle %": "84.4",
    "Brake %": "4.0",
    "Steering Angle": "-39.9",
    "Steering Correction": "0.42",
    "Lap Delta": "-0.72"
}, {
    "Lap": "1",
    "Time": "0:03:31",
    "Lap Time": "03:31.0",
    "Sector 1 Time (s)": "74.23",
    "Sector 2 Time (s)": "74.22",
    "Sector 3 Time (s)": "63.47",
    "Top Speed (km/h)": "233.6",
    "Tire Pressure (PSI)": "29.9",
    "Fuel Level (%)": "97.5",
    "Tire Type": "Medium",
    "Driver": "E. GUERRIERI",
    "Pit Stop": "No",
    "Pit Time (sec)": "",
    "Tire Pressure FL": "30.29",
    "Tire Pressure FR": "29.09",
    "Tire Pressure RL": "28.96",
    "Tire Pressure RR": "29.29",
    "Tire Temp Inner FL": "87.3",
    "Tire Temp Mid FL": "82.9",
    "Tire Temp Outer FL": "87.0",
    "Tire Temp Inner FR": "93.8",
    "Tire Temp Mid FR": "100.6",
    "Tire Temp Outer FR": "80.7",
    "Tire Temp Inner RL": "95.4",
    "Tire Temp Mid RL": "93.3",
    "Tire Temp Outer RL": "87.6",
    "Tire Temp Inner RR": "104.3",
    "Tire Temp Mid RR": "97.8",
    "Tire Temp Outer RR": "104.7",
    "Tire Wear FL": "8.6",
    "Tire Wear FR": "5.9",
    "Tire Wear RL": "0.4",
    "Tire Wear RR": "1.7",
    "Brake Temp Front": "798.0",
    "Brake Temp Rear": "382.2",
    "Brake Pressure Front": "80.2",
    "Brake Pressure Rear": "89.5",
    "Brake Bias": "59.6",
    "Oil Temp": "100.1",
    "Water Temp": "98.1",
    "Fuel Burn per Lap": "2.07",
    "Throttle Map": "Aggressive",
    "Engine Map Mode": "Safe",
    "ERS State of Charge": "62.8",
    "ERS Battery Temp": "49.8",
    "ERS Deploy Mode": "Medium",
    "Throttle %": "84.4",
    "Brake %": "4.0",
    "Steering Angle": "-39.9",
    "Steering Correction": "0.42",
    "Lap Delta": "-0.72"
}
  ]);

  const allSnapshotsAndFutures = [ ...allSnapshots, ...futureSnapshots ];

  const addSnapshot = (snap: TelemetrySnapshot) => {
    setAllSnapshots((val) => [...val, snap]);
  };

  const selectSnapshot = (index: number) => {
    setCurrentSnapshotIndex(index);
    setCurrentSnapshot(allSnapshotsAndFutures[index]);
  }

  const addFutureSnapshots = (snaps: TelemetrySnapshot[]) => {
    setFutureSnapshots((val) => [...val, ...snaps]);
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
        addFutureSnapshots,
        selectSnapshot,
        currentSnapshotIndex,
        allSnapshotsAndFutures,
      }}
    >
      {children}
    </SnapshotContext.Provider>
  );
}
