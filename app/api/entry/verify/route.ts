import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { entry } from '@/content/entry';
import { normalizeDate } from '@/lib/normalize';
import { createHmac } from 'crypto';

// Simple HMAC‑based token for a verified visitor
const COOKIE = 'lw_visitor';
// Secret used for hashing – may be empty in local dev
const SECRET = process.env.ENTRY_ANSWER_SECRET ?? '';

const Body = z.object({ answer: z.string().min(1).max(64) }).strict();

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success)
    return NextResponse.json({ error: { code: 'WRONG', message: 'Not quite' } }, { status: 401 });

  const canonical = normalizeDate(parsed.data.answer);
  if (!canonical)
    return NextResponse.json({ error: { code: 'WRONG', message: 'Not quite' } }, { status: 401 });

  let good = false;
  if (process.env.NODE_ENV === 'production' && SECRET) {
    // Production: verify using HMAC with secret
    const providedHash = createHmac('sha256', SECRET).update(canonical).digest('hex');
    good = providedHash === entry.answerHash && entry.answerHash !== '';
  } else {
    // Development / non‑production: compare to plain canonical answer
    good = canonical === (entry as any).plainAnswer;
  }

  if (!good)
    return NextResponse.json({ error: { code: 'WRONG', message: 'Not quite' } }, { status: 401 });

  // sign token (simple static token in dev, HMAC in prod)
  const token = SECRET ? createHmac('sha256', SECRET).update('visitor').digest('hex') : 'visitor-dev';
  const res = NextResponse.json({ ok: true });
  // 1‑week cookie
  // Set cookie with secure flag only in production
const secureFlag = process.env.NODE_ENV === 'production';
res.cookies.set(COOKIE, token, { httpOnly: true, secure: secureFlag, sameSite: 'lax', path: '/', maxAge: 7 * 24 * 60 * 60 });
  return res;
}
