import { NextResponse } from 'next/server';

import sample from './data.json';


export async function POST(req: Request) {
  const body = await req.json();
  const dataset = body.dataset;

  if(!dataset) NextResponse.json({ error: 'Missing dataset' });

  // send to AI agent
  const res = await fetch('https://google-adk-example.fabric-uk.clearroute.io/api/ai-analysis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      laps: sample
    })
  })
  const parsedResponse = await res.json();
  console.log(parsedResponse)

  // mock response
  const strategy = {
    test: parsedResponse,
    suggestions: [
      {
        text: 'Reduce brake bias for turn 4.',
        snapshot: dataset.length - 1
      }
    ],
    anomalies: [
      {
        text: 'Rear right tire overheating (104.7°C).',
        snapshot: dataset.length - 1
      }
    ]
  }

  return NextResponse.json({ strategy });
}