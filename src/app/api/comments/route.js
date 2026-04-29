import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Integrate actual Razorpay API/Webhooks
  // API Endpoint: https://api.razorpay.com/v1/payments
  // Requires: Basic Auth with Key ID and Key Secret
  
  // For now, return an empty array so the frontend falls back to mock comments
  // In a real implementation, you would fetch from Razorpay API/Webhooks and optionally cache in MongoDB
  
  /* Example implementation:
  try {
    const res = await fetch('https://api.razorpay.com/v1/payments', {
      headers: {
        'Authorization': `Basic ${Buffer.from(process.env.RAZORPAY_KEY_ID + ':' + process.env.RAZORPAY_KEY_SECRET).toString('base64')}`
      }
    });
    const data = await res.json();
    
    // Map data to the format our frontend expects
    const realComments = data.items.map(payment => ({
      id: payment.id,
      name: payment.notes?.name || "Anonymous",
      text: payment.notes?.message || "Sent support without a message."
    })).filter(c => c.text); // only keep ones with notes
    
    return NextResponse.json(realComments);
  } catch (error) {
    console.error("Failed to fetch Razorpay payments", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
  */

  return NextResponse.json([]);
}
