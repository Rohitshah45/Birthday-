'use client';

import React, { useState, useEffect } from 'react';
import { birthday } from '@/content/birthday';
import { memories } from '@/content/memories';
import { videos } from '@/content/videos';
import { chaosDossier, constellationThoughts } from '@/content/messages';
import { birthdayLetter } from '@/content/letter';

export default function ScrapbookClient() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  
  // Chapter 2: Tap to Reveal Video Reels (like Chapter 5 wax seal)
  const [unlockedVideos, setUnlockedVideos] = useState<Record<string, boolean>>({});

  // Chapter 3: Aesthetic Dossier Card selection/inspection
  const [activeDossier, setActiveDossier] = useState<string | null>(chaosDossier[0].id);

  // Chapter 4: Constellation Aesthetic Card reveals
  const [revealedConstellations, setRevealedConstellations] = useState<Record<string, boolean>>({});

  // Chapter 5: Birthday Letter envelope open/close state
  const [letterOpen, setLetterOpen] = useState<boolean>(false);

  // FINAL SURPRISE ANIMATION STAGES:
  // stage: 'idle' -> 'message' -> 'floating_papers' -> 'letter_assembled'
  const [surpriseStage, setSurpriseStage] = useState<'idle' | 'message' | 'floating_papers' | 'letter_assembled'>('idle');

  const triggerFinalSurprise = () => {
    // 1. Immediately show the emotional message below
    setSurpriseStage('message');

    // 2. After 1.4 seconds, float papers in from all sides of the screen
    setTimeout(() => {
      setSurpriseStage('floating_papers');
    }, 1400);

    // 3. After another 2.2 seconds, assemble the grand Happy Birthday letter in the center
    setTimeout(() => {
      setSurpriseStage('letter_assembled');
    }, 3600);
  };

  const closeFinalSurprise = () => {
    setSurpriseStage('idle');
  };

  const toggleVideoReveal = (id: string) => {
    setUnlockedVideos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleConstellation = (id: string) => {
    setRevealedConstellations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % memories.length);
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + memories.length) % memories.length);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      padding: '40px 16px 100px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
    }}>
      {/* Whimsical Floating Edge Accents */}
      <div style={{ position: 'fixed', top: '24px', left: '20px', fontSize: '26px', zIndex: 1, pointerEvents: 'none', opacity: 0.6 }} className="gentle-drift">
        🌸
      </div>
      <div style={{ position: 'fixed', top: '75px', right: '25px', fontSize: '24px', zIndex: 1, pointerEvents: 'none', opacity: 0.6 }} className="gentle-drift">
        ✨
      </div>
      <div style={{ position: 'fixed', bottom: '40px', left: '25px', fontSize: '26px', zIndex: 1, pointerEvents: 'none', opacity: 0.6 }} className="gentle-drift">
        🍰
      </div>

      {/* SECTION 2: WELCOME SCREEN */}
      <section id="welcome" style={{ width: '100%', maxWidth: '640px', margin: '0 auto 60px' }}>
        <div className="scrapbook-page" style={{ padding: '44px 28px 36px', textAlign: 'center' }}>
          <div className="tape-top" />
          <div className="tape-corner-left" />
          <div className="tape-corner-right" />

          <div style={{ marginBottom: '16px' }}>
            <span className="postage-stamp">
              <span>🎀</span>
              <span>{birthday.badgeText}</span>
            </span>
          </div>

          <h1 className="hand" style={{ fontSize: '50px', margin: '4px 0 16px' }}>
            {birthday.greeting}
          </h1>

          <p style={{
            fontSize: '18px',
            color: 'var(--ink)',
            lineHeight: 1.6,
            maxWidth: '500px',
            margin: '0 auto 24px',
            fontFamily: 'var(--disp, Fredoka), sans-serif',
          }}>
            {birthday.tagline}
          </p>

          <div style={{
            margin: '0 auto 28px',
            padding: '16px 20px',
            background: '#FFF0F4',
            borderRadius: '10px',
            borderLeft: '4px solid var(--soft-rose)',
            maxWidth: '480px',
            textAlign: 'center',
          }}>
            <p className="serif-italic" style={{ fontSize: '16px', color: 'var(--burg)', margin: 0 }}>
              {birthday.quote}
            </p>
          </div>

          <button className="btn-scrapbook-primary" onClick={() => scrollTo('celebration')}>
            Open Your Surprise ✨
          </button>
        </div>
      </section>

      {/* SECTION 3: BIRTHDAY CELEBRATION */}
      <section id="celebration" style={{ width: '100%', maxWidth: '640px', margin: '0 auto 60px' }}>
        <div className="scrapbook-page" style={{
          padding: '44px 28px 36px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF5F8 100%)',
        }}>
          <div className="tape-top" />
          <div style={{ fontSize: '52px', margin: '0 0 10px' }} className="soft-pulse">
            🎂🎈🎉
          </div>

          <h2 className="hand" style={{ fontSize: '42px', margin: '0 0 16px', color: 'var(--burg)' }}>
            {birthday.celebrationTitle}
          </h2>

          <p style={{
            fontSize: '17px',
            color: 'var(--ink)',
            maxWidth: '500px',
            margin: '0 auto 24px',
            lineHeight: 1.65,
          }}>
            {birthday.celebrationSubtitle}
          </p>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span className="postage-stamp">✨ Forever Iconic</span>
            <span className="postage-stamp">🌸 Unapologetically You</span>
            <span className="postage-stamp">💖 Birthday Queen</span>
          </div>
        </div>
      </section>

      {/* SECTION 4: MEMORY LANE */}
      <section id="memories" style={{ width: '100%', maxWidth: '680px', margin: '0 auto 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span className="postage-stamp">Chapter 01</span>
          <h2 className="hand" style={{ fontSize: '40px', margin: '8px 0 6px' }}>Memory Lane 📷</h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)', margin: 0, fontStyle: 'italic' }}>
            Moments frozen in time • Tap any polaroid to view full size
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '28px',
          padding: '10px',
        }}>
          {memories.map((photo, idx) => (
            <div
              key={photo.id}
              className="polaroid-scrapbook"
              style={{ transform: `rotate(${photo.rotation ?? 0}deg)` }}
              onClick={() => setSelectedPhotoIndex(idx)}
            >
              <div className="tape-corner-left" />
              <div className="polaroid-photo-frame">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="polaroid-note">{photo.caption}</div>
              {photo.date && (
                <div style={{
                  fontSize: '13px',
                  color: 'var(--soft-rose)',
                  textAlign: 'center',
                  marginTop: '4px',
                  fontFamily: 'var(--disp, Fredoka), sans-serif',
                  fontWeight: 600,
                }}>
                  {photo.date}
                </div>
              )}
              {photo.note && (
                <div style={{
                  fontSize: '12px',
                  color: 'var(--muted)',
                  textAlign: 'center',
                  marginTop: '4px',
                  fontStyle: 'italic',
                }}>
                  "{photo.note}"
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: VIDEO MEMORIES (CHAPTER 02) */}
      <section id="videos" style={{ width: '100%', maxWidth: '640px', margin: '0 auto 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span className="postage-stamp">Chapter 02</span>
          <h2 className="hand" style={{ fontSize: '40px', margin: '8px 0 6px' }}>Moments In Motion 🎞️</h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)', margin: 0, fontStyle: 'italic' }}>
            Sealed Video Reel • Tap the film seal to unlock and play
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {videos.map((vid) => {
            const isUnlocked = !!unlockedVideos[vid.id];
            return (
              <div key={vid.id} className="scrapbook-page" style={{ padding: isUnlocked ? '36px 24px' : '52px 24px', textAlign: 'center' }}>
                <div className="tape-top" />

                {!isUnlocked ? (
                  <div
                    onClick={() => toggleVideoReveal(vid.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '18px',
                      cursor: 'pointer',
                    }}
                  >
                    <div className="wax-seal-scrapbook soft-pulse" style={{
                      background: 'radial-gradient(circle at 35% 35%, #880E4F 0%, #4A0E23 100%)',
                      fontSize: '26px',
                    }}>
                      🎬
                    </div>

                    <div>
                      <div style={{ marginBottom: '8px' }}>
                        <span className="postage-stamp" style={{ fontSize: '12px' }}>
                          {vid.tag || 'Confidential Film Tape'}
                        </span>
                      </div>
                      <h3 className="disp" style={{ fontSize: '22px', color: 'var(--burg)', margin: '0 0 6px' }}>
                        {vid.reelLabel || vid.title}
                      </h3>
                      <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, fontStyle: 'italic' }}>
                        {vid.secretNote || 'Tap the film seal to break open this memory tape'}
                      </p>
                    </div>

                    <button
                      className="btn-scrapbook-primary"
                      style={{ padding: '10px 24px', fontSize: '15px', marginTop: '6px' }}
                    >
                      Break Seal & Play Reel 📽️
                    </button>
                  </div>
                ) : (
                  <div className="slide-up" style={{ textAlign: 'left' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1.5px dashed var(--pink)',
                      paddingBottom: '12px',
                      marginBottom: '18px',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}>
                      <div>
                        <span className="postage-stamp" style={{ fontSize: '11px', marginRight: '8px' }}>
                          Tape Unrolled 🔓
                        </span>
                        <strong className="disp" style={{ fontSize: '18px', color: 'var(--burg)' }}>
                          {vid.title}
                        </strong>
                      </div>
                      <button
                        onClick={() => toggleVideoReveal(vid.id)}
                        className="btn-scrapbook-secondary"
                        style={{ padding: '5px 14px', fontSize: '13px' }}
                      >
                        Reseal Tape ↺
                      </button>
                    </div>

                    <p style={{ fontSize: '15px', color: 'var(--muted)', margin: '0 0 16px', lineHeight: 1.5 }}>
                      {vid.desc}
                    </p>

                    <div style={{
                      borderRadius: '10px',
                      overflow: 'hidden',
                      background: '#1A0B10',
                      aspectRatio: '16/9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
                    }}>
                      <video
                        controls
                        autoPlay
                        preload="metadata"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      >
                        <source src={vid.src} type="video/mp4" />
                        Your browser does not support video playback.
                      </video>
                    </div>

                    {vid.caption && (
                      <p className="serif-italic" style={{ fontSize: '14px', color: 'var(--burg)', textAlign: 'center', marginTop: '16px', marginBottom: 0 }}>
                        “{vid.caption}”
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 6: THE FRIENDSHIP CHRONICLES (CHAPTER 03) */}
      <section id="chaos" style={{ width: '100%', maxWidth: '640px', margin: '0 auto 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span className="postage-stamp">Chapter 03</span>
          <h2 className="hand" style={{ fontSize: '40px', margin: '8px 0 6px' }}>The Friendship Chronicles 🎒✨</h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)', margin: 0, fontStyle: 'italic' }}>
            From 7th grade school desks to wherever life takes us • Our story
          </p>
        </div>

        {/* Tab Selector for Dossier Files */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {chaosDossier.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveDossier(item.id)}
              style={{
                border: activeDossier === item.id ? '2px solid var(--burg)' : '1px dashed var(--pink)',
                background: activeDossier === item.id ? '#FFF0F4' : '#FFFFFF',
                color: activeDossier === item.id ? 'var(--burg)' : 'var(--muted)',
                fontWeight: activeDossier === item.id ? 700 : 500,
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--disp, Fredoka), sans-serif',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: activeDossier === item.id ? '0 2px 8px rgba(122,31,61,0.12)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <span>{item.icon}</span>
              <span>{item.badge}</span>
            </button>
          ))}
        </div>

        {/* Display Active Dossier Item */}
        {chaosDossier.filter((d) => d.id === activeDossier).map((file) => (
          <div key={file.id} className="scrapbook-page slide-up" style={{ padding: '36px 28px', position: 'relative' }}>
            <div className="tape-top" />
            <div className="tape-corner-right" />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <span className="postage-stamp">{file.badge}</span>
              <span className="postage-stamp" style={{ background: '#FFFDF0', borderColor: '#F59E0B', color: '#B45309' }}>
                {file.scrapbookSticker}
              </span>
            </div>

            <h3 className="disp" style={{ fontSize: '24px', color: 'var(--burg)', margin: '0 0 16px' }}>
              {file.topic}
            </h3>

            {/* Vintage Quote Box */}
            <div style={{
              background: '#FFF9FB',
              borderLeft: '4px solid var(--burg)',
              borderRadius: '0 8px 8px 0',
              padding: '16px 20px',
              marginBottom: '20px',
            }}>
              <p className="serif-italic" style={{ fontSize: '16px', color: 'var(--ink)', margin: 0, lineHeight: 1.6 }}>
                {file.quote}
              </p>
            </div>

            {/* Finding / Analysis */}
            <div style={{ marginBottom: '18px' }}>
              <strong style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--soft-rose)' }}>
                Field Findings & Truth:
              </strong>
              <p style={{ fontSize: '16px', color: 'var(--ink)', margin: '6px 0 0', lineHeight: 1.6 }}>
                {file.verdict}
              </p>
            </div>

            {/* Friendship Metric Box */}
            <div style={{
              background: '#FFF0F4',
              borderRadius: '8px',
              padding: '10px 16px',
              border: '1px dashed var(--pink)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{ fontSize: '20px' }}>📊</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--burg)' }}>
                {file.friendshipStat}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* SECTION 7: THE CONSTELLATION OF YOU (CHAPTER 04) */}
      <section id="flirty" style={{ width: '100%', maxWidth: '640px', margin: '0 auto 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span className="postage-stamp">Chapter 04</span>
          <h2 className="hand" style={{ fontSize: '40px', margin: '8px 0 6px' }}>The Constellation of You 🌌✨</h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)', margin: 0, fontStyle: 'italic' }}>
            The little things that make Jennifer completely magnetic • Tap to uncover
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {constellationThoughts.map((star) => {
            const isFlipped = !!revealedConstellations[star.id];
            return (
              <div
                key={star.id}
                className={`scrapbook-flip-card ${isFlipped ? 'is-flipped' : ''}`}
                style={{ minHeight: '185px' }}
                onClick={() => toggleConstellation(star.id)}
              >
                <div className="scrapbook-flip-inner">
                  <div className="flip-front-side" style={{
                    background: 'linear-gradient(135deg, #FFFDFB 0%, #FFF5F7 100%)',
                    border: '1.5px solid rgba(240, 98, 146, 0.4)',
                    boxShadow: 'var(--shadow-paper)',
                    padding: '24px 20px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="postage-stamp" style={{ fontSize: '10px', padding: '2px 8px' }}>
                        {star.tag}
                      </span>
                      <span style={{ fontSize: '24px' }}>{star.symbol}</span>
                    </div>

                    <h4 className="disp" style={{ fontSize: '18px', color: 'var(--burg)', margin: '4px 0 8px' }}>
                      {star.starTitle}
                    </h4>

                    <p className="serif-italic" style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, lineHeight: 1.4 }}>
                      “{star.whisper}”
                    </p>

                    <span style={{ fontSize: '11px', color: 'var(--soft-rose)', marginTop: '12px', fontWeight: 600 }}>
                      Tap to read heartfelt note ✨
                    </span>
                  </div>

                  <div className="flip-back-side" style={{
                    background: 'linear-gradient(135deg, #FFF0F4 0%, #FCE4EC 100%)',
                    border: '2px solid var(--soft-rose)',
                    padding: '22px 18px',
                    textAlign: 'left',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      <span>{star.symbol}</span>
                      <strong className="disp" style={{ fontSize: '14px', color: 'var(--burg)' }}>
                        {star.starTitle}
                      </strong>
                    </div>

                    <p style={{ fontSize: '14px', lineHeight: 1.55, color: 'var(--ink)', margin: 0 }}>
                      {star.detail}
                    </p>

                    <div style={{ marginTop: '12px', textAlign: 'right' }}>
                      <span style={{ fontSize: '11px', color: 'var(--muted)', fontStyle: 'italic' }}>
                        Tap to close ↺
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 8: BIRTHDAY LETTER (CHAPTER 05) */}
      <section id="letter" style={{ width: '100%', maxWidth: '640px', margin: '0 auto 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span className="postage-stamp">Chapter 05</span>
          <h2 className="hand" style={{ fontSize: '40px', margin: '8px 0 6px' }}>A Letter For You ✉️</h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)', margin: 0, fontStyle: 'italic' }}>
            {letterOpen ? 'Unfolded from the heart' : 'Tap the wax seal to break open your handwritten letter'}
          </p>
        </div>

        <div className="scrapbook-page" style={{ padding: letterOpen ? '38px 30px' : '52px 24px', textAlign: 'center' }}>
          <div className="tape-top" />

          {!letterOpen ? (
            <div
              onClick={() => setLetterOpen(true)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', cursor: 'pointer' }}
            >
              <div className="wax-seal-scrapbook soft-pulse">
                {birthdayLetter.waxSealText}
              </div>
              <div>
                <h3 className="disp" style={{ fontSize: '22px', color: 'var(--burg)', margin: '0 0 6px' }}>
                  {birthdayLetter.envelopeLabel}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, fontStyle: 'italic' }}>
                  {birthdayLetter.envelopeSubtext}
                </p>
              </div>
              <span className="postage-stamp" style={{ marginTop: '8px' }}>
                Tap Seal To Open 🗝️
              </span>
            </div>
          ) : (
            <div className="slide-up" style={{ textAlign: 'left' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1.5px dashed var(--pink)',
                paddingBottom: '14px',
                marginBottom: '22px',
              }}>
                <span className="hand" style={{ fontSize: '26px', color: 'var(--burg)' }}>
                  {birthdayLetter.date}
                </span>
                <button
                  onClick={() => setLetterOpen(false)}
                  className="btn-scrapbook-secondary"
                  style={{ padding: '6px 14px', fontSize: '13px' }}
                >
                  Fold letter ↺
                </button>
              </div>

              <h3 className="hand" style={{ fontSize: '34px', margin: '0 0 18px', color: 'var(--burg)' }}>
                {birthdayLetter.salutation}
              </h3>

              {birthdayLetter.paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: '17px', lineHeight: 1.75, color: 'var(--ink)', marginBottom: '18px' }}>
                  {p}
                </p>
              ))}

              <div style={{ marginTop: '32px' }}>
                <p style={{ fontSize: '16px', color: 'var(--muted)', margin: '0 0 6px', fontStyle: 'italic' }}>
                  {birthdayLetter.signoff}
                </p>
                <p className="hand" style={{ fontSize: '32px', margin: 0, color: 'var(--burg)' }}>
                  {birthdayLetter.signature}
                </p>
              </div>

              {birthdayLetter.postscript && (
                <div style={{
                  marginTop: '28px',
                  padding: '14px 18px',
                  background: '#FFF0F4',
                  borderRadius: '8px',
                  borderLeft: '4px solid var(--soft-rose)',
                  fontSize: '15px',
                  fontStyle: 'italic',
                  color: 'var(--burg)',
                }}>
                  {birthdayLetter.postscript}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 9: FINAL SURPRISE WITH PAPERS FLOATING IN & ASSEMBLED GRAND LETTER */}
      <section id="surprise" style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}>
        <div className="scrapbook-page" style={{
          padding: '48px 28px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #FFFDFB 0%, #FFF0F5 100%)',
          position: 'relative',
        }}>
          <div className="tape-top" />
          <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }} className="soft-pulse">
            🎁✨
          </span>
          <h2 className="hand" style={{ fontSize: '42px', margin: '0 0 14px', color: 'var(--burg)' }}>
            One Last Birthday Wish...
          </h2>
          <p style={{
            fontSize: '17px',
            color: 'var(--ink)',
            maxWidth: '460px',
            margin: '0 auto 28px',
            lineHeight: 1.65,
          }}>
            Never forget how cherished, brilliantly capable, and extraordinarily loved you are every single day.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn-scrapbook-primary"
              onClick={triggerFinalSurprise}
            >
              {surpriseStage !== 'idle' ? 'Unfold Surprise Again! 🎉' : 'Tap For One Final Surprise 💖'}
            </button>
            <button
              className="btn-scrapbook-secondary"
              onClick={() => scrollTo('welcome')}
            >
              Back to Top ↺
            </button>
          </div>

          {/* 1. IMMEDIATE EMOTIONAL MESSAGE BELOW */}
          {surpriseStage !== 'idle' && (
            <div className="slide-up" style={{
              marginTop: '28px',
              padding: '24px',
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '2px dashed var(--soft-rose)',
              boxShadow: 'var(--shadow-paper)',
              textAlign: 'center',
            }}>
              <p className="hand" style={{ fontSize: '32px', margin: '0 0 10px', color: 'var(--burg)' }}>
                You are truly one of a kind, Jennifer! 🌟
              </p>
              <p style={{ fontSize: '16px', color: 'var(--ink)', margin: '0 0 12px', lineHeight: 1.6 }}>
                Thank you for being in this world and making it so much brighter, sillier, and more beautiful. Have the happiest birthday ever! 🍰✨
              </p>
              <span className="postage-stamp" style={{ fontSize: '12px' }}>
                Gathering all your wishes & memories… ✨
              </span>
            </div>
          )}
        </div>
      </section>

      {/* 2. PAPERS FLOATING FROM ALL SIDES OF THE SCREEN & 3. ASSEMBLED GRAND BIRTHDAY LETTER */}
      {(surpriseStage === 'floating_papers' || surpriseStage === 'letter_assembled') && (
        <div className="lightbox-backdrop" style={{ zIndex: 200 }} onClick={closeFinalSurprise}>
          {/* Floating Papers Coming in from Left, Right, Top, and Bottom */}
          <div
            className="floating-scrap-paper scrap-from-left"
            style={{ top: '15%', left: '8%', ['--rot' as any]: '-6deg' }}
          >
            🌸 "Pure Magic"
          </div>
          <div
            className="floating-scrap-paper scrap-from-right"
            style={{ top: '22%', right: '10%', ['--rot' as any]: '8deg' }}
          >
            🎂 "Happy Birthday Jennifer!"
          </div>
          <div
            className="floating-scrap-paper scrap-from-top"
            style={{ top: '10%', left: '42%', ['--rot' as any]: '3deg' }}
          >
            ✨ "Radiant & Unforgettable"
          </div>
          <div
            className="floating-scrap-paper scrap-from-left"
            style={{ bottom: '24%', left: '12%', ['--rot' as any]: '5deg' }}
          >
            💖 "Always by your side"
          </div>
          <div
            className="floating-scrap-paper scrap-from-right"
            style={{ bottom: '18%', right: '14%', ['--rot' as any]: '-7deg' }}
          >
            👑 "Birthday Queen 2026"
          </div>
          <div
            className="floating-scrap-paper scrap-from-bottom"
            style={{ bottom: '8%', left: '38%', ['--rot' as any]: '-2deg' }}
          >
            🍰 "To countess more laughs!"
          </div>

          {/* 3. CENTER ASSEMBLED GRAND BIRTHDAY LETTER CARD */}
          {surpriseStage === 'letter_assembled' && (
            <div
              className="assembled-letter-card scrapbook-page"
              style={{
                maxWidth: '560px',
                width: '92%',
                maxHeight: '85vh',
                overflowY: 'auto',
                padding: '36px 28px',
                position: 'relative',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF8FA 100%)',
                boxShadow: '0 25px 60px rgba(74, 14, 35, 0.45), 0 0 40px rgba(240, 98, 146, 0.3)',
                border: '2px solid var(--soft-rose)',
                textAlign: 'left',
                zIndex: 220,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="tape-top" />
              <div className="tape-corner-left" />
              <div className="tape-corner-right" />

              {/* Header with Close Button */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '2px dashed var(--pink)',
                paddingBottom: '14px',
                marginBottom: '20px',
              }}>
                <span className="postage-stamp" style={{ background: '#FFF0F5', borderColor: 'var(--soft-rose)' }}>
                  💌 Assembled For Jennifer • Special Edition
                </span>
                <button
                  onClick={closeFinalSurprise}
                  style={{
                    background: '#FFF0F4',
                    border: '1px solid var(--pink)',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    fontSize: '18px',
                    color: 'var(--burg)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  }}
                  title="Close Letter"
                >
                  ✕
                </button>
              </div>

              {/* Big Grand Salutation */}
              <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                <span style={{ fontSize: '42px', display: 'block', marginBottom: '8px' }}>
                  🎂👑✨
                </span>
                <h2 className="hand" style={{ fontSize: '42px', margin: 0, color: 'var(--burg)' }}>
                  Happy Birthday, Jennifer!
                </h2>
                <p className="serif-italic" style={{ fontSize: '15px', color: 'var(--soft-rose)', margin: '6px 0 0' }}>
                  “A world of memories, assembled with love, just for you.”
                </p>
              </div>

              {/* Heartfelt Assembled Letter Body */}
              <div style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--ink)' }}>
                <p style={{ marginBottom: '14px' }}>
                  Today isn't just about celebrating another year; it's about celebrating every single memory, every laugh that left us in tears, and every quiet moment that proved how rare your spirit is.
                </p>
                <p style={{ marginBottom: '14px' }}>
                  You carry a heart that touches everyone who enters your life. May this year shower you with endless happiness, boundless adventures, and the exact kind of magic you bring to everyone else.
                </p>
              </div>

              {/* Signoff */}
              <div style={{ marginTop: '24px', borderTop: '1px dashed rgba(240, 98, 146, 0.4)', paddingTop: '16px' }}>
                <p style={{ fontSize: '14px', color: 'var(--muted)', margin: '0 0 4px', fontStyle: 'italic' }}>
                  Forever wishing you the very best,
                </p>
                <p className="hand" style={{ fontSize: '32px', margin: '0 0 16px', color: 'var(--burg)' }}>
                  Always cheering for you ❤️
                </p>
              </div>

              {/* Close / Fold Up Button */}
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  onClick={closeFinalSurprise}
                  className="btn-scrapbook-primary"
                  style={{ width: '100%', padding: '14px 20px', fontSize: '16px' }}
                >
                  Close & Keep in Heart 🌸
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {selectedPhotoIndex !== null && (
        <div className="lightbox-backdrop" onClick={() => setSelectedPhotoIndex(null)}>
          <div
            className="polaroid-scrapbook slide-up"
            style={{ maxWidth: '520px', width: '100%', margin: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '22px',
                  color: 'var(--burg)',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                ✕
              </button>
            </div>
            <div className="polaroid-photo-frame" style={{ aspectRatio: 'auto', maxHeight: '60vh' }}>
              <img
                src={memories[selectedPhotoIndex].src}
                alt={memories[selectedPhotoIndex].caption}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div className="polaroid-note" style={{ fontSize: '26px', marginTop: '16px' }}>
              {memories[selectedPhotoIndex].caption}
            </div>
            {memories[selectedPhotoIndex].date && (
              <div style={{
                fontSize: '13px',
                color: 'var(--soft-rose)',
                textAlign: 'center',
                marginTop: '4px',
                fontWeight: 600,
              }}>
                {memories[selectedPhotoIndex].date}
              </div>
            )}
            {memories[selectedPhotoIndex].note && (
              <div style={{
                fontSize: '13px',
                color: 'var(--muted)',
                textAlign: 'center',
                marginTop: '4px',
                fontStyle: 'italic',
              }}>
                "{memories[selectedPhotoIndex].note}"
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '18px' }}>
              <button className="btn-scrapbook-secondary" onClick={prevPhoto} style={{ padding: '6px 16px', fontSize: '14px' }}>
                ← Prev
              </button>
              <span style={{ fontSize: '13px', color: 'var(--muted)', alignSelf: 'center' }}>
                {selectedPhotoIndex + 1} of {memories.length}
              </span>
              <button className="btn-scrapbook-secondary" onClick={nextPhoto} style={{ padding: '6px 16px', fontSize: '14px' }}>
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
