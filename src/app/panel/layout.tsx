'use client';

import { useEffect } from 'react';
import { API_ROUTES, TELEMETRY_FETCH_INTERVAL } from '../config/constants';

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(API_ROUTES.TELEMETRY_STREAM)
        .then(res => res.json())
        .then(data => {
          if (data.done) {
            console.log('Stream complete');
            clearInterval(interval);
          } else {
            console.log(`Row ${data.index} streamed`);
          }
        })
        .catch(console.error);
    }, TELEMETRY_FETCH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return children;
}
