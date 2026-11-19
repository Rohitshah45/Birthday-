'use client';

import { useEffect, useState } from 'react';

// Pastel birthday balloons configuration with staggered initial delays & continuous looping
const BALLOONS = [
  { id: 1, left: '6%', size: 52, duration: 9, delay: 0, color: '#F48FB1', sway: 15 },
  { id: 2, left: '16%', size: 60, duration: 11, delay: 1.5, color: '#CE93D8', sway: -20 },
  { id: 3, left: '26%', size: 48, duration: 8.5, delay: 3, color: '#90CAF9', sway: 18 },
  { id: 4, left: '36%', size: 56, duration: 12, delay: 0.5, color: '#FFE082', sway: -14 },
  { id: 5, left: '48%', size: 50, duration: 9.5, delay: 2, color: '#A5D6A7', sway: 16 },
  { id: 6, left: '60%', size: 58, duration: 10, delay: 0.2, color: '#F48FB1', sway: -18 },
  { id: 7, left: '70%', size: 46, duration: 11.5, delay: 3.5, color: '#FFAB91', sway: 14 },
  { id: 8, left: '80%', size: 62, duration: 10.5, delay: 1, color: '#CE93D8', sway: -15 },
  { id: 9, left: '90%', size: 52, duration: 9, delay: 2.5, color: '#80DEEA', sway: 20 },
];

export default function Gate() {
  const [data, setData] = useState({
    question: "What is the special date that unlocks our little world?",
    badge: "Secret Birthday Vault 🔒✨",
    headline: "Hold on, birthday girl...",
    subheadline: "First, prove that you're actually you.",
    placeholder: "Type your answer here...",
    buttonText: "Open My Scrapbook 🗝️",
    checkingText: "Checking your secret key… ✨",
  });
  const [answer, setAnswer] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    fetch('/api/entry/question')
      .then((r) => r.json())
      .then((d) => setData((prev) => ({ ...prev, ...d })))
      .catch(() => {});
  }, []);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg('');

    const res = await fetch('/api/entry/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: answer.trim() }),
    }).catch(() => null);

    if (res?.ok) {
      setMsg('✨ Access granted! Unfolding your little world...');
      setTimeout(() => {
        location.href = '/world';
      }, 400);
      return;
    }

    const j = await res?.json().catch(() => null);
    setShake(true);
    setTimeout(() => setShake(false), 500);

    if (res?.status === 429) {
      setMsg(`Easy, detective! Try again in ${Math.ceil((j?.retryAfterSeconds ?? 900) / 60)} min.`);
    } else if (res) {
      setMsg('Hmm, not quite! Think carefully and try again 🌸');
    } else {
      setMsg('Connection hiccup. Please try once more!');
    }
    setBusy(false);
  }

  return (
    <main style={{
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* FLOATING BALLOONS EVERYWHERE ACROSS SCREEN */}
      <div style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden',
      }}>
        {BALLOONS.map((b) => (
          <div
            key={b.id}
            className="floating-balloon"
            style={{
              left: b.left,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              ['--sway' as any]: `${b.sway}px`,
            }}
          >
            {/* Balloon Body */}
            <div
              style={{
                width: `${b.size}px`,
                height: `${b.size * 1.25}px`,
                backgroundColor: b.color,
                borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                boxShadow: `inset -8px -8px 14px rgba(0,0,0,0.15), inset 8px 8px 14px rgba(255,255,255,0.7), 0 10px 20px rgba(122,31,61,0.15)`,
                position: 'relative',
              }}
            >
              {/* Balloon Knot */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '10px',
                  height: '6px',
                  backgroundColor: b.color,
                  borderRadius: '2px',
                  filter: 'brightness(0.85)',
                }}
              />
              {/* Balloon String */}
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  width: '2px',
                  height: '80px',
                  background: 'linear-gradient(to bottom, rgba(122,31,61,0.5), transparent)',
                  transform: 'translateX(-50%)',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Floating Sparkles & Emojis */}
      <div style={{ position: 'absolute', top: '10%', left: '8%', fontSize: '32px', opacity: 0.7 }} className="gentle-drift">
        ✨
      </div>
      <div style={{ position: 'absolute', top: '15%', right: '10%', fontSize: '28px', opacity: 0.6 }} className="gentle-drift">
        🌸
      </div>
      <div style={{ position: 'absolute', bottom: '12%', left: '12%', fontSize: '30px', opacity: 0.6 }} className="gentle-drift">
        💌
      </div>
      <div style={{ position: 'absolute', bottom: '15%', right: '8%', fontSize: '32px', opacity: 0.7 }} className="gentle-drift">
        🎉
      </div>

      {/* Main Scrapbook Entry Card */}
      <div
        className={`scrapbook-page ${shake ? 'shake-animation' : ''}`}
        style={{
          maxWidth: '460px',
          width: '100%',
          padding: '48px 32px 36px',
          textAlign: 'center',
          position: 'relative',
          transform: 'rotate(-0.8deg)',
          transition: 'transform 0.3s ease',
          zIndex: 10,
        }}
      >
        {/* Washi Tapes */}
        <div className="tape-top" />
        <div className="tape-corner-left" />
        <div className="tape-corner-right" />

        {/* Postage Stamp Badge */}
        <div style={{ marginBottom: '18px' }}>
          <span className="postage-stamp">
            <span>💌</span>
            <span>{data.badge}</span>
          </span>
        </div>

        {/* Vintage Handwritten Header */}
        <h1 className="hand" style={{ fontSize: '38px', margin: '0 0 4px', color: 'var(--burg)' }}>
          {data.headline}
        </h1>
        <p className="hand" style={{ fontSize: '24px', margin: '0 0 24px', color: 'var(--soft-rose)' }}>
          {data.subheadline}
        </p>

        {/* Clue Card WITHOUT Any Date Hints */}
        <div style={{
          background: '#FFFDFB',
          borderRadius: '8px',
          padding: '20px 22px',
          border: '1.5px dashed var(--pink)',
          marginBottom: '26px',
          boxShadow: 'inset 0 1px 4px rgba(122, 31, 61, 0.04)',
        }}>
          <p style={{
            fontSize: '17px',
            fontWeight: 700,
            color: 'var(--burg)',
            margin: 0,
            fontFamily: 'var(--disp, Fredoka), sans-serif',
            lineHeight: 1.5,
          }}>
            {data.question}
          </p>
        </div>

        {/* Form Input */}
        <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ position: 'relative' }}>
            <input
              id="answer-input"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={data.placeholder}
              autoComplete="off"
              maxLength={64}
              required
              style={{
                width: '100%',
                padding: '16px 20px',
                fontSize: '17px',
                fontFamily: 'var(--disp, Fredoka), sans-serif',
                textAlign: 'center',
                border: '2px solid rgba(240, 98, 146, 0.5)',
                borderRadius: '12px',
                background: '#FFFFFF',
                color: 'var(--ink)',
                outline: 'none',
                boxShadow: '0 2px 8px rgba(122, 31, 61, 0.06)',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--burg)';
                e.target.style.boxShadow = '0 0 0 4px rgba(240, 98, 146, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(240, 98, 146, 0.5)';
                e.target.style.boxShadow = '0 2px 8px rgba(122, 31, 61, 0.06)';
              }}
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="btn-scrapbook-primary"
            style={{ width: '100%', padding: '16px 24px', fontSize: '18px' }}
          >
            {busy ? data.checkingText : data.buttonText}
          </button>

          {/* Feedback / Alert Message */}
          <div style={{ minHeight: '28px', marginTop: '6px' }}>
            {msg && (
              <p
                role="alert"
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  margin: 0,
                  color: msg.includes('granted') ? '#2E7D32' : 'var(--burg)',
                  animation: 'fadeIn 0.3s ease',
                }}
              >
                {msg}
              </p>
            )}
          </div>
        </form>

        {/* Bottom Whimsical Footnote */}
        <div style={{
          marginTop: '16px',
          borderTop: '1px dashed rgba(240, 98, 146, 0.3)',
          paddingTop: '14px',
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: '12px', color: 'var(--muted)', fontStyle: 'italic' }}>
            Handcrafted with love for Jennifer • 2026
          </span>
          <span>🎀</span>
        </div>
      </div>
    </main>
  );
}
