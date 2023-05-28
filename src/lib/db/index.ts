import '@/node-only'

// Adapted from https://github.com/vercel/next.js/blob/1a9b4b9a9b8391d4c57480aea4787e7d83e027b7/examples/with-mongodb/lib/mongodb.ts
// License: MIT (https://github.com/vercel/next.js/blob/b2e9431bb46563264d450b1707dc0d9cdaf70d26/license.md)
import { MongoClient, MongoClientOptions, ServerApiVersion } from 'mongodb'

import { isDevelopment } from '@/lib/utils/server'

declare global {
	// eslint-disable-next-line no-var
	var _mongoClientPromise: Promise<MongoClient>
}

const { MONGODB_URI: uri } = process.env
if (!uri) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const options: MongoClientOptions = {
	serverApi: ServerApiVersion.v1,
}

let client
let clientPromise: Promise<MongoClient>

if (isDevelopment()) {
	// In development mode, use a global variable so that the value
	// is preserved across module reloads caused by HMR (Hot Module Replacement).
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options)
		global._mongoClientPromise = client.connect()
	}
	clientPromise = global._mongoClientPromise
} else {
	// In production mode, it's best to not use a global variable.
	client = new MongoClient(uri, options)
	clientPromise = client.connect()
}

export default clientPromise
