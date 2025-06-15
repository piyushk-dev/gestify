import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
if (!uri) throw new Error('Missing MONGODB_URI');

let cachedClient: MongoClient | null = null;

export async function connectToMongo() {
  if (cachedClient) return cachedClient;

  const client = new MongoClient(uri);
  await client.connect();

  cachedClient = client;
  return client;
}
