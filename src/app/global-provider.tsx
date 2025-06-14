'use client'
 
import { createContext } from 'react'
 
export const GlobalContext = createContext({})
 
export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <GlobalContext.Provider value="dark">{children}</GlobalContext.Provider>
}