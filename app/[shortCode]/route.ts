import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: Request, { params }: { params: { shortCode: string } }) {
  try {
    const { shortCode } = params;

    if (!shortCode) {
      return NextResponse.json({ error: 'Short code is required' }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json({ error: 'Failed to connect to the database' }, { status: 500 });
    }
    const db = client.db('shortify');
    const collection = db.collection('urls');

    // Find the long URL by shortCode
    const urlDoc = await collection.findOne({ shortCode });

    if (!urlDoc || !urlDoc.longUrl) {
      return NextResponse.redirect(new URL('/404', req.url));
    }

    const longUrl = urlDoc.longUrl;

    // Ensure that the long URL is valid and absolute
    if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
      return NextResponse.json({ error: 'Malformed URL' }, { status: 400 });
    }

    // Redirect to the long URL
    return NextResponse.redirect(longUrl);

  } catch (error) {
    console.error('Error during URL redirection:', error);
    return NextResponse.json({ error: 'Failed to redirect to the URL' }, { status: 500 });
  }
}
