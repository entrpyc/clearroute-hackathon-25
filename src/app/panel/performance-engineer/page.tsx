'use client';

import { TelemetryKeys } from '@/app/config/constants';
import useTelemetrySnapshot from "@/app/hooks/useTelemetrySnapshot";
import useTelemetryStream from "@/app/hooks/useTelemetryStream";
import { PitRecommendationBox } from '@/components/pitRecommendationBlock';
import { useEffect, useRef, useState } from "react";
import { toast } from 'sonner';

interface PitAlternative {
  lap: number
  reason: string
  risk: 'low' | 'medium' | 'high'
}

interface PitRecommendation {
  recommendedLap: number
  reason: string
  confidence: number
  currentLap: number
  alternatives: PitAlternative[]
}

export default function PerformanceEngineerPage() {

  const { snapshot: liveSnap } = useTelemetryStream()
  const { snapshot: histSnap } = useTelemetrySnapshot(4)
  console.log(liveSnap)
  

  const [recommendation, setRecommendation] = useState<PitRecommendation>({
    recommendedLap: 0,
    reason: '',
    confidence: 0,
    currentLap: 0,
    alternatives: [],
  })

  const hasToasted = useRef(false)

  useEffect(() => {
    if (!liveSnap || !liveSnap[TelemetryKeys.LAP]) return
    console.log(liveSnap)

    const currentLap = Number(liveSnap[TelemetryKeys.LAP])
    const tireWearAvg =
      (Number(liveSnap[TelemetryKeys.TIRE_WEAR_FL]) +
        Number(liveSnap[TelemetryKeys.TIRE_WEAR_FR]) +
        Number(liveSnap[TelemetryKeys.TIRE_WEAR_RL]) +
        Number(liveSnap[TelemetryKeys.TIRE_WEAR_RR])) /
      4

    const fuelLevel = Number(liveSnap[TelemetryKeys.FUEL_LEVEL_PERCENT])
    const ersCharge = Number(liveSnap[TelemetryKeys.ERS_STATE_OF_CHARGE])

    let recommendedLap = currentLap + 3
    let reason = 'Normal degradation window'
    let confidence = 80

    if (tireWearAvg > 8 || fuelLevel < 20 || ersCharge < 30) {
      recommendedLap = currentLap + 1
      reason = 'High wear or low resources'
      confidence = 90
    }

    const alternatives: PitAlternative[] = [
      { lap: currentLap + 2, reason: 'Cover undercut', risk: 'medium' },
      { lap: currentLap + 4, reason: 'Extend tire life', risk: 'high' },
      { lap: currentLap + 5, reason: 'React to safety car', risk: 'low' },
    ]

    setRecommendation({
      recommendedLap,
      reason,
      confidence,
      currentLap,
      alternatives,
    })
  }, [liveSnap])

  useEffect(() => {
    if (
      recommendation.currentLap === recommendation.recommendedLap &&
      !hasToasted.current
    ) {
      toast('📣 PIT WINDOW OPEN', {
        description: `Lap ${recommendation.currentLap}: Box now!`,
        action: {
          label: 'Confirm',
          onClick: () => console.log('Acknowledged'),
        },
      })
      hasToasted.current = true
    }
    if (recommendation.currentLap < recommendation.recommendedLap) {
      hasToasted.current = false
    }
  }, [recommendation.currentLap, recommendation.recommendedLap])

  // useEffect(() => {
  //   console.log(snapshot)
  // }, [snapshot])

  // useEffect(() => {
  //   console.log(timestampSnap)
  // }, [timestampSnap])

  return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <header className="text-center space-y-2">
            <h1 className="text-3xl font-bold">🚦 Pit Stop Optimizer</h1>
            <p className="text-gray-600">Real-time F1 strategy dashboard</p>
          </header>
  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live Recommendation */}
            <PitRecommendationBox recommendation={recommendation} />
  
            {/* Historical Snapshot (optional display) */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Telemetry 4 Ticks Ago</h2>
              <pre className="bg-white p-4 rounded shadow text-xs overflow-auto">
                {JSON.stringify(histSnap, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    )
}
