import { readFile } from 'fs/promises';
import path from 'path';
import Papa from 'papaparse';
import { NextResponse } from 'next/server';
import { QUERY_PARAMS } from '@/app/config/constants';

const telemetryPath = path.join(process.cwd(), 'src', 'data', 'sample-telemetry.csv');

export async function GET(req: Request) {
  const url = new URL(req.url);
  const snapshotIndex = url.searchParams.get(QUERY_PARAMS.SNAPSHOT);
  const index = parseInt(snapshotIndex || '0', 10);

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