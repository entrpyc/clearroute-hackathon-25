import SnapshotProvider from '../context/snapshot-provider'
import StrategyProvider from '../context/strategy-provider'
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SnapshotProvider>
      <StrategyProvider>
        {children}
      </StrategyProvider>
    </SnapshotProvider>
  )
}