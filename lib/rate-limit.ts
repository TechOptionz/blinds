import { createHash } from 'node:crypto';
const local = new Map<string, { count: number; until: number }>();
export async function allowEnquiry(ip: string) {
  const key = `screensnblinds:enquiry:${createHash('sha256').update(ip).digest('hex')}`;
  const url = process.env.UPSTASH_REDIS_REST_URL; const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    // Atomic increment and expiry avoid persistent keys when a worker is interrupted.
    const script = "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],600) end; return n";
    const response = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(['EVAL', script, '1', key]), signal: AbortSignal.timeout(5000), cache: 'no-store' });
    if (!response.ok) throw new Error('Rate limiter unavailable');
    const data = await response.json(); if (typeof data.result !== 'number') throw new Error('Invalid rate limiter response');
    return data.result <= 5;
  }
  if (process.env.NODE_ENV === 'production') throw new Error('Rate limiter unconfigured');
  const now = Date.now();
  for (const [key, entry] of local) if (entry.until < now) local.delete(key);
  const entry = local.get(key) || { count: 0, until: now + 600_000 }; entry.count++; local.set(key, entry); return entry.count <= 5;
}
