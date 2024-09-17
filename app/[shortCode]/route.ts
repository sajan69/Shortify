// app/[shortCode]/route.ts
import { NextResponse } from 'next/server';
import { getLongUrl } from '@/utils/fileStorage';

export async function GET(request: Request, { params }: { params: { shortCode: string } }) {
  const { shortCode } = params;
  const longUrl = getLongUrl(shortCode);

  if (longUrl) {
    return NextResponse.redirect(longUrl);
  } else {
    return NextResponse.redirect('/404'); // Redirect to a 404 page if URL not found
  }
}
