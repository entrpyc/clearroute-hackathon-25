'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'


const tabs = [
  { label: 'Dashboard', path: '/panel/asen' },
  { label: 'Statistics', path: '/dashboard/statistics' },
  { label: 'Diagrams', path: '/dashboard/diagrams' },
  { label: 'Track', path: '/dashboard/track' },  
]

export function DashboardNav() {
  const router = useRouter()
  const pathname = usePathname()
  const [activePath, setActivePath] = useState(pathname)

  useEffect(() => {
    setActivePath(pathname)
  }, [pathname])

  const handleTabClick = (path: string) => {
    setActivePath(path)
    router.push(path)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2 bg-background/80 p-2 rounded-lg shadow-lg border">
      {tabs.map(({ label, path }) => (
        <button
          key={label}
          onClick={() => handleTabClick(path)}
          className={`px-3 py-1 rounded text-sm cursor-pointer hover:bg-muted/50 hover:text-muted-foreground ${
            activePath === path ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
