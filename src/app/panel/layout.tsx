import AiStrategyProvider from '../context/aiStrategy-provider'
import SnapshotProvider from '../context/snapshot-provider'
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SnapshotProvider>
      <AiStrategyProvider>
        {children}
      </AiStrategyProvider>
    </SnapshotProvider>
  )
}