// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimit } from './lib/rateLimiter';

export async function middleware(req: NextRequest) {
  // Only apply rate limiting to API routes
  if (!req.nextUrl.pathname.startsWith('/api')) return NextResponse.next();

  // Use IP address as unique key
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

  const { success, remaining, limit, reset } = await rateLimit({
    key: ip,
    limit: 20, // 20 requests
    window: 60, // per 60 seconds
  });

  if (!success) {
    return new NextResponse('Too many requests', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      },
    });
  }

  const res = NextResponse.next();
  res.headers.set('X-RateLimit-Limit', limit.toString());
  res.headers.set('X-RateLimit-Remaining', remaining.toString());
  res.headers.set('X-RateLimit-Reset', reset.toString());

  return res;
}

// Only run middleware on API routes
export const config = {
  matcher: '/api/:path*',
};
