'use client'

import { useEffect } from "react";

export default function AnalyticsPage() {

  const fetchAnalytics = async() => {
    const res = await fetch('/api/analytics');
    const data = await res.json();

    console.log(data)
    return data;
  }

  useEffect(() => {
    fetchAnalytics();
  }, [])
  
  return (
    <p>AnalyticsPage</p>
  )
}