import { NextResponse } from 'next/server';
import { enquirySchema } from '@/lib/validations';
import { deliveryConfigured } from '@/lib/delivery';
import { allowEnquiry } from '@/lib/rate-limit';
import { enquiryOptions } from '@/content/enquiry-options';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: 'This request could not be verified.' }, { status: 403 });
  if (!request.headers.get('content-type')?.includes('application/json')) return NextResponse.json({ error: 'Expected an enquiry in JSON format.' }, { status: 415 });
  if (Number(request.headers.get('content-length') || 0) > 16000) return NextResponse.json({ error: 'Enquiry is too large.' }, { status: 413 });
  let input: unknown;
  try { const text = await request.text(); if (text.length > 16000) return NextResponse.json({ error: 'Enquiry is too large.' }, { status: 413 }); input = JSON.parse(text); } catch { return NextResponse.json({ error: 'Please check your enquiry and try again.' }, { status: 400 }); }
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) return NextResponse.json({ error: 'Please check the highlighted fields and try again.', fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  if (!deliveryConfigured()) return NextResponse.json({ error: 'Online enquiries are not available yet. Your message has not been sent.' }, { status: 503 });
  try {
    const ip = request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!await allowEnquiry(ip)) return NextResponse.json({ error: 'Too many enquiries. Please try again in 10 minutes.' }, { status: 429, headers: { 'Retry-After': '600' } });
    const data = parsed.data;
    const product = enquiryOptions.find(p => p.slug === data.product)?.name || 'Exploring options';
    const result = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: process.env.ENQUIRY_FROM, to: [process.env.ENQUIRY_TO], reply_to: data.email, subject: `Just Blinds enquiry — ${product}`, text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not supplied'}\nInterest: ${product}\n\n${data.message}\n\nConsent to enquiry contact: yes` }), signal: AbortSignal.timeout(10000) });
    if (!result.ok) throw new Error('Delivery rejected');
    const receipt = await result.json(); if (!receipt.id) throw new Error('Missing delivery receipt');
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Sorry, we couldn't send your enquiry right now. Please try again." }, { status: 502 }); }
}
