'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TelemetryKeys } from '@/app/config/constants';
import { TelemetrySnapshot } from '@/app/config/types';

interface Props {
  data: TelemetrySnapshot[];
}

export default function DriverInputChart({ data }: Props) {
  const formattedData = data.map((d) => ({
    lap: parseInt(d[TelemetryKeys.LAP], 10) || 0,
    throttle: parseFloat(d[TelemetryKeys.THROTTLE_PERCENT]) || 0,
    brake: parseFloat(d[TelemetryKeys.BRAKE_PERCENT]) || 0,
    steering: parseFloat(d[TelemetryKeys.STEERING_ANGLE]) || 0,
    correction: parseFloat(d[TelemetryKeys.STEERING_CORRECTION]) || 0,
  }));

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Driver Input Trends</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="lap" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="throttle" stroke="#22c55e" name="Throttle (%)" />
            <Line type="monotone" dataKey="brake" stroke="#ef4444" name="Brake (%)" />
            <Line type="monotone" dataKey="steering" stroke="#3b82f6" name="Steering Angle (°)" />
            <Line type="monotone" dataKey="correction" stroke="#a855f7" name="Steering Correction" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
