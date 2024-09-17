import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const shortCode = searchParams.get('shortCode');

    if (!shortCode) {
      return NextResponse.json({ error: 'Short code is required' }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json({ error: 'Failed to connect to database' }, { status: 500 });
    }
    const db = client.db('shortify');
    const collection = db.collection('urls');

    // Find the long URL by shortCode
    const urlDoc = await collection.findOne({ shortCode });

    if (!urlDoc) {
      return NextResponse.json({ error: 'Short URL not found' }, { status: 404 });
    }

    return NextResponse.json({ longUrl: urlDoc.longUrl }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving URL:', error);
    return NextResponse.json({ error: 'Failed to retrieve URL' }, { status: 500 });
  }
}
