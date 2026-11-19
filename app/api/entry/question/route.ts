import { NextResponse } from 'next/server';
import { entry } from '@/content/entry';

export async function GET() {
  return NextResponse.json({
    question: entry.question,
    badge: entry.badge,
    headline: entry.headline,
    subheadline: entry.subheadline,
    placeholder: entry.placeholder,
    buttonText: entry.buttonText,
    checkingText: entry.checkingText,
  });
}
