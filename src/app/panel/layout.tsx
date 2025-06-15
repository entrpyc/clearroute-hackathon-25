import SnapshotProvider from './snapshot-provider'
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SnapshotProvider>{children}</SnapshotProvider>
  )
}