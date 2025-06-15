'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TelemetryKeys } from '@/app/config/constants';
import { TelemetrySnapshot } from '@/app/config/types';

interface Props {
  data: TelemetrySnapshot[];
}

export default function PaceTrendsChart({ data }: Props) {
  const formattedData = data.map((d) => ({
    lap: parseInt(d[TelemetryKeys.LAP], 10) || 0,
    lapTime: parseFloat(d[TelemetryKeys.LAP_TIME]) || 0,
    lapDelta: parseFloat(d[TelemetryKeys.LAP_DELTA]) || 0,
    topSpeed: parseFloat(d[TelemetryKeys.TOP_SPEED_KMH]) || 0,
  }));

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Pace & Timing Trends</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="lap" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="lapTime" stroke="#8884d8" name="Lap Time (s)" />
            <Line type="monotone" dataKey="lapDelta" stroke="#82ca9d" name="Lap Delta (s)" />
            <Line type="monotone" dataKey="topSpeed" stroke="#ffc658" name="Top Speed (km/h)" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
