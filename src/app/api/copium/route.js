import { NextResponse } from 'next/server';

// In-memory counter (Note: This will reset if the server restarts or in serverless environments,
// but works fine for simple local testing without a database)
let globalCopiumCount = 0;

export async function GET() {
  return NextResponse.json({ count: globalCopiumCount });
}

export async function POST(request) {
  try {
    const { increment } = await request.json();
    const incValue = typeof increment === 'number' ? increment : 1;

    globalCopiumCount += incValue;

    return NextResponse.json({ count: globalCopiumCount });
  } catch (error) {
    console.error("POST /api/copium error:", error);
    return NextResponse.json({ error: 'Failed to update copium count' }, { status: 500 });
  }
}
