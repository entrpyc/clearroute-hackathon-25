'use client'
import { usePathname, useRouter } from 'next/navigation'

const tabs = [
  { label: 'Dashboard', path: '/panel/asen' },
  { label: 'Live', path: '/dashboard/live' },  
  { label: 'Statistics', path: '/dashboard/statistics' },
  { label: 'Diagrams', path: '/dashboard/diagrams' },
  { label: 'AI Agent', path: '/dashboard/ai-agent' },
]

export function DashboardNav() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2 bg-background/80 p-2 rounded-lg shadow-lg border">
      {tabs.map(({ label, path }) => (
        <button
          key={label}
          onClick={() => router.push(path)}
          className={`px-3 py-1 rounded text-sm cursor-pointer hover:bg-muted/50 ${
            pathname === path ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
