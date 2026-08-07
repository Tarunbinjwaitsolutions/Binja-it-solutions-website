"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";;
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import {
  PhoneCall, Bot, MessageSquare, Globe, TrendingUp, Clock, Zap, BarChart,
  ShieldCheck, Users, CheckCircle2, ArrowRight, Rocket, Diamond, Crown,
  Building2, Check, ChevronDown, ChevronUp, Mail, Calendar, FileText,
  Volume2, Headphones, Code, Tag, Megaphone, Settings, Layers, ArrowUpDown,
  Mic, Menu, X, Activity
} from 'lucide-react';

import Magnetic from '@/components/ui/Magnetic';
// import ZigzagBackground from '@/components/ui/ZigzagBackground';
import HeroSection from '@/components/sections/HeroSectionAI';
import Footer from '@/components/layout/Footer';

import useInView from '@/lib/hooks/useInView';
import Reveal from '@/components/ui/Reveal';
import ScrollScaleBox from '@/components/ui/ScrollScaleBox';
import ParallaxSection from '@/components/ui/ParallaxSection';
import { KEY_BENEFITS, PLANS, FEATURES_DATA, HERO_CARDS, HIGHLIGHTS, ALL_FEATURES } from '@/data/landingPageData';

/* ---------- tiny environment helpers ---------- */
const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isTouch = () =>
  typeof window !== 'undefined' &&
  (('ontouchstart' in window) || navigator.maxTouchPoints > 0);























/* ---------- SIGNATURE: interactive voice waveform ---------- */
function VoiceWave() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const pointer = useRef({ x: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = prefersReduced();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, t = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const drawBar = (x, y, bw, bh, r) => {
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, bw, bh, r);
      else ctx.rect(x, y, bw, bh);
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      const barW = w < 480 ? 4 : 6;
      const gap = w < 480 ? 5 : 7;
      const step = barW + gap;
      const count = Math.ceil(w / step);
      const mid = h / 2;

      for (let i = 0; i < count; i++) {
        const x = i * step;
        const base = Math.sin(i * 0.32 + t) * 0.5 + Math.sin(i * 0.13 - t * 1.4) * 0.5;
        let amp = base * 0.45 + 0.55;

        if (pointer.current.active) {
          const d = Math.abs(x + barW / 2 - pointer.current.x);
          const reach = w < 480 ? 110 : 170;
          const influence = Math.max(0, 1 - d / reach);
          amp += influence * influence * 1.5;
        }

        const barH = Math.max(3, amp * h * 0.40);
        const g = ctx.createLinearGradient(0, mid - barH, 0, mid + barH);
        g.addColorStop(0, 'rgba(243,115,33,0.95)');
        g.addColorStop(0.5, 'rgba(251,146,60,0.7)');
        g.addColorStop(1, 'rgba(37,99,235,0.55)');
        ctx.fillStyle = g;
        drawBar(x, mid - barH, barW, barH * 2, barW / 2);
      }
    };

    if (reduce) {
      render();
    } else {
      const loop = () => { render(); t += 0.04; raf = requestAnimationFrame(loop); };
      loop();
    }
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  const onMove = (e) => {
    const r = wrapRef.current.getBoundingClientRect();
    pointer.current.x = e.clientX - r.left;
    pointer.current.active = true;
  };
  const onLeave = () => { pointer.current.active = false; };

  return (
    <div
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative w-full h-28 sm:h-36 rounded-2xl border overflow-hidden cursor-crosshair"
      style={{ background: 'rgba(255,255,255,.04)', borderColor: 'rgba(255,255,255,.1)', backdropFilter: 'blur(8px)', touchAction: 'none' }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-slate-900/80 pointer-events-none whitespace-nowrap">
        <Activity className="w-3.5 h-3.5 text-slate-900" />
        Move across the wave — that&rsquo;s how binj-AI listens
      </span>
    </div>
  );
}

/* ---------- count-up text (scroll triggered) ---------- */
function CountUpText({ text }) {
  const [ref, inView] = useInView(0.4);
  const [val, setVal] = useState(0);
  const match = text.match(/(\d+(?:\.\d+)?)/);
  const target = match ? parseFloat(match[1]) : 0;
  const decimals = match ? (match[1].split('.')[1] || '').length : 0;

  useEffect(() => {
    if (!match || !inView) return;
    if (prefersReduced()) { setVal(target); return; }
    let raf;
    const dur = 1100;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return <span ref={ref}>{text}</span>;
  const before = text.slice(0, match.index);
  const after = text.slice(match.index + match[1].length);
  return <span ref={ref}>{before}{val.toFixed(decimals)}{after}</span>;
}



/* ---------- 3D tilt + glare card (hero feature cards) ---------- */
function TiltCard({ children }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});
  const onMove = (e) => {
    if (prefersReduced() || isTouch()) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const max = 9;
    setStyle({
      transform: `perspective(800px) rotateX(${(py - 0.5) * -2 * max}deg) rotateY(${(px - 0.5) * 2 * max}deg) scale(1.02)`,
      '--gx': `${px * 100}%`,
      '--gy': `${py * 100}%`,
      '--glare': 0.35,
    });
  };
  const onLeave = () => setStyle({});
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="tilt h-full"
      style={style}
    >
      {children}
    </div>
  );
}

const CheckIcon = () => (
  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 items-center justify-center shadow-sm">
    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
  </div>
);
const CrossIcon = () => <span className="text-slate-300 font-light text-lg">–</span>;



const LandingPage = () => {
  const router = useRouter();
  const [showMatrix, setShowMatrix] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [mobilePlan, setMobilePlan] = useState(0);
  const [progress, setProgress] = useState(0);

  // Handle hash scrolling for external page navigation
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, []);

  // ─── Scroll progress bar + nav scroll detection ────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Refresh ScrollTrigger on mount
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  const go = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="binj min-h-screen font-sans text-slate-800 overflow-x-hidden relative" style={{ background: '#f8fafc' }}>
      {/* <ZigzagBackground /> */}
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Boldonse&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Inter:wght@100..900&display=swap");

        .binj ::selection { background:#F37321; color:#fff; }

        /* scroll reveal */
        .reveal { opacity:0; transform: translateY(30px); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
        .reveal-in { opacity:1; transform:none; }

        /* popular plan pulse */
        @keyframes popPulse { 0%,100%{ box-shadow: 0 0 0 0 rgba(255,184,0,.35);} 50%{ box-shadow: 0 0 0 14px rgba(255,184,0,0);} }
        .pop-pulse { animation: popPulse 2.6s ease-in-out infinite; }

        /* button shine sweep */
        .shine { position: relative; overflow: hidden; }
        .shine::after { content:''; position:absolute; top:0; left:-120%; width:60%; height:100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,.45), transparent); transform: skewX(-20deg); transition: left .6s ease; }
        .shine:hover::after { left:140%; }

        /* 3D tilt card + glare */
        .tilt { transition: transform .25s cubic-bezier(.22,1,.36,1); transform-style: preserve-3d; will-change: transform; position: relative; }
        .tilt::before { content:''; position:absolute; inset:0; border-radius:1rem; pointer-events:none; opacity:0; transition:opacity .25s ease;
          background: radial-gradient(180px circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,.35), transparent 60%); }
        .tilt:hover::before { opacity: var(--glare, 0); }

        /* collapsible matrix */
        .binj-collapse { display:grid; grid-template-rows:0fr; opacity:0; transition: grid-template-rows .45s ease, opacity .45s ease; }
        .binj-collapse.open { grid-template-rows:1fr; opacity:1; }
        .binj-collapse > .collapse-inner { overflow:hidden; min-height:0; }

        .binj :focus-visible { outline:3px solid #F37321; outline-offset:2px; border-radius:6px; }

        /* ambient blobs */
        @keyframes drift2 { 0%,100%{ transform: translate(0,0) scale(1);} 50%{ transform: translate(-50px,-20px) scale(1.08);} }
        @keyframes breathe { 0%,100%{ opacity:.16; transform: translate(-50%,-50%) scale(1);} 50%{ opacity:.26; transform: translate(-50%,-50%) scale(1.15);} }
        .blob2 { animation: drift2 18s ease-in-out infinite; }
        .blobC { animation: breathe 9s ease-in-out infinite; }



        @media (prefers-reduced-motion: reduce) {
          .reveal,.reveal-in { opacity:1 !important; transform:none !important; animation:none !important; transition:none !important; }
          .blob2,.blobC,.pop-pulse,.scroll-hint { animation:none !important; }
          .tilt { transition:none !important; }
          html { scroll-behavior:auto; }
        }
      `}</style>

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[70] h-1 origin-left pointer-events-none"
        style={{ transform: `scaleX(${progress})`, background: 'linear-gradient(90deg,#F37321,#fb923c,#2563eb)', transition: 'transform .1s linear' }} />

      {/* Navbar */}
      {/* <nav
        className="w-full transition-all duration-300 border-b"
        style={{
          background: 'rgba(11,15,36,0.92)',
          backdropFilter: 'blur(12px)',
          borderColor: 'rgba(255,255,255,0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-white text-2xl bg-orange-500">b</div>
            <div className="text-left">
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">binj-AI</span>
              <p className="text-[10px] text-slate-300 font-medium tracking-widest uppercase hidden sm:block">By Binjwa IT Solutions</p>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => go('benefits')} className="text-slate-200 hover:text-white text-sm font-medium transition-colors">Benefits</button>
            <button onClick={() => go('plans-section')} className="text-slate-200 hover:text-white text-sm font-medium transition-colors">Plans</button>
            <button onClick={() => router.push('/login')} className="shine text-white px-6 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2 hover:-translate-y-0.5"
              style={{ background: "var(--accent)", boxShadow: '0 10px 25px rgba(243,115,33,.35)' }}>
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button onClick={() => setMenuOpen(v => !v)} className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ background: 'rgba(255,255,255,.08)' }} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <div className={`binj-collapse md:hidden ${menuOpen ? 'open' : ''}`} style={{ background: 'rgba(11,15,36,0.98)' }}>
          <div className="collapse-inner">
            <div className="px-4 py-4 flex flex-col gap-2 border-t border-white/10">
              <button onClick={() => go('benefits')} className="text-left text-slate-200 py-3 px-3 rounded-xl hover:bg-white/5 font-medium">Benefits</button>
              <button onClick={() => go('plans-section')} className="text-left text-slate-200 py-3 px-3 rounded-xl hover:bg-white/5 font-medium">Plans</button>
              <button onClick={() => { setMenuOpen(false); router.push('/login'); }} className="text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 mt-1 bg-orange-500">
                Go to Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav> */}

      <HeroSection />

      {/* Key Benefits */}
      <section id="benefits" className="py-20 sm:py-24 bg-white relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14 sm:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: '#0B0F24' }}>Powerful AI-Driven Outcomes</h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">Deliver measurable business outcomes with our robust automation solutions.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {KEY_BENEFITS.map((b, idx) => (
              <ScrollScaleBox key={idx} className="h-full">
                <Reveal delay={(idx % 4) * 90}>
                  <div className="group h-full bg-slate-50 p-7 lg:p-8 rounded-3xl border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">{b.icon}</div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#0B0F24' }}>{b.title}</h3>
                    <p className="text-slate-600 mb-6 text-sm leading-relaxed">{b.description}</p>
                    <div className="inline-flex items-center text-sm font-bold px-3 py-1 rounded-full transition-all group-hover:scale-105" style={{ color: "var(--accent)", background: 'rgba(243,115,33,.1)' }}>
                      <CountUpText text={b.highlight} />
                    </div>
                  </div>
                </Reveal>
              </ScrollScaleBox>
            ))}
          </div>
        </div>
      </section>

      {/* Voice wave + feature cards */}
      <section className="py-16 sm:py-20 theme-text relative overflow-hidden theme-bg-secondary" id="benefits">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="blob2 absolute bottom-0 right-1/4 w-96 h-96 rounded-full" style={{ background: "var(--accent)", filter: 'blur(120px)', opacity: .12 }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto mb-16">
            <Reveal delay={120}>
              <VoiceWave />
            </Reveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {HERO_CARDS.map((c, i) => (
              <ScrollScaleBox key={c.n} className="h-full">
                <Reveal delay={i * 110}>
                  <TiltCard>
                    <div className="h-full border p-6 rounded-2xl transition-colors hover:bg-white/10" style={{ background: 'rgba(255,255,255,.05)', borderColor: 'rgba(255,255,255,.1)', backdropFilter: 'blur(10px)' }}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(243,115,33,.2)' }}>{c.icon}</div>
                      <h3 className="text-lg font-bold mb-2">{c.n}. {c.title}</h3>
                      <p className="text-sm text-slate-400">{c.desc}</p>
                    </div>
                  </TiltCard>
                </Reveal>
              </ScrollScaleBox>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Language Support */}
      {/* <section className="py-20 sm:py-24 theme-bg-secondary theme-text relative overflow-hidden border-t theme-border" id="plans-section">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-10"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-500 rounded-full blur-[120px] opacity-10"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal className="text-center mb-14 sm:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Multi-Language Voice Support</h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
              Connect with customers in their native tongue. binj-AI automatically speaks and understands local languages natively with human-like accuracy.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-5xl mx-auto">
              {[
                { name: "English", native: "English", code: "A", color: "#3B82F6" },
                { name: "Hindi", native: "हिंदी (Hindi)", code: "अ", color: "#EF4444" },
                { name: "Marathi", native: "मराठी (Marathi)", code: "म", color: "#10B981" },
                { name: "Gujarati", native: "ગુજરાતી (Gujarati)", code: "ગુ", color: "#F59E0B" },
                { name: "Tamil", native: "தமிழ் (Tamil)", code: "த", color: "#EC4899" },
                { name: "Telugu", native: "తెలుగు (Telugu)", code: "తె", color: "#8B5CF6" },
                { name: "Kannada", native: "ಕನ್ನಡ (Kannada)", code: "ಕ", color: "#14B8A6" },
                { name: "Bengali", native: "বাংলা (Bengali)", code: "ব", color: "#F43F5E" },
                { name: "Punjabi", native: "ਪੰਜਾਬੀ (Punjabi)", code: "ਪੰ", color: "#6366F1" }
              ].map((lang, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 group">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-bold text-2xl sm:text-3xl transition-all duration-300 hover:scale-110 shadow-lg border-2 hover:shadow-2xl cursor-default"
                    style={{ background: 'rgba(255,255,255,0.04)', borderColor: lang.color, boxShadow: `0 0 15px ${lang.color}20` }}>
                    <span className="group-hover:scale-105 transition-transform">{lang.code}</span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-widest">{lang.name}</p>
                    <p className="text-sm font-semibold text-slate-200">{lang.native}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200} className="mt-16 flex flex-col items-center justify-center gap-3">
            <style>{`
              @keyframes wavePulse { 0%,100%{transform:scaleY(0.25);}50%{transform:scaleY(1);} }
              .wave-bar-pulse { animation: wavePulse 1.2s ease-in-out infinite; transform-origin: center; }
            `}</style>
            <div className="flex items-center gap-1.5 h-16 justify-center">
              {[...Array(24)].map((_, i) => {
                const height = 15 + Math.sin(i * 0.5) * 35;
                return (
                  <div key={i} className="w-1 bg-orange-500 rounded-full wave-bar-pulse"
                    style={{ height: `${height}px`, animationDelay: `${(i % 5) * 0.15}s` }} />
                );
              })}
            </div>
            <span className="text-xs text-slate-400 tracking-wider uppercase mt-2">Active Voice Synthesis Active</span>
          </Reveal>
        </div>
      </section> */}

      {/* Pricing */}
      <section id="plans-section" className="py-20 sm:py-24 border-t border-slate-200 scroll-mt-20" style={{ background: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14 sm:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: '#0B0F24' }}>
              Our Scalable <span className="text-orange-500">Feature Plans</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">Choose the perfect plan to streamline your communication, automate follow-ups, and accelerate business growth.</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-14 sm:mb-16">
            {PLANS.map((plan, i) => {
              const isSel = selectedPlan === plan.id;
              return (
                <ScrollScaleBox key={plan.id} className="h-full">
                  <Reveal delay={i * 80}>
                    <div
                      onClick={() => setSelectedPlan(isSel ? null : plan.id)}
                      role="button" tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') setSelectedPlan(isSel ? null : plan.id); }}
                      className={`relative h-full bg-white rounded-3xl p-6 shadow-lg border-2 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${plan.isPopular ? 'lg:scale-105 lg:z-10' : ''}`}
                      style={{ borderColor: isSel ? plan.color : (plan.isPopular ? '#FFB800' : '#f1f5f9'), boxShadow: isSel ? `0 18px 45px ${plan.color}40` : undefined }}
                    >
                      {plan.isPopular && (
                        <span className="pop-pulse absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-black px-4 py-1 rounded-full tracking-widest whitespace-nowrap" style={{ background: '#FFB800', color: '#0B0F24' }}>POPULAR Choice</span>
                      )}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-black px-3 py-1 rounded-full tracking-wider text-white" style={{ background: plan.color }}>{plan.name}</span>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ background: `linear-gradient(135deg, ${plan.grad[0]}, ${plan.grad[1]})` }}>{plan.icon}</div>
                        </div>
                        <h3 className="text-xl font-bold mb-1" style={{ color: '#0B0F24' }}>{plan.tagline}</h3>
                        <p className="text-xs text-slate-500 mb-6 min-h-[48px]">{plan.summary}</p>
                        <div className="space-y-3 mb-8">
                          {plan.highlights.map((f, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="text-xs text-slate-700 font-medium">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* <button
                        onClick={(e) => { e.stopPropagation(); router.push('/login'); }}
                        className="shine w-full py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                        style={plan.isPopular
                          ? { background: '#FFB800', color: '#0B0F24', boxShadow: '0 8px 20px rgba(255,184,0,.25)' }
                          : { background: '#0B0F24', color: '#fff' }}
                      >
                        {isSel ? <>Selected <Check className="w-4 h-4" /></> : 'Get Started'}
                      </button> */}
                    </div>
                  </Reveal>
                </ScrollScaleBox>
              );
            })}
          </div>

          {/* Toggle matrix */}
          <div className="text-center mb-8">
            <button onClick={() => setShowMatrix(v => !v)} className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 border border-slate-200 font-bold rounded-2xl shadow-sm transition-all" style={{ color: '#0B0F24' }}>
              {showMatrix ? <>Hide Feature Matrix <ChevronUp className="w-5 h-5" /></> : <>Show Detailed Feature Matrix <ChevronDown className="w-5 h-5" /></>}
            </button>
          </div>

          {/* Feature matrix */}
          <div className={`binj-collapse ${showMatrix ? 'open' : ''}`}>
            <div className="collapse-inner">
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200/60 overflow-hidden">
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full min-w-[900px] border-collapse text-left">
                    <thead>
                      <tr style={{ background: '#0B0F24', color: '#fff' }}>
                        <th className="p-6 text-sm font-bold uppercase tracking-wider w-[30%] border-r border-white/5">Feature / Service</th>
                        {PLANS.map((plan) => (
                          <th key={plan.id} className="p-6 text-center w-[14%] border-r border-white/5 last:border-0">
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-xs font-black px-3 py-1 rounded-full tracking-wider text-white" style={{ background: plan.color }}>{plan.name}</span>
                              <span className="text-[10px] text-slate-300 font-medium tracking-wide uppercase">{plan.tagline}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ALL_FEATURES.map((f, fi) => (
                        <tr key={fi} className="border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0">
                          <td className="p-4 pl-6 border-r border-slate-100">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shadow-inner border border-slate-100">{f.icon}</div>
                              <span className="text-slate-800 font-semibold text-sm">{f.name}</span>
                            </div>
                          </td>
                          {['starter', 'essential', 'growth', 'pro', 'enterprise'].map((k, ki) => (
                            <td key={k} className={`p-4 text-center ${ki < 4 ? 'border-r border-slate-100' : ''}`}>
                              {f[k] ? <CheckIcon /> : <CrossIcon />}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile tabbed plan view */}
                <div className="md:hidden">
                  <div className="flex gap-2 p-3 overflow-x-auto" style={{ background: '#0B0F24' }}>
                    {PLANS.map((plan, i) => (
                      <button key={plan.id} onClick={() => setMobilePlan(i)}
                        className="text-xs font-black px-3 py-2 rounded-full tracking-wider whitespace-nowrap transition-all"
                        style={mobilePlan === i ? { background: plan.color, color: '#fff' } : { background: 'rgba(255,255,255,.08)', color: '#cbd5e1' }}>
                        {plan.name}
                      </button>
                    ))}
                  </div>
                  <div className="p-4">
                    <p className="text-center text-xs text-slate-500 uppercase tracking-widest mb-4">{PLANS[mobilePlan].tagline}</p>
                    <div className="space-y-1.5">
                      {ALL_FEATURES.map((f, fi) => {
                        const key = PLANS[mobilePlan].id;
                        return (
                          <div key={fi} className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl ${f[key] ? 'bg-emerald-50/60' : 'bg-slate-50'}`}>
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-inner border border-slate-100 flex-shrink-0">{f.icon}</div>
                              <span className={`text-sm font-medium truncate ${f[key] ? 'text-slate-800' : 'text-slate-400'}`}>{f.name}</span>
                            </div>
                            {f[key] ? <Check className="w-5 h-5 text-emerald-600 stroke-[3] flex-shrink-0" /> : <span className="text-slate-300 flex-shrink-0">–</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Highlights footer */}
                <div className="p-6 theme-text border-t theme-border theme-bg-secondary">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm font-semibold tracking-wide text-black uppercase">Core Platform Highlights:</p>
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                      {HIGHLIGHTS.map((h, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-orange-500" />
                          <span className="text-xs font-semibold text-black">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 relative overflow-hidden bg-white" >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="blobC absolute top-1/2 left-1/2 w-[500px] h-[500px] sm:w-[800px] sm:h-[800px] rounded-full" />
        </div>
        <Reveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">Ready to transform your communication?</h2>
          <p className="text-lg sm:text-xl text-slate-600 mb-10">Join the businesses using binj-AI to automate their calls, scale operations, and drive 10X growth.</p>
          <Magnetic>
            <button onClick={() => router.push('/contact')} className="shine text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl transition-all hover:scale-105"
              style={{ background: "var(--accent)", boxShadow: '0 22px 50px rgba(243,115,33,.4)' }}>
              Get Started Today
            </button>
          </Magnetic>
        </Reveal>
      </section>

    </div>
  );
};

export default LandingPage;