'use client'
import { TABS } from '@/app/config/constants'

export function DashboardNav({ activePath, setActivePath }: { activePath: any, setActivePath: any }) {
  const handleTabClick = (label: string) => {
    setActivePath(label)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2 bg-background/80 p-2 rounded-lg shadow-lg border">
      {TABS.map(({ label }) => (
        <button
          key={label}
          onClick={() => handleTabClick(label)}
          className={`px-3 py-1 rounded text-sm cursor-pointer hover:bg-muted/50 hover:text-muted-foreground ${
            activePath === label ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
