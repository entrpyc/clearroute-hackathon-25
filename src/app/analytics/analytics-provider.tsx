'use client'
 
import { createContext } from 'react'
 
export const AnalyticsContext = createContext({})
 
export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <AnalyticsContext.Provider value="dark">{children}</AnalyticsContext.Provider>
}