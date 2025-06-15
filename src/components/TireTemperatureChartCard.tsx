import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Example data: each item is a lap or time tick
const data = [
  { lap: 1, FL: 82, FR: 83, RL: 79, RR: 80 },
  { lap: 2, FL: 84, FR: 85, RL: 80, RR: 81 },
  { lap: 3, FL: 85, FR: 87, RL: 81, RR: 82 },
  { lap: 4, FL: 86, FR: 88, RL: 83, RR: 84 },
]

export default function TireTemperatureChartCard() {
  return (
    <Card className="w-full h-[250px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Tire Temp - FL/FR/RL/RR</CardTitle>
      </CardHeader>
      <CardContent className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="lap" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} domain={[75, 95]} unit="°C" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="FL" stroke="#3b82f6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="FR" stroke="#10b981" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="RL" stroke="#f59e0b" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="RR" stroke="#ef4444" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
