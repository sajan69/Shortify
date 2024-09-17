import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { shortCode, longUrl } = await req.json();

    if (!shortCode || !longUrl) {
      return NextResponse.json({ error: 'Short code and long URL are required' }, { status: 400 });
    }

    // Connect to MongoDB and get the client
    const client = await clientPromise;
    const db = client.db('shortify'); // Specify the correct DB name
    const collection = db.collection('urls');

    // Insert the short code and long URL into the database
    await collection.insertOne({ shortCode, longUrl });

    return NextResponse.json({ message: 'URL saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving URL:', error);
    return NextResponse.json({ error: 'Failed to save URL' }, { status: 500 });
  }
}
