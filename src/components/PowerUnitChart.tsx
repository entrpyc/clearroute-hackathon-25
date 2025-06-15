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

export default function PowerUnitChart({ data }: Props) {
  const formattedData = data.map((d) => ({
    lap: parseInt(d[TelemetryKeys.LAP], 10) || 0,

    oilTemp: parseFloat(d[TelemetryKeys.OIL_TEMP]) || 0,
    waterTemp: parseFloat(d[TelemetryKeys.WATER_TEMP]) || 0,

    fuelBurn: parseFloat(d[TelemetryKeys.FUEL_BURN_PER_LAP]) || 0,

    ersSOC: parseFloat(d[TelemetryKeys.ERS_STATE_OF_CHARGE]) || 0,
    ersTemp: parseFloat(d[TelemetryKeys.ERS_BATTERY_TEMP]) || 0,
  }));

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Power Unit Trends</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="lap" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Engine Temps */}
            <Line type="monotone" dataKey="oilTemp" stroke="#f59e0b" name="Oil Temp (°C)" />
            <Line type="monotone" dataKey="waterTemp" stroke="#60a5fa" name="Water Temp (°C)" />

            {/* Fuel */}
            <Line type="monotone" dataKey="fuelBurn" stroke="#10b981" name="Fuel Burn/Lap" strokeDasharray="5 5" />

            {/* ERS */}
            <Line type="monotone" dataKey="ersSOC" stroke="#a855f7" name="ERS SoC (%)" />
            <Line type="monotone" dataKey="ersTemp" stroke="#f43f5e" name="ERS Temp (°C)" strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
