/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { ArrowUpRight, X, Loader2, ShieldCheck, ShieldAlert, Search } from "lucide-react";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import {
  partyInfo,
  preamble,
  preambleWords,
  sharedValues,
  whatWeStandFor,
  corePillars,
  leadershipCriteria,
  constitutionalValues,
  gapBanner,
  whoCanJoin,
  allianceSection,
  finalWord,
  ctas,
} from "@/data/content";
import NextImage from "next/image";

const MAX = "max-w-7xl mx-auto w-full";
const PAD = "px-container-padding-mobile lg:px-container-padding-desktop";

function FormattedText({ text }: { text: string }) {
  if (!text || !text.includes('NEWGAP')) return <>{text}</>;
  const parts = text.split('NEWGAP');
  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <span><span className="text-secondary">NEW</span><span className="text-primary">GAP</span></span>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

// Client-side particle animation for the Alliance swarm metaphor
// Cockroach Vector SVG Component
function CockroachSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="32" r="29" fill="none" stroke="#E0651E" strokeWidth="3" strokeDasharray="46 1000" transform="rotate(-90 32 32)"></circle>
      <circle cx="32" cy="32" r="29" fill="none" stroke="#1F5A2E" strokeWidth="3" strokeDasharray="46 1000" transform="rotate(30 32 32)"></circle>
      <circle cx="32" cy="32" r="29" fill="none" stroke="#2A1A10" strokeWidth="0.8"></circle>
      <ellipse cx="32" cy="36" rx="11" ry="16" fill="#5A2F12"></ellipse>
      <ellipse cx="32" cy="25" rx="7" ry="6" fill="#5A2F12"></ellipse>
      <path d="M28 17 Q22 10 18 8 M36 17 Q42 10 46 8" stroke="#2A1A10" strokeWidth="1.6" fill="none" strokeLinecap="round"></path>
      <rect x="26" y="23" width="12" height="3.5" rx="1" fill="#0a0807"></rect>
    </svg>
  );
}

// SVG Strings for dynamic DOM insertion in SwarmSwarm
const cockroachSvgString = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="32" cy="32" r="29" fill="none" stroke="#E0651E" strokeWidth="3" strokeDasharray="46 1000" transform="rotate(-90 32 32)"></circle>
          <circle cx="32" cy="32" r="29" fill="none" stroke="#1F5A2E" strokeWidth="3" strokeDasharray="46 1000" transform="rotate(30 32 32)"></circle>
          <circle cx="32" cy="32" r="29" fill="none" stroke="#2A1A10" strokeWidth="0.8"></circle>
          <ellipse cx="32" cy="36" rx="11" ry="16" fill="#5A2F12"></ellipse>
          <ellipse cx="32" cy="25" rx="7" ry="6" fill="#5A2F12"></ellipse>
          <path d="M28 17 Q22 10 18 8 M36 17 Q42 10 46 8" stroke="#2A1A10" strokeWidth="1.6" fill="none" strokeLinecap="round"></path>
          <rect x="26" y="23" width="12" height="3.5" rx="1" fill="#0a0807"></rect>
        </svg>`;

const lightningSvgString = `<svg viewBox="0 0 24 24" fill="currentColor" style="width:100%; height:100%;"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" /></svg>`;

const sunburstSvgString = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style="width:100%; height:100%;"><circle cx="12" cy="12" r="3" fill="currentColor" /><path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke-linecap="round" /></svg>`;

const hexagonSvgString = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style="width:100%; height:100%;"><path d="M12 2l8.66 5v10L12 22l-8.66-5V7z" /></svg>`;

// Client-side particle animation for the Alliance swarm metaphor
const SwarmSwarm = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = [
      { html: cockroachSvgString, color: "var(--primary)" },
      { html: cockroachSvgString, color: "var(--primary)" },
      { html: cockroachSvgString, color: "var(--primary)" },
      { html: cockroachSvgString, color: "var(--primary)" },
      { html: lightningSvgString, color: "var(--secondary)" },
      { html: sunburstSvgString, color: "var(--on-surface-variant)" },
      { html: hexagonSvgString, color: "var(--outline)" }
    ];
    const count = 40;
    const intervals: NodeJS.Timeout[] = [];
    const elements: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      const iconObj = items[Math.floor(Math.random() * items.length)];
      el.innerHTML = iconObj.html;
      el.style.color = iconObj.color;
      el.style.position = "absolute";
      el.style.width = Math.random() * 20 + 14 + "px";
      el.style.height = el.style.width;
      el.style.left = Math.random() * 100 + "%";
      el.style.top = Math.random() * 100 + "%";
      el.style.opacity = (Math.random() * 0.35 + 0.25).toString();
      el.style.filter = "grayscale(20%)";
      el.style.pointerEvents = "none";
      el.style.transition = `all ${Math.random() * 4 + 2}s cubic-bezier(0.4, 0, 0.2, 1)`;
      container.appendChild(el);
      elements.push(el);

      const interval = setInterval(() => {
        el.style.left = Math.random() * 100 + "%";
        el.style.top = Math.random() * 100 + "%";
        el.style.transform = `rotate(${Math.random() * 720}deg) scale(${Math.random() * 0.5 + 0.5})`;
      }, 3000 + Math.random() * 3000);

      intervals.push(interval);
    }

    return () => {
      intervals.forEach(clearInterval);
      elements.forEach((el) => el.remove());
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 opacity-100 pointer-events-none z-0" />;
};

function AnimatedRightSide() {

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 900 900" className="w-full h-full select-none pointer-events-none">
        <g>
          <path
            className="animate-lightning"
            d="M 475 120 L 710 145 L 590 350 L 690 350 L 565 555 L 660 555 L 310 790 L 435 555 L 330 555 L 455 350 L 360 350 Z"
            fill="#d46b4e"
            stroke="#d46b4e"
            strokeWidth="20"
            strokeLinejoin="miter"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

function Nav({ onJoinClick }: { onJoinClick: () => void }) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-on-surface/10">
      <div className={`${MAX} ${PAD} flex items-center justify-between h-24 gap-10`}>
        <Link href="/" className="flex items-center justify-center gap-0">
          <NextImage
            width={100}
            height={100}
            priority
            fetchPriority="high"
            loading="eager"
            src="/logo-transparent.png" alt="NEWGAP Logo" className="size-20 object-contain" />

          <div className="flex flex-col  justify-center items-start">
            <div className="flex gap-0 text-headline-md leading-[0.85]  uppercase font-headline-xl text-on-surface"> <span className=" leading-[0.85] text-secondary">NEW
            </span>
              <span className=" text-primary leading-[0.85]">
                GAP
              </span>
            </div>
            <p className="font-semibold tracking-wider leading-2.5 text-[7px] text-secondary uppercase">New <span className="text-primary">
              Generation Action Party</span></p>

            <span className="mt-0.5 text-[8px] tracking-wider font-mono  text-primary uppercase font-thin">
              INDIA · EST. 2026
            </span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-6  uppercase tracking-widest font-mono-label font-semibold  text-on-surface-variant">
          {/* <a href="#preamble" className="hover:text-primary transition-colors">Preamble</a> */}
          <Link href="/manifesto" className="hover:text-primary transition-colors">Manifesto</Link>
          <a href="#pillars" className="hover:text-primary transition-colors">Tenets</a>
          <a href="#stand" className="hover:text-primary transition-colors">Stand</a>
          <a href="#alliance" className="hover:text-primary transition-colors">Alliance</a>
          <a href="#commitment" className="hover:text-primary transition-colors">Commitment</a>
        </nav>
        <button onClick={onJoinClick} className="btn-retro-primary px-6 py-3 text-xs font-bold">
          Join
        </button>
      </div>
    </header>
  );
}

function Hero({ onVerifyClick }: { onVerifyClick: () => void }) {
  return (
    <section className={`relative min-h-screen flex items-center justify-center py-32 overflow-hidden grid-bg`}>
      <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background pointer-events-none" />
      <div className={`${MAX} ${PAD} relative z-10 animate-fade-in-up`}>
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Column - Texts & Actions */}
          <div className="lg:col-span-7 text-left flex flex-col items-start">
            {/* <p className="text-body-md font-mono-label uppercase tracking-[0.3em] text-on-surface-variant mb-2 font-bold"><FormattedText text={partyInfo.fullName} /></p> */}
            <Link
              href="https://github.com/besaoct/newgap"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mb-6 group cursor-pointer "
            >
              <span className="w-2 inline h-[0.8px] rounded-full bg-secondary animate-pulse " />
              <span className="text-[10px] font-mono-label font-bold uppercase tracking-[0.2em] text-secondary text-justify items-center gap-1.5">
                Open-source political party
                <ArrowUpRight className="size-3.5 inline transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-secondary" />
              </span>
            </Link>
            <h1 className="text-headline-xl-mobile sm:text-headline-xl  text-on-surface mb-8 uppercase leading-[0.95] tracking-tight  font-headline-xl font-black">
              <span className="">Clear code.</span> <br />
              <span className="text-primary"> Decisive execution.</span> <br />
              <span className="text-secondary ">New Gen Led.</span>
            </h1>
            <div className="mb-12">
              <blockquote className="text-body-lg font-serif text-on-surface-variant leading-relaxed  border-l-2 border-primary/30 pl-8 text-left ">
                <FormattedText text={partyInfo.preamble.subtitle} />
              </blockquote>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <a href={ctas.primary.url} className="btn-retro-primary px-12 py-6 text-sm font-bold w-full sm:w-auto text-center flex items-center justify-center gap-1.5">
                {ctas.primary.label.replace("↗", "").trim()}
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>
              <button
                onClick={onVerifyClick}
                className="btn-retro-secondary group px-12 py-6 text-sm font-bold w-full sm:w-auto text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Verify ID
                <ShieldCheck className="w-4 h-4 shrink-0" />
              </button>
            </div>
            <p className="mt-12 text-mono-label text-on-surface-variant uppercase tracking-widest font-mono-label">{partyInfo.hq}</p>
          </div>

          {/* Right Column - Animated Protest SVG */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <AnimatedRightSide />
          </div>
        </div>
      </div>
    </section>
  );
}

function Preamble() {
  return (
    <section id="preamble" className={`py-32 bg-surface-container-lowest border-y border-on-surface/10 scroll-mt-16`}>
      <div className={`${MAX} ${PAD}`}>
        <h2 className="text-label-caps font-label-caps text-primary uppercase mb-6 tracking-[0.4em]">The Preamble</h2>
        <h3 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg uppercase leading-tight text-on-surface mb-12 max-w-4xl">
          The founding <span className="text-secondary ">contract.</span>
        </h3>
        <blockquote className="text-body-lg font-serif  text-on-surface leading-relaxed  border-l-2 border-primary/40 pl-8 mb-12 max-w-5xl">
          {preamble.quote}
        </blockquote>
        <div className="grid lg:grid-cols-2 gap-12">
          <p className="text-body-md text-on-surface-variant leading-relaxed font-light"><FormattedText text={preamble.body} /></p>
          <p className="text-body-md text-on-surface-variant leading-relaxed font-light">{preamble.closing}</p>
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          {preamble.highlights.map((h) => (
            <span key={h} className="brutalist-border px-4 py-2 text-mono-label uppercase tracking-widest text-on-surface font-mono-label text-xs">{h}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function SixWordsSection() {
  return (
    <section className={`py-32  overflow-hidden`}>
      <div className={`${MAX} ${PAD}`}>
        <div className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-label-caps font-label-caps text-primary uppercase mb-6 tracking-[0.4em]">The Preamble Foundation</h2>
            <p className="text-headline-lg-mobile md:text-headline-lg font-headline-lg uppercase leading-tight text-on-surface">
              Six words that <span className="text-secondary">redefine</span> our existence.
            </p>
          </div>
          <div className="text-stroke text-8xl font-black hidden lg:block select-none font-mono-label">06 WORDS</div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-on-surface/10 border border-on-surface/10">
          {preambleWords.map((w) => (
            <div key={w.numeral} className="group relative p-10 bg-background hover:bg-surface-container-low transition-all duration-500 overflow-hidden reveal-on-scroll min-h-95 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline gap-6 mb-6">
                  <span className={`text-headline-md font-headline-md font-extrabold ${w.colorScheme === "orange" ? "text-primary" : "text-secondary"}`}>{w.numeral}</span>
                  <h3 className="text-headline-md font-headline-md uppercase text-on-surface font-extrabold">{w.word}</h3>
                </div>
                <p className="text-body-md text-on-surface-variant leading-relaxed font-light"><FormattedText text={w.body} /></p>
              </div>
              <div className={`absolute bottom-0 left-0 w-full h-1 ${w.colorScheme === "orange" ? "bg-primary" : "bg-secondary"} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const featured = corePillars.filter((p) => p.isFeatured);
  const rest = corePillars.filter((p) => !p.isFeatured);
  return (
    <section id="pillars" className={`py-32 bg-surface-container-lowest border-y border-on-surface/10 scroll-mt-16`}>
      <div className={`${MAX} ${PAD}`}>
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div className="reveal-on-scroll">
            <h2 className="text-label-caps font-label-caps text-secondary uppercase mb-6 tracking-[0.4em]">Core Pillars</h2>
            <h3 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg uppercase max-w-xl text-on-surface font-extrabold">
              A blueprint for the <span className="text-primary">next era.</span>
            </h3>
          </div>
          <p className="text-body-md text-on-surface-variant max-w-sm reveal-on-scroll leading-relaxed font-light">
            Rejecting the inefficiency of the past for a verified, meritocratic future.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {featured.map((t) => (
            <div key={t.title} className="brutalist-border p-10 bg-background card-hover reveal-on-scroll">
              <div className="flex justify-between items-start mb-8">
                <span className={`material-symbols-outlined ${t.colorScheme === "orange" ? "text-primary" : "text-secondary"}`} style={{ fontSize: "2.5rem" }}>
                  {t.icon}
                </span>
                <span className="text-mono-label text-outline font-bold uppercase tracking-widest font-mono-label text-xs">{t.constitutionalBasis}</span>
              </div>
              <h4 className="text-headline-md uppercase mb-4 text-on-surface font-extrabold">{t.title}</h4>
              <p className="text-body-md text-on-surface-variant leading-relaxed font-light">{t.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rest.map((t) => (
            <div key={t.title} className="brutalist-border p-6 bg-background card-hover reveal-on-scroll">
              <span className="material-symbols-outlined text-on-surface mb-4 block" style={{ fontSize: "1.75rem" }}>{t.icon}</span>
              <h4 className="text-headline-md text-base uppercase mb-3 text-on-surface font-extrabold">{t.title}</h4>
              <p className="text-body-md text-sm text-on-surface-variant leading-relaxed font-light">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeStandFor() {
  return (
    <section id="stand" className={`py-32 scroll-mt-16`}>
      <div className={`${MAX} ${PAD}`}>
        <h2 className="text-label-caps font-label-caps text-primary uppercase mb-6 tracking-[0.4em]">What We Stand For</h2>
        <h3 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg uppercase leading-tight text-on-surface mb-16 max-w-4xl font-extrabold">
          Ten <span className="text-secondary ">non-negotiables.</span>
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-on-surface/10 border border-on-surface/10">
          {whatWeStandFor.map((s, i) => (
            <div key={s.title} className="p-8 bg-background reveal-on-scroll flex flex-col justify-between">
              <div>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-mono-label text-primary font-bold font-mono-label text-sm">{String(i + 1).padStart(2, "0")}</span>
                  <h4 className="text-headline-md text-lg uppercase text-on-surface font-extrabold">{s.title}</h4>
                </div>
                <ul className="space-y-3">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-3 text-body-md text-on-surface-variant text-sm font-light">
                      <span className="text-primary mt-1.5 w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section className={`py-32 bg-surface-container-lowest border-y border-on-surface/10`}>
      <div className={`${MAX} ${PAD}`}>
        <h2 className="text-label-caps font-label-caps text-secondary uppercase mb-6 tracking-[0.4em]">Leadership Criteria</h2>
        <h3 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg uppercase leading-tight text-on-surface mb-16 max-w-4xl font-extrabold">
          Governance is a <span className="text-primary ">profession.</span>
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {leadershipCriteria.map((l) => (
            <div key={l.role} className="brutalist-border p-8 bg-background card-hover reveal-on-scroll flex flex-col justify-between">
              <div>
                <h4 className="text-headline-md text-lg uppercase mb-6 text-on-surface font-extrabold">{l.role}</h4>
                <ul className="space-y-3">
                  {l.requirements.map((r) => (
                    <li key={r} className="text-body-md text-sm text-on-surface-variant flex gap-2 font-light">
                      <span className="text-primary">→</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SharedValues() {
  return (
    <section className={`py-32`}>
      <div className={`${MAX} ${PAD}`}>
        <h2 className="text-label-caps font-label-caps text-primary uppercase mb-6 tracking-[0.4em]">Shared Demands</h2>
        <h3 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg uppercase leading-tight text-on-surface mb-16 max-w-4xl font-extrabold">
          {sharedValues.title}
        </h3>
        <div className="space-y-px bg-on-surface/10 border border-on-surface/10">
          {sharedValues.demands.map((d) => (
            <div key={d.num} className="bg-background p-8 flex gap-8 hover:bg-surface-container-low transition-colors reveal-on-scroll">
              <span className="text-headline-md font-headline-md text-primary shrink-0 font-extrabold">{d.num}</span>
              <p className="text-body-md text-on-surface leading-relaxed">{d.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConstitutionalValues() {
  const color = (t: string) =>
    t === "orange" ? "border-primary/45 text-primary bg-primary/5 hover:bg-primary/10"
      : t === "green" ? "border-secondary/45 text-secondary bg-secondary/5 hover:bg-secondary/10"
        : "border-on-surface/30 text-on-surface-variant bg-surface-container-low";
  return (
    <section className={`py-32 bg-surface-container-lowest border-y border-on-surface/10`}>
      <div className={`${MAX} ${PAD}`}>
        <h2 className="text-label-caps font-label-caps text-secondary uppercase mb-6 tracking-[0.4em]">Constitutional Values</h2>
        <h3 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg uppercase leading-tight text-on-surface mb-16 max-w-4xl font-extrabold">
          The full <span className="text-primary ">vocabulary.</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {constitutionalValues.map((v) => (
            <span key={v.label} className={`brutalist-border px-5 py-3 text-mono-label uppercase tracking-widest font-semibold transition-colors duration-200 cursor-default ${color(v.type)}`}>
              {v.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function GapBanner() {
  return (
    <section className={`py-32  grid-bg`}>
      <div className={`${MAX} ${PAD} text-center`}>
        {gapBanner.text.map((line) => {
          const isHighlight = gapBanner.highlights.includes(line);
          return (
            <p
              key={line}
              className={`mb-8 ${isHighlight ? "text-headline-lg-mobile md:text-headline-lg font-headline-lg uppercase font-extrabold" : "text-body-lg text-on-surface-variant font-light"} leading-tight`}
            >
              <FormattedText text={line} />
            </p>
          );
        })}
      </div>
    </section>
  );
}

function Join({ onJoinClick }: { onJoinClick: () => void }) {
  return (
    <section id="join" className={`py-32 bg-primary/5 border-y border-primary/20 scroll-mt-16`}>
      <div className={`${MAX} ${PAD} grid lg:grid-cols-2 gap-16 items-stretch`}>
        <div className="reveal-on-scroll flex flex-col justify-between">
          <div>
            <h2 className="text-label-caps font-label-caps text-primary uppercase mb-6 tracking-[0.4em]">Membership Protocol</h2>
            <h3 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg uppercase mb-10 leading-tight text-on-surface font-extrabold"><FormattedText text={whoCanJoin.title} /></h3>
            <p className="text-body-lg text-on-surface-variant mb-6 leading-relaxed font-light">{whoCanJoin.body}</p>
            <p className="text-body-md text-on-surface mb-6 leading-relaxed  font-light">{whoCanJoin.criteria}</p>
          </div>
        </div>
        <div className="reveal-on-scroll">
          <div className="bg-surface-container-lowest p-12 brutalist-border relative overflow-hidden h-fit flex flex-col justify-between">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 blur-[100px]" />
            <div>
              <h4 className="text-headline-md uppercase mb-6 text-on-surface font-extrabold">Membership</h4>
              <p className="text-body-md text-on-surface-variant  leading-relaxed font-light">{whoCanJoin.membership}</p>
            </div>
            <div className="flex justify-center items-center my-6">

              <img src="/logo-transparent.png" alt="NEWGAP Logo" className="h-64 w-auto object-contain" />
            </div>
            <button onClick={onJoinClick} className="btn-retro-primary w-full py-5 text-sm font-bold">
              Join NEWGAP
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Alliance() {
  return (
    <section id="alliance" className={`py-32 bg-surface-container/30 relative overflow-hidden scroll-mt-16`}>
      <SwarmSwarm />
      <div className={`${MAX} ${PAD} relative z-10`}>
        <div className="flex flex-col lg:flex-row items-start gap-16">
          <div className="flex-1 reveal-on-scroll">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-14 text-primary flex items-center justify-center shrink-0">
                <CockroachSvg className="w-full h-full" />
              </div>
              <div className="bg-primary text-on-primary px-4 py-2 text-mono-label font-bold uppercase tracking-[0.2em] text-xs">
                {allianceSection.status}
              </div>
            </div>
            <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-xl uppercase mb-4 leading-none text-on-surface font-extrabold tracking-tighter">
              <span className="text-primary ">Cockroach</span> Janta Party
            </h2>
            <p className="text-mono-label text-on-surface-variant uppercase tracking-widest mb-10 font-bold font-mono-label">{allianceSection.sub}</p>
            <div className="space-y-4 mb-8">
              {allianceSection.quotes.map((q) => (
                <p key={q} className="text-body-lg text-on-surface   border-l-2 block font-serif border-primary/30 pl-6">{q}</p>
              ))}
            </div>
            <p className="text-body-md text-on-surface-variant mb-6 leading-relaxed font-light"><FormattedText text={allianceSection.preamble} /></p>
            <p className="text-body-md text-on-surface mb-8 leading-relaxed font-medium"><FormattedText text={allianceSection.together} /></p>
            <div className="flex flex-wrap gap-2 mb-8">
              {allianceSection.pills.map((p) => (
                <span key={p} className="brutalist-border px-3 py-1.5 text-mono-label text-xs uppercase tracking-widest text-on-surface font-mono-label font-semibold bg-background">{p}</span>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full reveal-on-scroll">
            <div className="bg-background brutalist-border p-10 mb-6">
              <h4 className="text-headline-md uppercase mb-6 text-on-surface font-extrabold">{allianceSection.membership.title}</h4>
              <ul className="space-y-4">
                {allianceSection.membership.items.map((it) => (
                  <li key={it} className="flex gap-3 text-body-md text-on-surface-variant text-sm font-light">
                    <span className="text-primary mt-1.5 w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary/5 brutalist-border border-primary/30 p-8 backdrop-blur-md">
              <p className="text-body-md text-on-surface leading-relaxed font-light"><FormattedText text={allianceSection.openNote} /></p>
              <a href={ctas.secondary.url} target="_blank" rel="noreferrer" className="btn-retro-secondary inline-flex items-center gap-1.5 mt-6 px-6 py-3 text-xs font-bold">
                {ctas.secondary.label.replace("↗", "").trim()}
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalWord() {
  return (
    <section id="commitment" className={`py-48 text-center reveal-on-scroll`}>
      <div className={`${MAX} ${PAD}`}>
        <h2 className="text-label-caps font-label-caps text-outline uppercase mb-16 tracking-[1em] font-extrabold">The Commitment</h2>
        {finalWord.lines.map((line) => (
          <p key={line} className="text-headline-lg-mobile md:text-headline-xl font-headline-xl uppercase mb-10 leading-none text-on-surface font-extrabold tracking-wide">
            <FormattedText text={line} />
          </p>
        ))}
        <div className="flex justify-center items-center gap-8 mt-16">
          <div className="h-px w-24 bg-primary/30" />
          <span className="text-headline-lg-mobile md:text-headline-lg font-headline-lg font-black text-secondary uppercase tracking-widest">{finalWord.closing}</span>
          <div className="h-px w-24 bg-primary/30" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className={`border-t border-on-surface/10 py-10`}>
      <div className={`${MAX} ${PAD} flex flex-col lg:flex-row items-center justify-between gap-4 text-mono-label font-mono-label uppercase tracking-widest text-on-surface-variant`}>
        <div className="">
          <span className="text-secondary">NEW</span><span className="text-primary font-bold">GAP</span> · {partyInfo.preamble.founding}</div>
        <div className="font-mono-label text-[10px]">{partyInfo.hq}</div>
        <div className="font-semibold text-xs flex gap-4 items-center">
          <Link href="/manifesto" className="hover:text-primary transition-colors">Manifesto</Link>
          <span>·</span>
          <span>© NEWGAP — No Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  useRevealOnScroll();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-primary selection:text-on-primary">
      <Nav onJoinClick={() => setIsModalOpen(true)} />
      <main className="pt-16">
        <Hero onVerifyClick={() => setIsVerifyModalOpen(true)} />
        <Preamble />
        <SixWordsSection />
        <Pillars />
        <WhatWeStandFor />
        <Leadership />
        <SharedValues />
        <ConstitutionalValues />
        <GapBanner />
        <Join onJoinClick={() => setIsModalOpen(true)} />
        <Alliance />
        <FinalWord />
      </main>
      <Footer />
      {isModalOpen && (
        <MembershipModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
      {isVerifyModalOpen && (
        <VerifyModal isOpen={isVerifyModalOpen} onClose={() => setIsVerifyModalOpen(false)} />
      )}
    </div>
  );
}

function MembershipModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState<"form" | "continue" | "card">("form");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    email: "",
  });
  const [uniqueId, setUniqueId] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");

  useEffect(() => {
    if (!uniqueId) return;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const verificationUrl = origin ? `${origin}/verify?id=${uniqueId}` : uniqueId;
    QRCode.toDataURL(verificationUrl, { margin: 1, width: 300 })
      .then((url) => {
        setQrCodeDataUrl(url);
      })
      .catch((err) => {
        console.error("Failed to generate QR Code:", err);
      });
  }, [uniqueId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.dob || !formData.email) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/check-records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "An error occurred during registration.");
        setIsSubmitting(false);
        return;
      }

      setUniqueId(data.uniqueId);
      setIssueDate(data.issueDate);
      setIsSubmitting(false);
      setStep("continue");
    } catch (err) {
      console.error("Submission error: ", err);
      setSubmitError("Failed to submit form. Please check your connection and try again.");
      setIsSubmitting(false);
    }
  };



  const buildCardCanvas = (): Promise<HTMLCanvasElement> => {
    return new Promise(async (resolve) => {
      // wait for Sora to be available
      await document.fonts.load("bold 28px 'Sora'");
      await document.fonts.load("400 16px 'Sora'");

      const canvas = document.createElement("canvas");
      const scale = 2;
      const W = 860, H = 440;
      canvas.width = W * scale;
      canvas.height = H * scale;

      const ctx = canvas.getContext("2d")!;
      ctx.scale(scale, scale);

      const SORA = (size: number, weight: 400 | 600 | 700 | 800 = 400) =>
        `${weight} ${size}px 'Sora', sans-serif`;

      const label = (text: string, lx: number, ly: number) => {
        ctx.fillStyle = "#888880";
        ctx.font = SORA(14, 700);
        ctx.fillText(text.toUpperCase(), lx, ly);
      };

      const drawContent = () => {
        const x = 96;

        // ── background ─────────────────────────────────────
        ctx.fillStyle = "#f6f5f0";
        ctx.fillRect(0, 0, W, H);

        // ── border ─────────────────────────────────────────
        ctx.strokeStyle = "#e0ddd6";
        ctx.lineWidth = 1;
        ctx.strokeRect(0.5, 0.5, W - 1, H - 1);

        // ── left stripes ───────────────────────────────────
        ctx.fillStyle = "#22572c";
        ctx.fillRect(0, 0, 32, H);
        ctx.fillStyle = "#d46b4e";
        ctx.fillRect(32, 0, 16, H);

        // ── title ──────────────────────────────────────────
        ctx.fillStyle = "#1a1a1a";
        ctx.font = SORA(28, 800);
        ctx.fillText("NEWGAP MEMBER ID", x, 76);

        // line 1 — official party name
        ctx.fillStyle = "#d46b4e";
        ctx.font = SORA(16, 700);
        ctx.fillText(partyInfo.fullName.toUpperCase(), x, 96);

        // line 2 — founding info
        ctx.fillStyle = "#888880";
        ctx.font = SORA(14, 400);
        ctx.fillText(partyInfo.preamble.founding.toUpperCase(), x, 114);

        // ── divider ────────────────────────────────────────
        ctx.strokeStyle = "#d0cdc6";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, 132);
        ctx.lineTo(W - 48, 132);
        ctx.stroke();

        // ── NAME ───────────────────────────────────────────
        label("Name", x, 166);
        ctx.fillStyle = "#1a1a1a";
        ctx.font = SORA(24, 700);
        ctx.fillText(formData.name.toUpperCase(), x, 192);

        // ── MEMBER UNIQUE ID ───────────────────────────────
        label("Member Unique ID", x, 226);
        ctx.fillStyle = "#22572c";
        ctx.font = SORA(28, 800);
        ctx.fillText(uniqueId, x, 256);

        // ── PHONE + DOB ────────────────────────────────────
        label("Phone", x, 292);
        ctx.fillStyle = "#1a1a1a";
        ctx.font = SORA(20, 600);
        ctx.fillText(formData.phone, x, 314);

        label("D.O.B", W / 2, 292);
        ctx.fillStyle = "#1a1a1a";
        ctx.font = SORA(20, 600);
        ctx.fillText(formData.dob, W / 2, 314);

        // ── EMAIL + ISSUE DATE ─────────────────────────────
        label("Email", x, 350);
        ctx.fillStyle = "#555550";
        ctx.font = SORA(20, 400);
        ctx.fillText(formData.email.toLowerCase(), x, 372);

        label("Issue Date", W / 2, 350);
        ctx.fillStyle = "#1a1a1a";
        ctx.font = SORA(20, 600);
        ctx.fillText(issueDate, W / 2, 372);
      };

      // Load logo and QR code
      const logoImg = new Image();
      logoImg.crossOrigin = "anonymous";
      logoImg.src = "/logo-transparent.png";

      const qrImg = new Image();
      const origin = typeof window !== "undefined" ? window.location.origin : "https://newgap.org";
      const verificationUrl = origin ? `${origin}/verify?id=${uniqueId}` : uniqueId;
      const qrUrl = qrCodeDataUrl || (await QRCode.toDataURL(verificationUrl, { margin: 1, width: 300 }));
      qrImg.src = qrUrl;

      let logoLoaded = false;
      let qrLoaded = false;

      const checkAndResolve = () => {
        if (logoLoaded && qrLoaded) {
          drawContent();

          // Draw logo
          if (logoImg.complete && logoImg.naturalWidth !== 0) {
            ctx.drawImage(logoImg, W - 48 - 96, 36, 96, 96);
          } else {
            // fallback fist placeholder
            ctx.fillStyle = "#22572c";
            ctx.beginPath();
            ctx.arc(W - 48 - 48, 84, 40, 0, Math.PI * 2);
            ctx.fill();
          }

          // Draw QR code
          if (qrImg.complete && qrImg.naturalWidth !== 0) {
            ctx.drawImage(qrImg, W - 48 - 155, 225, 155, 155);

            // QR Code label
            // ctx.fillStyle = "#888880";
            // ctx.font = SORA(11, 700);
            // ctx.fillText("SCAN TO VERIFY", W - 48 - 140 + 70 - ctx.measureText("SCAN TO VERIFY").width / 2, 180 + 140 + 20);
          }

          resolve(canvas);
        }
      };

      logoImg.onload = () => {
        logoLoaded = true;
        checkAndResolve();
      };

      logoImg.onerror = () => {
        logoLoaded = true;
        checkAndResolve();
      };

      qrImg.onload = () => {
        qrLoaded = true;
        checkAndResolve();
      };

      qrImg.onerror = () => {
        qrLoaded = true;
        checkAndResolve();
      };
    });
  };

  // ── consumers ──────────────────────────────────────────────
  const downloadImage = async () => {
    const canvas = await buildCardCanvas();
    const a = document.createElement("a");
    a.download = `NEWGAP_${formData.name.replace(/\s+/g, "_")}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  };

  const handlePrint = async () => {
    const canvas = await buildCardCanvas();
    const dataUrl = canvas.toDataURL("image/png");

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to print your ID card.");
      return;
    }

    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>NEWGAP ID Card — ${formData.name}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #f6f5f0;
          }
          img {
            max-width: 90%;
            border: 2px solid #1a1a1a;
            box-shadow: 6px 6px 0px #1a1a1a;
          }
          @page { size: A4 landscape; margin: 12mm; }
          @media print {
            body { background: #f6f5f0; }
            img  { box-shadow: none; max-width: 100%; }
          }
        </style>
      </head>
      <body>
        <img
          src="${dataUrl}"
          onload="window.print(); setTimeout(() => window.close(), 500);"
        />
      </body>
    </html>
  `);
    printWindow.document.close();
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      {/* Modal Box */}
      <div
        className="w-full max-w-lg bg-[#f6f5f0] border border-[#1a1a1a] p-8 relative shadow-[8px_8px_0px_#1a1a1a] overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent click propagation, making closing from outside impossible
      >
        <div className="absolute top-0 inset-x-0 h-1.5 bg-[#22572c]" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-[#f6f5f0] border-2 border-[#1a1a1a] hover:bg-[#d46b4e]/20  font-black transition-all flex items-center justify-center aspect-square select-none w-5 h-5 leading-none z-10"
          style={{ boxShadow: '2px 2px 0px #000' }}
        >
          <X className="size-4" />
        </button>

        {step === "form" ? (
          <div>
            <div className="mb-6 border-b-2 border-[#1a1a1a] pb-4">
              <h3 className="text-headline-sm uppercase text-[#1a1a1a] font-extrabold tracking-tight">
                MEMBER ID Registration
              </h3>
              <p className="text-xs font-mono-label text-[#d46b4e] uppercase tracking-widest mt-1">
                Enter your details to generate your official ID
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-mono-label uppercase tracking-wider text-[#1a1a1a] mb-2 font-bold">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter full name"
                  className="w-full bg-[#f6f5f0] border border-[#1a1a1a] px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#d46b4e] font-mono-label"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-label uppercase tracking-wider text-[#1a1a1a] mb-2 font-bold">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Mobile number"
                    className="w-full min-w-0 bg-[#f6f5f0] border border-[#1a1a1a] px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#d46b4e] font-mono-label"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono-label uppercase tracking-wider text-[#1a1a1a] mb-2 font-bold">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    required
                    className="w-full min-w-0 bg-[#f6f5f0] border border-[#1a1a1a] px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#d46b4e] font-mono-label"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-label uppercase tracking-wider text-[#1a1a1a] mb-2 font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="name@domain.com"
                  className="w-full bg-[#f6f5f0] border border-[#1a1a1a] px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#d46b4e] font-mono-label"
                />
              </div>

              {submitError && (
                <div className="bg-[#d46b4e]/10 border border-[#d46b4e] text-[#d46b4e] p-3 text-xs font-mono-label font-bold uppercase tracking-wider">
                  Oops! {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-retro-primary w-full py-4 text-sm font-bold mt-2 flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-w border-t-transparent rounded-full animate-duration-1000" />
                    PROCESSING...
                  </>
                ) : (
                  "SUBMIT & GENERATE ID"
                )}
              </button>
            </form>
          </div>
        ) : step === "continue" ? (
          <div className="text-center py-6 flex flex-col items-center">
            <span className="material-symbols-outlined text-6xl text-[#22572c] animate-pulse mb-6">verified_user</span>
            <h3 className="text-headline-md uppercase text-[#1a1a1a] font-extrabold mb-4">Credentials Processed</h3>
            <p className="text-body-md text-[#666666] mb-8 leading-relaxed">
              We have processed your application. Click continue to generate and render your official, unique <span className="font-bold text-[#d46b4e]">NEWGAP MEMBER ID card</span>.
            </p>
            <button
              onClick={() => setStep("card")}
              className="btn-retro-primary w-full py-4 text-sm font-bold"
            >
              CONTINUE
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="mb-4 border-b-2 border-[#1a1a1a] pb-3 w-full text-center">
              <h3 className="text-headline-sm uppercase text-[#1a1a1a] font-extrabold tracking-tight">
                ID Generated Successfully!
              </h3>
              <p className="text-xs font-mono-label text-[#22572c] uppercase tracking-widest mt-1">
                Your digital MEMBER ID card is ready
              </p>
            </div>

            {/* Visual representation of the ID card on screen */}
            <div
              ref={cardRef}
              id="id-card-preview"
              className="w-full aspect-86/44 border border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] bg-[#f6f5f0] p-4 sm:p-6 font-mono-label relative my-4 flex flex-col justify-between shrink-0"
            >
              <div className="absolute top-0 bottom-0 left-0 w-3 sm:w-4 bg-[#22572c]" />
              <div className="absolute top-0 bottom-0 left-3 sm:left-4 w-1.5 sm:w-2 bg-[#d46b4e]" />

              <div className="pl-3 sm:pl-6 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0.5">
                    <h4 className="text-xs sm:text-[14px] font-black uppercase tracking-tight text-[#1a1a1a] leading-none">
                      NEWGAP MEMBER ID
                    </h4>
                    <p className="text-[7px] sm:text-[8px] uppercase tracking-wider text-[#d46b4e] font-bold  leading-none">
                      {partyInfo.fullName.toUpperCase()}
                    </p>
                    <p className="text-[6px] sm:text-[7px] uppercase tracking-wider text-[#888880] font-medium  leading-none">
                      {partyInfo.preamble.founding.toUpperCase()}
                    </p>
                  </div>

                  <img src="/logo-transparent.png" crossOrigin="anonymous" alt="Logo" className="w-9 sm:w-12 h-9 sm:h-12 object-contain -mt-1.5" />
                </div>

                <div className="h-px bg-[#1a1a1a]/20 mb-3" />

                <div className="flex justify-between items-end gap-3 mt-1 sm:mt-2">
                  <div className="grid grid-cols-1 gap-y-1.5 sm:gap-y-2 text-xs flex-1 min-w-0">
                    <div>
                      <span className="text-[7px] uppercase font-black text-[#666666] block tracking-wide leading-none mb-0.5 sm:mb-1">NAME</span>
                      <span className="font-bold uppercase text-[10px] sm:text-[12px] text-[#1a1a1a] leading-none truncate block">{formData.name}</span>
                    </div>
                    <div>
                      <span className="text-[7px] uppercase font-black text-[#666666] block tracking-wide leading-none mb-0.5 sm:mb-1">MEMBER UNIQUE ID</span>
                      <span className="font-black text-xs sm:text-[14px] text-[#22572c] uppercase leading-none block">{uniqueId}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[7px] uppercase font-black text-[#666666] block tracking-wide leading-none mb-0.5 sm:mb-1">PHONE</span>
                        <span className="font-semibold text-[9px] sm:text-[10px] text-[#1a1a1a] leading-none block">{formData.phone}</span>
                      </div>
                      <div>
                        <span className="text-[7px] uppercase font-black text-[#666666] block tracking-wide leading-none mb-0.5 sm:mb-1">D.O.B</span>
                        <span className="font-semibold text-[9px] sm:text-[10px] text-[#1a1a1a] leading-none block">{formData.dob}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[7px] uppercase font-black text-[#666666] block tracking-wide leading-none mb-0.5 sm:mb-1">EMAIL</span>
                        <span className="font-semibold text-[9px] sm:text-[10px] lowercase text-[#666666] leading-none truncate block">{formData.email}</span>
                      </div>
                      <div>
                        <span className="text-[7px] uppercase font-black text-[#666666] block tracking-wide leading-none mb-0.5 sm:mb-1">ISSUE DATE</span>
                        <span className="font-semibold text-[9px] sm:text-[10px] text-[#1a1a1a] leading-none block">{issueDate}</span>
                      </div>
                    </div>
                  </div>
                  {qrCodeDataUrl && (
                    <div className="flex flex-col items-center shrink-0 -mb-1 sm:-mb-2">
                      <img
                        src={qrCodeDataUrl}
                        alt="QR Code"
                        className="w-14 sm:w-20 h-14 sm:h-20 object-contain border border-[#1a1a1a]/25 p-0.5 bg-white shadow-[2px_2px_0px_rgba(0,0,0,0.1)]"
                      />
                      {/* <span className="text-[5px] sm:text-[7px] uppercase tracking-wider text-[#888880] font-black mt-1 leading-none">SCAN TO VERIFY</span> */}
                    </div>
                  )}
                </div>
              </div>
            </div>


            <div className="w-full space-y-3 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={downloadImage}
                  className="btn-retro-secondary py-3 text-xs font-bold flex justify-center items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">download</span> DOWNLOAD PNG
                </button>
                <button
                  onClick={handlePrint}
                  className="btn-retro-secondary py-3 text-xs font-bold flex justify-center items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">print</span> PRINT PDF
                </button>
              </div>

              <button
                onClick={onClose}
                className="btn-retro-primary w-full py-3.5 text-xs font-bold"
              >
                DONE
              </button>
            </div>
          </div>
        )
        }
      </div>
    </div>
  );
}

function VerifyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [memberId, setMemberId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    verified: boolean;
    name?: string;
    uniqueId?: string;
    issueDate?: string;
    error?: string;
  } | null>(null);

  if (!isOpen) return null;

  const performLookup = async (id: string) => {
    if (!id.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/check-records?id=${encodeURIComponent(id.trim())}`);
      const data = await res.json();
      if (res.ok) {
        setResult({
          verified: true,
          name: data.name,
          uniqueId: data.uniqueId,
          issueDate: data.issueDate,
        });
      } else {
        setResult({
          verified: false,
          error: data.error || "Member ID could not be found.",
        });
      }
    } catch {
      setResult({
        verified: false,
        error: "A network error occurred. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(memberId);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-mono-label">
      <div
        className="w-full max-w-md bg-[#f6f5f0] border border-[#1a1a1a] p-8 relative shadow-[8px_8px_0px_#1a1a1a] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-[#f6f5f0] border-2 border-[#1a1a1a] hover:bg-[#d46b4e]/20 font-black transition-all flex items-center justify-center aspect-square select-none w-5 h-5 leading-none z-10 cursor-pointer"
          style={{ boxShadow: '2px 2px 0px #000' }}
        >
          <X className="size-4" />
        </button>

        <div className="absolute top-0 inset-x-0 h-1.5 bg-[#22572c]" />

        {loading ? (
          <div className="py-12 text-center flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin size-12 text-[#d46b4e]" />
            <div>
              <h3 className="text-lg font-extrabold uppercase text-[#1a1a1a]">
                Querying Live Registry
              </h3>
              <p className="text-xs text-[#888880] uppercase tracking-wider mt-1">
                Checking official records...
              </p>
            </div>
          </div>
        ) : result ? (
          <div>
            {result.verified ? (
              <div className="text-center">
                <div className="inline-flex items-center justify-center bg-[#22572c]/10 border border-[#22572c] p-4 rounded-full mb-4">
                  <ShieldCheck className="size-12 text-[#22572c]" />
                </div>
                <h3 className="text-xl font-extrabold text-[#22572c] uppercase tracking-tight">
                  Credential Verified
                </h3>
                <p className="text-xs font-bold text-[#888880] uppercase tracking-widest mt-1">
                  OFFICIAL NEWGAP MEMBER RECORD
                </p>

                <div className="mt-6 border-2 border-[#1a1a1a] bg-[#f6f5f0] p-4 text-left relative shadow-[4px_4px_0px_#1a1a1a] space-y-4">
                  <div className="absolute top-0 bottom-0 left-0 w-2 bg-[#22572c]" />
                  <div className="pl-4">
                    <span className="block text-[8px] uppercase tracking-widest font-black text-[#888880] mb-1">
                      MEMBER NAME
                    </span>
                    <span className="block text-sm font-bold uppercase text-[#1a1a1a]">
                      {result.name}
                    </span>
                  </div>
                  <div className="pl-4 border-t border-[#1a1a1a]/10 pt-3">
                    <span className="block text-[8px] uppercase tracking-widest font-black text-[#888880] mb-1">
                      UNIQUE MEMBER ID
                    </span>
                    <span className="block text-xs font-black text-[#22572c] uppercase tracking-wider">
                      {result.uniqueId}
                    </span>
                  </div>
                  <div className="pl-4 border-t border-[#1a1a1a]/10 pt-3">
                    <span className="block text-[8px] uppercase tracking-widest font-black text-[#888880] mb-1">
                      REGISTRY TIMESTAMP
                    </span>
                    <span className="block text-xs font-semibold text-[#1a1a1a]">
                      {result.issueDate}
                    </span>
                  </div>
                  <div className="pl-4 border-t border-[#1a1a1a]/10 pt-3">
                    <span className="block text-[8px] uppercase tracking-widest font-black text-[#888880] mb-1">
                      STATUS
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-[#22572c]/15 text-[#22572c] border border-[#22572c]/30 text-[9px] font-black uppercase tracking-wider">
                      <span className="size-1.5 rounded-full bg-[#22572c] animate-ping" />
                      Active Member
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center justify-center bg-[#d46b4e]/10 border border-[#d46b4e] p-4 rounded-full mb-4">
                  <ShieldAlert className="size-12 text-[#d46b4e]" />
                </div>
                <h3 className="text-xl font-extrabold text-[#d46b4e] uppercase tracking-tight">
                  Verification Failed
                </h3>
                <p className="text-xs font-bold text-[#888880] uppercase tracking-widest mt-1">
                  INVALID CREDENTIALS
                </p>

                <div className="mt-6 bg-[#d46b4e]/10 border border-[#d46b4e] text-[#d46b4e] p-4 text-xs font-bold uppercase tracking-wider text-left leading-relaxed shadow-[4px_4px_0px_#d46b4e]">
                  Oops! {result.error || "The scanned ID does not exist in the official database."}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setResult(null);
                setMemberId("");
              }}
              className="btn-retro-secondary w-full py-4 text-xs font-bold mt-8 flex justify-center items-center gap-2 cursor-pointer"
            >
              Verify Another Card
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6 border-b-2 border-[#1a1a1a] pb-4">
              <h3 className="text-headline-sm uppercase text-[#1a1a1a] font-extrabold tracking-tight flex items-center gap-2">
                <ShieldCheck className="size-5 text-[#d46b4e]" />
                MEMBER ID VERIFICATION
              </h3>
              <p className="text-xs font-mono-label text-[#d46b4e] uppercase tracking-widest mt-1">
                Enter unique ID to check registry validity
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-mono-label uppercase tracking-wider text-[#1a1a1a] mb-2 font-bold">
                  Unique Member ID
                </label>
                <input
                  type="text"
                  required
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  placeholder="e.g. NG-XYZ2026..."
                  className="w-full bg-[#f6f5f0] border-2 border-[#1a1a1a] px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#d46b4e] font-bold uppercase tracking-wider"
                />
              </div>

              <button
                type="submit"
                className="btn-retro-primary w-full py-4 text-sm font-bold flex justify-center items-center gap-2 cursor-pointer"
              >
                <Search className="size-4" />
                VERIFY NOW
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return <Index />;
}

