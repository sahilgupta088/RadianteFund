import { NextResponse } from 'next/server';
import rateLimit from '@/lib/rateLimit';

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
});

export async function GET(request) {
  try {
    // Get IP address for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1';
               
    // Rate limit: 5 requests per minute per IP
    await limiter.check(5, ip);

    // Fetch the URLs from .env
    const links = {
      tier1: process.env.RAZORPAY_LINK_TIER_1 || '#',
      tier2: process.env.RAZORPAY_LINK_TIER_2 || '#',
      tier3: process.env.RAZORPAY_LINK_TIER_3 || '#',
      custom: process.env.RAZORPAY_CUSTOM_LINK || '#',
    };

    return NextResponse.json(links);
  } catch (error) {
    if (error.status === 429) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }
    console.error("Payment Links API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
