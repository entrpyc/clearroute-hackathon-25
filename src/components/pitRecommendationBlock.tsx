'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import { FC } from "react"

interface PitRecommendation {
  recommendedLap: number
  reason: string
  confidence: number
  alternatives: Array<{
    lap: number
    reason: string
    risk: "low" | "medium" | "high"
  }>
  currentLap: number
}

interface Props {
  recommendation: PitRecommendation
}

export const PitRecommendationBox: FC<Props> = ({ recommendation }) => {
  const lapsToGo = recommendation.recommendedLap - recommendation.currentLap

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Pit Strategy Recommendation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-green-600">
            Lap {recommendation.recommendedLap}
          </div>
          <div className="text-sm text-muted-foreground">
            {lapsToGo > 0 ? `${lapsToGo} laps to go` : "Pit window active"}
          </div>
          <Badge variant="outline" className="text-xs">
            {recommendation.confidence}% confidence
          </Badge>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Primary Reason</h4>
          <p className="text-sm text-muted-foreground">{recommendation.reason}</p>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Alternative Strategies</h4>
          {recommendation.alternatives.map((alt, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Lap {alt.lap}</span>
                  <Badge
                    variant={alt.risk === "low" ? "default" : alt.risk === "medium" ? "secondary" : "destructive"}
                    className="text-xs"
                  >
                    {alt.risk} risk
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{alt.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
