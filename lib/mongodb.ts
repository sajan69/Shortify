import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string; // Use your MongoDB URI
const options = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (!client) {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
