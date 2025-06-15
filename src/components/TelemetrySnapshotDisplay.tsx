'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buildTelemetryGroups } from '@/lib/telemetry/buildTelemetryGroups'

export default function TelemetrySnapshotDisplay({
  telemetryGroups,
}: {
  telemetryGroups: ReturnType<typeof buildTelemetryGroups>
}) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {Object.entries(telemetryGroups).map(([groupKey, groupData]) => (
        <Card key={groupKey}>
          <CardHeader>
            <CardTitle className="capitalize">{groupKey.replace(/([A-Z])/g, ' $1')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(groupData).map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between items-center border rounded-md p-2 text-sm"
                >
                  <span className="text-muted-foreground">{label}</span>
                  <Badge variant="outline">{value || '-'}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
