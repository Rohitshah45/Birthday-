'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

export default function QRCardPage() {
  const [url, setUrl] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [svgString, setSvgString] = useState('');

  useEffect(() => {
    // Default to current origin or placeholder if server-side
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://your-domain.vercel.app';
    setUrl(currentOrigin);
  }, []);

  useEffect(() => {
    if (!url) return;
    // Generate high-res PNG data URL for preview and PNG download
    QRCode.toDataURL(url, {
      width: 600,
      margin: 2,
      color: {
        dark: '#7A1F3D', // burgundy theme
        light: '#FFFFFF',
      },
    })
      .then((dataUri) => setQrDataUrl(dataUri))
      .catch((err) => console.error(err));

    // Generate SVG string for vector download
    QRCode.toString(url, {
      type: 'svg',
      margin: 2,
      color: {
        dark: '#7A1F3D',
        light: '#FFFFFF',
      },
    })
      .then((svg) => setSvgString(svg))
      .catch((err) => console.error(err));
  }, [url]);

  const downloadPNG = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.download = 'jennifer-birthday-qr.png';
    link.href = qrDataUrl;
    link.click();
  };

  const downloadSVG = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.download = 'jennifer-birthday-qr.svg';
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px 16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Control Panel (Hidden when printing) */}
      <div className="no-print scrapbook-page" style={{
        maxWidth: '540px',
        width: '100%',
        padding: '28px 24px',
        marginBottom: '32px',
        textAlign: 'center',
      }}>
        <div className="tape-top" />
        <h1 className="hand" style={{ fontSize: '36px', margin: '0 0 10px', color: 'var(--burg)' }}>
          QR Code Gift Generator 💌
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--muted)', margin: '0 0 18px', lineHeight: 1.5 }}>
          Enter your live deployed website URL below (or keep it as localhost while testing) to generate your printable birthday card.
        </p>

        <div style={{ marginBottom: '18px' }}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-site.vercel.app"
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '15px',
              fontFamily: 'var(--disp, Fredoka), sans-serif',
              borderRadius: '8px',
              border: '2px solid rgba(240, 98, 146, 0.5)',
              textAlign: 'center',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={downloadPNG} className="btn-scrapbook-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
            Download PNG 📥
          </button>
          <button onClick={downloadSVG} className="btn-scrapbook-secondary" style={{ padding: '10px 20px', fontSize: '14px' }}>
            Download SVG 🎨
          </button>
          <button onClick={handlePrint} className="btn-scrapbook-primary" style={{ padding: '10px 20px', fontSize: '14px', background: 'linear-gradient(135deg, #880E4F 0%, #4A0E23 100%)' }}>
            Print Birthday Card 🖨️
          </button>
        </div>
      </div>

      {/* PRINTABLE PHYSICAL BIRTHDAY CARD */}
      <div id="printable-card" className="scrapbook-page" style={{
        maxWidth: '420px',
        width: '100%',
        padding: '40px 28px',
        textAlign: 'center',
        position: 'relative',
        background: '#FFFDF9',
        border: '2px solid #F8BBD0',
        boxShadow: '0 15px 35px rgba(122,31,61,0.15)',
      }}>
        <div className="tape-top" />
        <div className="tape-corner-left" />
        <div className="tape-corner-right" />

        <div style={{ marginBottom: '14px' }}>
          <span className="postage-stamp">
            <span>🎁</span>
            <span>Scan With Your Phone Camera</span>
          </span>
        </div>

        <h2 className="hand" style={{ fontSize: '38px', margin: '0 0 6px', color: 'var(--burg)' }}>
          For Jennifer ✨
        </h2>

        <p className="serif-italic" style={{ fontSize: '15px', color: 'var(--muted)', margin: '0 0 20px' }}>
          “A little world crafted just for you.”
        </p>

        {/* QR Code Frame */}
        <div style={{
          background: '#FFFFFF',
          padding: '16px',
          borderRadius: '12px',
          display: 'inline-block',
          boxShadow: '0 6px 18px rgba(122,31,61,0.1)',
          border: '2px dashed var(--pink)',
          marginBottom: '20px',
        }}>
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="Scan to open Jennifer's Birthday Scrapbook"
              style={{ width: '220px', height: '220px', display: 'block' }}
            />
          ) : (
            <div style={{ width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Generating QR…
            </div>
          )}
        </div>

        <div style={{
          background: '#FFF0F4',
          borderRadius: '8px',
          padding: '12px 16px',
          borderLeft: '4px solid var(--soft-rose)',
          marginBottom: '16px',
        }}>
          <p style={{
            fontSize: '13px',
            color: 'var(--burg)',
            fontWeight: 600,
            margin: 0,
            lineHeight: 1.5,
          }}>
            🗝️ Step 1: Open your phone camera & scan.<br />
            🎂 Step 2: Enter your special secret date to unlock!
          </p>
        </div>

        <p className="hand" style={{ fontSize: '24px', margin: '14px 0 0', color: 'var(--burg)' }}>
          Happy Birthday! ❤️
        </p>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: #ffffff !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          #printable-card {
            box-shadow: none !important;
            border: 2px solid #F48FB1 !important;
            margin: auto !important;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}
