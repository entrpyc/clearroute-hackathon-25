import { readFile } from 'fs/promises';
import path from 'path';
import Papa from 'papaparse';
import { NextResponse } from 'next/server';

const telemetryPath = path.join(process.cwd(), 'src', 'data', 'sample-telemetry.csv');

export async function POST(req: Request) {
  const body = await req.json();
  const index = parseInt(body.snapshot || '0', 10);

  const csv = await readFile(telemetryPath, 'utf8');

  const { data } = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  if (index >= data.length) {
    return NextResponse.json({ done: true });
  }

  const snapshot = data[index];

  return NextResponse.json({ snapshot });
}