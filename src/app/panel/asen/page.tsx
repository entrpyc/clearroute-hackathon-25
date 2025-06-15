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
import TireTemperatureChartCard from "@/components/TireTemperatureChartCard";
import { TelemetrySnapshot } from "@/app/config/types";

const suggestions = [
  { id: 1, text: "Reduce brake bias for turn 4." },
  { id: 2, text: "Try aggressive ERS mode in sector 2." },
];

const anomalies = [
  { id: 1, text: "Rear right tire overheating (104.7°C)." },
  { id: 2, text: "ERS battery temperature above threshold." },
];

export default function DashboardLayout() {
  const { addSnapshot, selectSnapshot, allSnapshots, currentSnapshot } = useSnapshotData();

  useTelemetryStream({
    onSnap: (snap: TelemetrySnapshot) => addSnapshot(snap),
  });

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Main 2-Column Grid */}
      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        {/* LEFT GRID */}
        <div className="flex flex-col flex-1 gap-4 overflow-hidden">
          {/* Statistics Card */}
          <Card className="flex-1 overflow-auto min-h-[200px]">
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 overflow-y-auto">
              <TelemetrySnapshotDisplay telemetryGroups={buildTelemetryGroups(currentSnapshot)} />
            </CardContent>
          </Card>

          {/* Diagrams Grid */}
          <Card className="flex-1 overflow-auto min-h-[200px]">
            <CardHeader>
              <CardTitle>Diagrams</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <TireTemperatureChartCard />

              {/* Add more charts as needed */}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT GRID */}
        <div className="flex flex-col w-[30%] min-w-[300px] gap-4 overflow-hidden">
          {/* AI Strategies: Suggestions + Anomalies */}
          <Card className="flex-1 overflow-auto">
            <CardHeader>
              <CardTitle>AI Strategies</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 overflow-y-auto">
              <div>
                <h3 className="text-sm font-semibold mb-1">Suggestions</h3>
                <div className="space-y-2">
                  {suggestions.map((s) => (
                    <div key={s.id} className="p-2 bg-muted rounded text-sm">
                      ⚡ {s.text}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">Anomalies</h3>
                <div className="space-y-2">
                  {anomalies.map((a) => (
                    <div key={a.id} className="p-2 bg-destructive/10 border border-destructive rounded text-sm text-destructive">
                      ⚠️ {a.text}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Chat Agent */}
          <Card className="flex flex-col h-[300px] overflow-hidden">
            <CardHeader>
              <CardTitle>AI Chat Agent</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-2">
              {/* Chat messages */}
            </CardContent>
            <div className="border-t p-2">
              <input
                placeholder="Type a message"
                className="w-full border rounded px-3 py-1 text-sm"
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Timeline + Navigation */}
      <div className="p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Timeline aligned to the left */}
          <div className="flex-1 overflow-x-auto">
            <SnapshotTimeline
              total={allSnapshots.length}
              onSelect={(index) => selectSnapshot(index)}
            />
          </div>

          {/* Navigation aligned to the right */}
          <div className="flex gap-2 shrink-0">
            {['Live', 'Dashboard', 'Statistics', 'Diagrams', 'AI Agent'].map((label) => (
              <button key={label} className="px-3 py-1 rounded bg-muted text-sm">
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

