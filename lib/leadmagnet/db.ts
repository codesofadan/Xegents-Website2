import mongoose from "mongoose"

/**
 * Cached mongoose connection (survives hot reloads in dev and
 * lambda re-use in prod). Requires MONGODB_URI in the environment.
 */

// NOTE: cache on the mongoose instance, NOT on globalThis. transpilePackages
// bundles a separate mongoose copy into each route, so a global cache would
// hand route B a connection object belonging to route A's mongoose instance —
// route B's models would then buffer forever against its own unconnected copy.
type Cache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
const holder = mongoose as unknown as { __xgCache?: Cache }
const cache: Cache = holder.__xgCache ?? (holder.__xgCache = { conn: null, promise: null })

export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local (MongoDB Atlas connection string).")
  }
  if (cache.conn) return cache.conn
  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, { bufferCommands: false })
  }
  try {
    cache.conn = await cache.promise
  } catch (e) {
    cache.promise = null
    throw e
  }
  return cache.conn
}

export function isDbConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI)
}
