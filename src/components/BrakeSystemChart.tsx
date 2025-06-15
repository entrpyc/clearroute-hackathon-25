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

export default function BrakeSystemChart({ data }: Props) {
  const formattedData = data.map((d) => ({
    lap: parseInt(d[TelemetryKeys.LAP], 10) || 0,

    tempFront: parseFloat(d[TelemetryKeys.BRAKE_TEMP_FRONT]) || 0,
    tempRear: parseFloat(d[TelemetryKeys.BRAKE_TEMP_REAR]) || 0,

    pressureFront: parseFloat(d[TelemetryKeys.BRAKE_PRESSURE_FRONT]) || 0,
    pressureRear: parseFloat(d[TelemetryKeys.BRAKE_PRESSURE_REAR]) || 0,

    brakeBias: parseFloat(d[TelemetryKeys.BRAKE_BIAS]) || 0,
  }));

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Brake System Trends</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="lap" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Temperatures */}
            <Line type="monotone" dataKey="tempFront" stroke="#f97316" name="Front Temp (°C)" />
            <Line type="monotone" dataKey="tempRear" stroke="#3b82f6" name="Rear Temp (°C)" />

            {/* Pressures */}
            <Line type="monotone" dataKey="pressureFront" stroke="#f43f5e" name="Front Pressure" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="pressureRear" stroke="#10b981" name="Rear Pressure" strokeDasharray="5 5" />

            {/* Bias */}
            <Line type="monotone" dataKey="brakeBias" stroke="#a855f7" name="Brake Bias (%)" strokeDasharray="2 2" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
