"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts"
import { TrendingUp } from "lucide-react"

const strategyData = [
  { lap: 1, tireLife: 100, fuelLoad: 100, lapTime: 92.5 },
  { lap: 5, tireLife: 95, fuelLoad: 92, lapTime: 91.8 },
  { lap: 10, tireLife: 88, fuelLoad: 82, lapTime: 91.2 },
  { lap: 15, tireLife: 78, fuelLoad: 70, lapTime: 90.8 },
  { lap: 20, tireLife: 65, fuelLoad: 55, lapTime: 90.9 },
  { lap: 25, tireLife: 48, fuelLoad: 38, lapTime: 91.5 },
  { lap: 28, tireLife: 35, fuelLoad: 28, lapTime: 92.2 },
  { lap: 30, tireLife: 100, fuelLoad: 20, lapTime: 89.5 }, // Pit stop
  { lap: 35, tireLife: 92, fuelLoad: 8, lapTime: 89.8 },
  { lap: 40, tireLife: 82, fuelLoad: 0, lapTime: 90.2 },
]

export function PitStrategyChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Strategy Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            tireLife: {
              label: "Tire Life %",
              color: "hsl(var(--chart-1))",
            },
            lapTime: {
              label: "Lap Time (s)",
              color: "hsl(var(--chart-2))",
            },
            fuelLoad: {
              label: "Fuel Load %",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={strategyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="lap" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="tireLife"
                stroke="var(--color-tireLife)"
                strokeWidth={2}
                name="Tire Life %"
              />
              <Line type="monotone" dataKey="lapTime" stroke="var(--color-lapTime)" strokeWidth={2} name="Lap Time" />
              <Line
                type="monotone"
                dataKey="fuelLoad"
                stroke="var(--color-fuelLoad)"
                strokeWidth={2}
                name="Fuel Load %"
              />
              <ReferenceLine x={28} stroke="#ef4444" strokeDasharray="5 5" label="Recommended Pit" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
