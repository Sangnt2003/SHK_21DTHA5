import { Db, MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

let client
export let db : Db | null = null;
let clientPromise: Promise<MongoClient>

const options = {}

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(process.env.MONGODB_URI, options)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(process.env.MONGODB_URI, options)
    clientPromise = client.connect()
  }


  export async function getDb(): Promise<Db> {
    if (db) return db;
  
    const client = await clientPromise;
    db = client.db(process.env.MONGODB_DB);
    return db;
  }