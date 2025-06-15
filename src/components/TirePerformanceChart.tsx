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

export default function TirePerformanceChart({ data }: Props) {
  const formattedData = data.map((d) => ({
    lap: parseInt(d[TelemetryKeys.LAP], 10) || 0,

    // Tire Wear (%)
    wearFL: parseFloat(d[TelemetryKeys.TIRE_WEAR_FL]) || 0,
    wearFR: parseFloat(d[TelemetryKeys.TIRE_WEAR_FR]) || 0,
    wearRL: parseFloat(d[TelemetryKeys.TIRE_WEAR_RL]) || 0,
    wearRR: parseFloat(d[TelemetryKeys.TIRE_WEAR_RR]) || 0,

    // Tire Pressure (PSI)
    pressureFL: parseFloat(d[TelemetryKeys.TIRE_PRESSURE_FL]) || 0,
    pressureFR: parseFloat(d[TelemetryKeys.TIRE_PRESSURE_FR]) || 0,
    pressureRL: parseFloat(d[TelemetryKeys.TIRE_PRESSURE_RL]) || 0,
    pressureRR: parseFloat(d[TelemetryKeys.TIRE_PRESSURE_RR]) || 0,
  }));

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Tire Performance Trends</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="lap" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Wear */}
            <Line type="monotone" dataKey="wearFL" stroke="#f87171" name="Wear FL (%)" />
            <Line type="monotone" dataKey="wearFR" stroke="#fb923c" name="Wear FR (%)" />
            <Line type="monotone" dataKey="wearRL" stroke="#60a5fa" name="Wear RL (%)" />
            <Line type="monotone" dataKey="wearRR" stroke="#34d399" name="Wear RR (%)" />

            {/* Pressure */}
            <Line type="monotone" dataKey="pressureFL" stroke="#f43f5e" name="Pressure FL (PSI)" dot={false} strokeDasharray="5 5" />
            <Line type="monotone" dataKey="pressureFR" stroke="#f97316" name="Pressure FR (PSI)" dot={false} strokeDasharray="5 5" />
            <Line type="monotone" dataKey="pressureRL" stroke="#3b82f6" name="Pressure RL (PSI)" dot={false} strokeDasharray="5 5" />
            <Line type="monotone" dataKey="pressureRR" stroke="#10b981" name="Pressure RR (PSI)" dot={false} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
