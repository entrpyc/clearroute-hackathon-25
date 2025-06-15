'use client';

import useSnapshotData from "@/app/hooks/useSnapshotData";
import useTelemetryStream from "@/app/hooks/useTelemetryStream";
import SnapshotTimeline from "@/components/SnapshotTimeline";
import TelemetrySnapshotDisplay from "@/components/TelemetrySnapshotDisplay";
import { buildTelemetryGroups } from "@/lib/telemetry/buildTelemetryGroups";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TelemetrySnapshot } from "@/app/config/types";
import { DashboardNav } from '@/components/DashboardNav';
import useStrategyData from "@/app/hooks/useStrategyData";
import PaceTrendsChart from "@/components/PaceTrendsChart";
import TirePerformanceChart from "@/components/TirePerformanceChart";
import DriverInputChart from "@/components/DriverInputChart";
import FuelEfficiencyChart from "@/components/FuelEfficiencyChart";
import PowerUnitChart from "@/components/PowerUnitChart";
import BrakeSystemChart from "@/components/BrakeSystemChart";
import { useEffect, useState } from "react";
import { TABS, TELEMETRY_STREAM_INTERVAL } from "@/app/config/constants";
import { getFuture } from "@/services/getFuture";
import Track from "@/components/Track";

export default function DashboardLayout() {
  const {
    addSnapshot,
    selectSnapshot,
    allSnapshots,
    currentSnapshot,
    currentSnapshotIndex,
    futureSnapshots,
    allSnapshotsAndFutures,
    addFutureSnapshots,
  } = useSnapshotData();
  const { addSuggestions, suggestions } = useStrategyData();
  const [activePath, setActivePath] = useState(TABS[0].label);



  const snapshotChunk = allSnapshotsAndFutures.slice(0, currentSnapshotIndex + 1);

  const { readTelemetryStream } = useTelemetryStream({
    onSnap: async (snap: TelemetrySnapshot) => {
      addSnapshot(snap);
    },
  });

  useEffect(() => {
    readTelemetryStream();

    const interval = setInterval(readTelemetryStream, TELEMETRY_STREAM_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const fetchSuggestions = async () => {
    const response = await getFuture(allSnapshots);

    const {
      suggestions: futureSuggestions,
      futures
    } = response || {}

    if(futureSuggestions) addSuggestions(futureSuggestions);
    if(futures) addFutureSnapshots(futures)
  }

  useEffect(() => {
    fetchSuggestions(); // initial fetch

    const interval = setInterval(() => {
      fetchSuggestions();
    }, 10_000); // every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Main 2-Column Grid */}
      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        {/* LEFT GRID */}
        {(activePath === TABS[1].label || activePath === TABS[0].label || activePath === TABS[2].label) && <div className="flex flex-col flex-1 gap-4 overflow-hidden">
          {/* Statistics Card */}
          {(activePath === TABS[1].label || activePath === TABS[0].label) && (
            <Card className="flex-1 overflow-auto min-h-[200px]">
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 overflow-y-auto">
                <TelemetrySnapshotDisplay telemetryGroups={buildTelemetryGroups(currentSnapshot)} />
              </CardContent>
            </Card>
          )}

          {(activePath === TABS[2].label || activePath === TABS[0].label) && (
            <Card className="flex-1 overflow-auto min-h-[200px]">
              <CardHeader>
                <CardTitle>Diagrams</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <PaceTrendsChart data={snapshotChunk} />
                <TirePerformanceChart data={snapshotChunk} />
                <BrakeSystemChart data={snapshotChunk} />
                <PowerUnitChart data={snapshotChunk} />
                <FuelEfficiencyChart data={snapshotChunk} />
                <DriverInputChart data={snapshotChunk} />
              </CardContent>
            </Card>
          )}

          {/* Diagrams Grid */}
          
        </div>}

        {/* RIGHT GRID */}
        {(activePath === TABS[3].label || activePath === TABS[0].label) && <div className={`flex flex-col ${activePath !== TABS[3].label && 'w-[30%]'} min-w-[300px] gap-4 overflow-hidden`}>
          {/* AI Strategies: Suggestions + Anomalies */}
          {(activePath === TABS[3].label || activePath === TABS[0].label) && (
            <Card className="flex-1 overflow-hidden">
              <CardHeader>
                <CardTitle>AI Strategies</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 flex-1 overflow-hidden">
                <div className="flex flex-col flex-1 overflow-hidden">
                  <h3 className="text-sm font-semibold mb-1">Suggestions</h3>
                  <div className="space-y-2 overflow-y-auto flex-1 pr-2">
                    {suggestions.map(({ snapshot, text }, i) => (
                      i <= currentSnapshotIndex && (
                        <div key={i} className="p-2 bg-muted rounded text-sm">
                          ⚡ {text} Lap: {snapshot}
                        </div>
                      )
                    ))}
                  </div>
                </div>

                {/* <div className="flex flex-col flex-1 overflow-hidden">
                  <h3 className="text-sm font-semibold mb-1">Anomalies</h3>
                  <div className="space-y-2 overflow-y-auto flex-1 pr-2">
                    {anomalies.map(({ snapshot, text }, i) => (
                      i <= currentSnapshotIndex && (
                        <div
                          key={i}
                          className="p-2 bg-destructive/10 border border-destructive rounded text-sm text-destructive"
                        >
                          ⚠️ {text} Lap: {snapshot}
                        </div>
                      )
                    ))}
                  </div>
                </div> */}
              </CardContent>
            </Card>
          )}
        </div>}
      </div>

      {(activePath === TABS[4].label) && (
        <Track />
      )}

      {/* Timeline + Navigation */}
      <div className="p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Timeline aligned to the left */}
          <div className="flex-1 overflow-x-auto">
            <SnapshotTimeline
              futures={futureSnapshots.length}
              total={allSnapshots.length}
              onSelect={(index) => selectSnapshot(index)}
            />
          </div>

          {/* Navigation aligned to the right */}
          <div className="flex gap-2 shrink-0">
            {/* {['Live', 'Dashboard', 'Statistics', 'Diagrams', 'AI Agent'].map((label) => (
              <button key={label} className="px-3 py-1 rounded bg-muted text-sm">
                {label}
              </button>
            ))} */}
            <DashboardNav activePath={activePath} setActivePath={setActivePath} />
          </div>
        </div>
      </div>
    </div>
  );
}

