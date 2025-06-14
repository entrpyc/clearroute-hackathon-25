// app/api/stream/route.ts
import { readFile, writeFile, appendFile } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import Papa from 'papaparse';
import { NextResponse } from 'next/server';

const getSamplePath = () => path.join(process.cwd(), 'src', 'data', 'sample-telemetry.csv');
const getTelemetryPath = () => path.join(process.cwd(), 'src', 'data', 'telemetry.csv');

let index = 0;

export async function GET() {
  const samplePath = getSamplePath();
  const targetPath = getTelemetryPath();

  // Read and parse sample telemetry
  const sampleCsv = await readFile(samplePath, 'utf8');
  const { data, meta } = Papa.parse(sampleCsv, {
    header: true,
    skipEmptyLines: true,
  });

  const headers = meta.fields!;
  
  // Get current index

  if (index >= data.length) {
    return NextResponse.json({ done: true, message: 'All rows appended' });
  }

  const nextRow = data[index];
  const csvLine = Papa.unparse([nextRow], { header: false }) + '\n';

  // If first row, write headers too
  if (index === 0 || !existsSync(targetPath)) {
    const headerLine = Papa.unparse([headers.reduce((acc, h) => {
      acc[h] = h;
      return acc;
    }, {} as Record<string, string>)], { header: false }) + '\n';
    await writeFile(targetPath, headerLine + csvLine, 'utf8');
  } else {
    await appendFile(targetPath, csvLine, 'utf8');
  }

  // Save new index
  index++;

  return NextResponse.json({ added: nextRow, index });
}
