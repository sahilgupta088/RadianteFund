import { NextResponse } from 'next/server';

// Cache this route for 30 seconds. Vercel will only hit Razorpay once every 30s
// even if 10,000 people are on your site at the same time!
export const revalidate = 30;

export async function GET() {
  const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
  const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

  // Base starting amount that the user requested to always show initially
  const BASE_AMOUNT = 330;

  // If API keys aren't configured yet, return the base amount as a fallback
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ totalAmount: BASE_AMOUNT });
  }

  try {
    // Fetch captured payments from Razorpay
    const res = await fetch('https://api.razorpay.com/v1/payments?status=captured', {
      headers: {
        'Authorization': `Basic ${Buffer.from(RAZORPAY_KEY_ID + ':' + RAZORPAY_KEY_SECRET).toString('base64')}`
      },
      // You may want to implement pagination here if you get more than 100 payments,
      // as the default limit is usually lower, but this will work for starting out.
    });
    
    if (!res.ok) {
      throw new Error(`Razorpay API responded with status: ${res.status}`);
    }

    const data = await res.json();
    
    // Sum up the amounts. Razorpay returns amount in paise (1 INR = 100 paise), so we divide by 100.
    const razorpayTotal = data.items.reduce((sum, payment) => {
      return sum + (payment.amount / 100);
    }, 0);
    
    const finalAmount = BASE_AMOUNT + razorpayTotal;

    return NextResponse.json({ totalAmount: finalAmount });
  } catch (error) {
    console.error("Failed to fetch Razorpay payments", error);
    // On error, gracefully fallback to the base amount so the page doesn't break
    return NextResponse.json({ totalAmount: BASE_AMOUNT });
  }
}
