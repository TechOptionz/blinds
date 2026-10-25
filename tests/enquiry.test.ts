import { test } from 'node:test';
import assert from 'node:assert/strict';
import { enquirySchema } from '../lib/validations';
import { POST } from '../app/api/enquiry/route';
const valid = { name: 'Sample Customer', email: 'customer@example.com', phone: '', product: 'roller-blinds', message: 'I would like to discuss blinds for my living room.', consent: true, website: '' };
test('enquiry validation accepts optional phone and rejects missing consent, unknown products and bots', () => {
  assert.equal(enquirySchema.safeParse(valid).success, true);
  assert.equal(enquirySchema.safeParse({ ...valid, product: 'curtains' }).success, true);
  for (const change of [{ consent: false }, { product: 'unknown' }, { email: 'invalid' }, { name: 'A' }, { message: 'short' }, { website: 'spam' }]) assert.equal(enquirySchema.safeParse({ ...valid, ...change }).success, false);
});
test('API reports invalid input and never reports success without delivery configuration', async () => {
  const original = process.env.RESEND_API_KEY; delete process.env.RESEND_API_KEY;
  try {
    const request = (data: unknown) => new Request('http://localhost:3000/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const invalid = await POST(request({ ...valid, email: 'invalid' })); assert.equal(invalid.status, 400);
    const unavailable = await POST(request(valid)); assert.equal(unavailable.status, 503); assert.equal((await unavailable.json()).success, undefined);
    const wrongOrigin = await POST(new Request('http://localhost:3000/api/enquiry', { method: 'POST', headers: { Origin: 'https://untrusted.example', 'Content-Type': 'application/json' }, body: JSON.stringify(valid) })); assert.equal(wrongOrigin.status, 403);
  } finally { if (original) process.env.RESEND_API_KEY = original; }
});
test('configured API requires a provider receipt, handles failures and enforces rate limits', async () => {
  const keys = ['RESEND_API_KEY', 'ENQUIRY_FROM', 'ENQUIRY_TO', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'] as const;
  const saved = keys.map(key => process.env[key]); const originalFetch = globalThis.fetch;
  let mode: 'success' | 'rejected' | 'missing-receipt' | 'limited' = 'success';
  process.env.RESEND_API_KEY = 'test-only'; process.env.ENQUIRY_FROM = 'sender@example.com'; process.env.ENQUIRY_TO = 'inbox@example.com'; process.env.UPSTASH_REDIS_REST_URL = 'https://redis.example.com'; process.env.UPSTASH_REDIS_REST_TOKEN = 'test-only';
  globalThis.fetch = async (url, options) => {
    if (String(url).includes('redis.example')) return Response.json({ result: mode === 'limited' ? 6 : 1 });
    const body = JSON.parse(String(options?.body)); assert.equal(body.reply_to, valid.email); assert.equal(body.from, 'sender@example.com');
    return mode === 'rejected' ? new Response('Rejected', { status: 500 }) : Response.json(mode === 'missing-receipt' ? {} : { id: 'test-receipt' });
  };
  const request = () => new Request('http://localhost:3000/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(valid) });
  try {
    const success = await POST(request()); assert.equal(success.status, 200); assert.equal((await success.json()).success, true);
    mode = 'rejected'; assert.equal((await POST(request())).status, 502);
    mode = 'missing-receipt'; assert.equal((await POST(request())).status, 502);
    mode = 'limited'; const limited = await POST(request()); assert.equal(limited.status, 429); assert.equal(limited.headers.get('Retry-After'), '600');
  } finally { globalThis.fetch = originalFetch; keys.forEach((key, i) => { if (saved[i] === undefined) delete process.env[key]; else process.env[key] = saved[i]; }); }
});
