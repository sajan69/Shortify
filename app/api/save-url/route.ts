// app/api/save-url/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { saveUrlMapping } from '@/utils/fileStorage';

export async function POST(request: NextRequest) {
  try {
    const { shortCode, longUrl } = await request.json();

    if (!shortCode || !longUrl) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    saveUrlMapping(shortCode, longUrl);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save URL' }, { status: 500 });
  }
}
