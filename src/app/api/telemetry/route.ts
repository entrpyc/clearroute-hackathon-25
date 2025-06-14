import { readFile } from 'fs/promises';
import path from 'path';
import Papa from 'papaparse';
import { NextResponse } from 'next/server';

let currentIndex = 0;

export async function GET() {
  const samplePath = path.join(process.cwd(), 'src', 'data', 'sample-telemetry.csv');
  const csv = await readFile(samplePath, 'utf8');

  const { data } = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  if (currentIndex >= data.length) {
    return NextResponse.json({ done: true });
  }

  const row = data[currentIndex];
  currentIndex++;

  return NextResponse.json({ row, index: currentIndex });
}