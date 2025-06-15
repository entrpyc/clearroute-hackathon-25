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

export default function FuelEfficiencyChart({ data }: Props) {
  const formattedData = data.map((d) => ({
    lap: parseInt(d[TelemetryKeys.LAP], 10) || 0,

    fuelLevel: parseFloat(d[TelemetryKeys.FUEL_LEVEL_PERCENT]) || 0,
    fuelBurn: parseFloat(d[TelemetryKeys.FUEL_BURN_PER_LAP]) || 0,

    lapTime: parseFloat(d[TelemetryKeys.LAP_TIME]) || 0,
    lapDelta: parseFloat(d[TelemetryKeys.LAP_DELTA]) || 0,
  }));

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Fuel & Efficiency Trends</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="lap" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Fuel */}
            <Line type="monotone" dataKey="fuelLevel" stroke="#3b82f6" name="Fuel Level (%)" />
            <Line type="monotone" dataKey="fuelBurn" stroke="#10b981" name="Fuel Burn/Lap" />

            {/* Efficiency vs Pace */}
            <Line type="monotone" dataKey="lapTime" stroke="#a78bfa" name="Lap Time (s)" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="lapDelta" stroke="#f43f5e" name="Lap Delta (s)" strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
