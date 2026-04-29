import { NextResponse } from 'next/server';
import rateLimit from '@/lib/rateLimit';
import { Redis } from '@upstash/redis';

// Initialize Redis client securely using environment variables
const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Fallback for local development if Redis is not linked yet
const globalStore = globalThis;
if (globalStore.globalCopiumCount === undefined) {
  globalStore.globalCopiumCount = 0;
}

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
});

export async function GET() {
  let count = 0;
  if (redis) {
    try {
      count = (await redis.get('copium_count')) || 0;
    } catch (e) {
      console.error('Redis GET Error:', e);
      count = globalStore.globalCopiumCount;
    }
  } else {
    count = globalStore.globalCopiumCount;
  }
  return NextResponse.json({ count });
}

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1';
               
    // Rate limit: 30 requests per minute per IP
    await limiter.check(30, ip);

    const { increment } = await request.json();
    const incValue = typeof increment === 'number' ? increment : 1;

    let newCount = 0;
    if (redis) {
      try {
        newCount = await redis.incrby('copium_count', incValue);
      } catch (e) {
        console.error('Redis POST Error:', e);
        globalStore.globalCopiumCount += incValue;
        newCount = globalStore.globalCopiumCount;
      }
    } else {
      // Fallback for local development if Redis isn't configured yet
      globalStore.globalCopiumCount += incValue;
      newCount = globalStore.globalCopiumCount; 
    }

    return NextResponse.json({ count: newCount });
  } catch (error) {
    if (error.status === 429) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }
    console.error("POST /api/copium error:", error);
    return NextResponse.json({ error: 'Failed to update copium count' }, { status: 500 });
  }
}
