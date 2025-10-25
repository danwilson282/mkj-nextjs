// lib/rateLimiter.ts
import { redis } from './redis'

interface RateLimitResult {
  success: boolean
  remaining: number
  limit: number
  reset: number
}

export async function rateLimit({
  key,
  limit,
  window,
}: {
  key: string
  limit: number
  window: number // in seconds
}): Promise<RateLimitResult> {
  const now = Math.floor(Date.now() / 1000)
  const windowKey = `ratelimit:${key}:${Math.floor(now / window)}`

  // Increment the count atomically
  const current = await redis.incr(windowKey)

  // Set expiry if first request in this window
  if (current === 1) {
    await redis.expire(windowKey, window)
  }

  const success = current <= limit
  const remaining = Math.max(limit - current, 0)
  const reset = now + window

  return { success, remaining, limit, reset }
}
