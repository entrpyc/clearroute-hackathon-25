import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  const body = await req.json();
  const dataset = body.dataset;

  if(!dataset) NextResponse.json({ error: 'Missing dataset' });

  // send to AI agent

  // mock response
  const strategy = {
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