import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shortCode } = req.query;

  if (!shortCode) {
    return res.status(400).json({ error: 'Short code is required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('shortify'); // Same DB as before
    const collection = db.collection('urls');

    // Find the longUrl by shortCode
    const result = await collection.findOne({ shortCode });

    if (!result) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.status(200).json({ longUrl: result.longUrl });
  } catch (error) {
    console.error('Error fetching URL:', error);
    res.status(500).json({ error: 'Failed to fetch URL' });
  }
}
