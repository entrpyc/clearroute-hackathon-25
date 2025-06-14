import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import Papa from 'papaparse';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'telemetry.csv');
  const fileContent = await readFile(filePath, 'utf8');

  const parsed = Papa.parse(fileContent, { header: true, skipEmptyLines: true });

  return NextResponse.json(parsed.data);
}