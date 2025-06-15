import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const dataset = body.dataset;

  if(!dataset) NextResponse.json({ error: 'Missing dataset' });

  const res = await fetch('https://google-adk-example.fabric-uk.clearroute.io/api/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      laps: dataset
    })
  })

  const parsedResponse = await res.json();

  if(!parsedResponse?.parsedResponse?.answer?.comment) NextResponse.json({ error: 'No data'})

  return NextResponse.json({
    suggestions: [{
      text: parsedResponse.answer.comment,
      snapshot: dataset.length - 1
    }],
    futures: parsedResponse.answer.next_laps
  });
}