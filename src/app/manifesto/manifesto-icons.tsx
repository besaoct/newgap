import React from "react";

// ── 01. PREAMBLE (The founding contract / code document) ─────────────────────
export function ManifestoIconOne({ className }: { className?: string }) {
  return (
    <div className={`group relative flex items-center justify-center bg-[#f6f5f0] border-2 border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1a1a] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_#1a1a1a] transition-all rounded-[4px] select-none ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full p-1" xmlns="http://www.w3.org/2000/svg">
        {/* Document Outline */}
        <path d="M12 10h18l10 10v32H12V10z" stroke="#1a1a1a" strokeWidth="2.5" fill="#ffffff" />
        {/* Document Fold Flap */}
        <path d="M30 10v10h10" stroke="#1a1a1a" strokeWidth="2.5" fill="#f6f5f0" />
        {/* Text Lines */}
        <line x1="16" y1="24" x2="26" y2="24" stroke="#888880" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="30" x2="36" y2="30" stroke="#888880" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="36" x2="32" y2="36" stroke="#888880" strokeWidth="2" strokeLinecap="round" />
        {/* Code sign </ > */}
        <path d="M16 43.5l-3 2.5 3 2.5" stroke="#22572c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 43.5l3 2.5-3 2.5" stroke="#22572c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Number Badge */}
        <rect x="36" y="36" width="22" height="22" rx="2" fill="#d46b4e" stroke="#1a1a1a" strokeWidth="2" />
        <text x="47" y="52" fill="#f6f5f0" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="monospace">01</text>
      </svg>
    </div>
  );
}

// ── 02. JUSTICE (Scales of justice) ──────────────────────────────────────────
export function ManifestoIconTwo({ className }: { className?: string }) {
  return (
    <div className={`group relative flex items-center justify-center bg-[#f6f5f0] border-2 border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1a1a] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_#1a1a1a] transition-all rounded-[4px] select-none ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full p-1" xmlns="http://www.w3.org/2000/svg">
        {/* Center Stand */}
        <line x1="24" y1="12" x2="24" y2="48" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
        {/* Base */}
        <path d="M16 48h16" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
        {/* Crossbar */}
        <line x1="12" y1="18" x2="36" y2="18" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" className="group-hover:rotate-3 origin-[24px_18px] transition-transform duration-300" />
        
        {/* Left Pan */}
        <g className="group-hover:-translate-y-0.5 transition-transform duration-300">
          <path d="M12 18L8 32h8L12 18z" stroke="#1a1a1a" strokeWidth="1.5" fill="#22572c" fillOpacity="0.1" />
          <path d="M6 32h12" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
        </g>
        
        {/* Right Pan */}
        <g className="group-hover:translate-y-0.5 transition-transform duration-300">
          <path d="M36 18l-4 14h8l-4-14z" stroke="#1a1a1a" strokeWidth="1.5" fill="#22572c" fillOpacity="0.1" />
          <path d="M30 32h12" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Number Badge */}
        <rect x="36" y="36" width="22" height="22" rx="2" fill="#22572c" stroke="#1a1a1a" strokeWidth="2" />
        <text x="47" y="52" fill="#f6f5f0" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="monospace">02</text>
      </svg>
    </div>
  );
}

// ── 03. CORRUPTION (Shield with Rupee symbol and ban slash) ──────────────────
export function ManifestoIconThree({ className }: { className?: string }) {
  return (
    <div className={`group relative flex items-center justify-center bg-[#f6f5f0] border-2 border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1a1a] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_#1a1a1a] transition-all rounded-[4px] select-none ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full p-1" xmlns="http://www.w3.org/2000/svg">
        {/* Shield */}
        <path d="M12 14v14c0 10 12 18 12 18s12-8 12-18V14H12z" stroke="#1a1a1a" strokeWidth="2.5" fill="#ffffff" />
        
        {/* Rupee Symbol */}
        <path d="M19 22h10M19 26h10" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 22c4 0 4 6 0 6h-5" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M22 28l6 7" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />

        {/* Ban Line (slash) */}
        <line x1="15" y1="18" x2="33" y2="38" stroke="#d46b4e" strokeWidth="3" strokeLinecap="round" className="group-hover:scale-110 origin-center transition-transform duration-300" />

        {/* Number Badge */}
        <rect x="36" y="36" width="22" height="22" rx="2" fill="#d46b4e" stroke="#1a1a1a" strokeWidth="2" />
        <text x="47" y="52" fill="#f6f5f0" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="monospace">03</text>
      </svg>
    </div>
  );
}

// ── 04. MERIT & EDUCATION (Graduation cap and terminal line) ─────────────────
export function ManifestoIconFour({ className }: { className?: string }) {
  return (
    <div className={`group relative flex items-center justify-center bg-[#f6f5f0] border-2 border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1a1a] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_#1a1a1a] transition-all rounded-[4px] select-none ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full p-1" xmlns="http://www.w3.org/2000/svg">
        {/* Terminal/Notebook box at the bottom */}
        <rect x="10" y="31" width="26" height="15" rx="1.5" stroke="#1a1a1a" strokeWidth="2" fill="#ffffff" />
        <line x1="14" y1="36" x2="32" y2="36" stroke="#22572c" strokeWidth="1.5" />
        <line x1="14" y1="41" x2="26" y2="41" stroke="#888880" strokeWidth="1.5" />

        {/* Graduation Cap (floating / hovering) */}
        <g className="group-hover:-translate-y-1 transition-transform duration-300">
          <path d="M23 12L37 18L23 24L9 18Z" stroke="#1a1a1a" strokeWidth="2.5" fill="#22572c" fillOpacity="0.25" />
          <path d="M15 20v4.5c0 2 3.5 3.5 8 3.5s8-1.5 8-3.5V20" stroke="#1a1a1a" strokeWidth="2" fill="none" />
          <path d="M23 18v7" stroke="#1a1a1a" strokeWidth="1.5" />
          <circle cx="23" cy="25.5" r="1.5" fill="#1a1a1a" />
        </g>

        {/* Number Badge */}
        <rect x="36" y="36" width="22" height="22" rx="2" fill="#22572c" stroke="#1a1a1a" strokeWidth="2" />
        <text x="47" y="52" fill="#f6f5f0" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="monospace">04</text>
      </svg>
    </div>
  );
}

// ── 05. INCLUSIVITY (Intersecting circles representing gender/equality) ──────
export function ManifestoIconFive({ className }: { className?: string }) {
  return (
    <div className={`group relative flex items-center justify-center bg-[#f6f5f0] border-2 border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1a1a] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_#1a1a1a] transition-all rounded-[4px] select-none ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full p-1" xmlns="http://www.w3.org/2000/svg">
        {/* Heart icon on top */}
        <path d="M23 10.5c-2-3-6-2.5-6.5.5C16 15 23 20 23 20s7-5 6.5-9c-.5-3-4.5-3.5-6.5-.5z" stroke="#1a1a1a" strokeWidth="1.8" fill="#d46b4e" className="group-hover:scale-110 origin-center transition-transform duration-300" />

        {/* Intersecting Venn-like circles representing parity */}
        <g className="group-hover:translate-y-0.5 transition-transform duration-300">
          <circle cx="17" cy="27" r="7.5" stroke="#1a1a1a" strokeWidth="2" fill="#d46b4e" fillOpacity="0.25" />
          <circle cx="27" cy="27" r="7.5" stroke="#1a1a1a" strokeWidth="2" fill="#22572c" fillOpacity="0.25" />
          {/* Equality sign inside the overlap */}
          <line x1="20" y1="25.5" x2="24" y2="25.5" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="20" y1="28.5" x2="24" y2="28.5" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* Number Badge */}
        <rect x="36" y="36" width="22" height="22" rx="2" fill="#d46b4e" stroke="#1a1a1a" strokeWidth="2" />
        <text x="47" y="52" fill="#f6f5f0" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="monospace">05</text>
      </svg>
    </div>
  );
}

// ── 06. SAFEGUARDS (Padlock with keyhole protecting the ballot/shield) ───────
export function ManifestoIconSix({ className }: { className?: string }) {
  return (
    <div className={`group relative flex items-center justify-center bg-[#f6f5f0] border-2 border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1a1a] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_#1a1a1a] transition-all rounded-[4px] select-none ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full p-1" xmlns="http://www.w3.org/2000/svg">
        {/* Shield background behind lock */}
        <path d="M8 30h28" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Padlock Shackle */}
        <path d="M15 25v-8c0-5 10-5 10 0v8" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" className="group-hover:-translate-y-1 transition-transform duration-300" />
        
        {/* Padlock Body */}
        <rect x="11" y="24" width="18" height="17" rx="2" stroke="#1a1a1a" strokeWidth="2.5" fill="#22572c" />
        
        {/* Keyhole */}
        <circle cx="20" cy="31.5" r="2" fill="#1a1a1a" />
        <path d="M20 31.5v5" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />

        {/* Number Badge */}
        <rect x="36" y="36" width="22" height="22" rx="2" fill="#22572c" stroke="#1a1a1a" strokeWidth="2" />
        <text x="47" y="52" fill="#f6f5f0" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="monospace">06</text>
      </svg>
    </div>
  );
}

// ── 07. SWARM ALLIANCE (Cockroach symbol from CJP) ───────────────────────────
export function ManifestoIconSeven({ className }: { className?: string }) {
  return (
    <div className={`group relative flex items-center justify-center bg-[#f6f5f0] border-2 border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1a1a] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_#1a1a1a] transition-all rounded-[4px] select-none ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full p-1" xmlns="http://www.w3.org/2000/svg">
        {/* Swarm Circular Target */}
        <circle cx="20" cy="26" r="14" stroke="#1a1a1a" strokeWidth="1.5" fill="#d46b4e" fillOpacity="0.15" strokeDasharray="3 3" />
        
        {/* Cockroach Body & Legs */}
        <g className="group-hover:rotate-12 group-hover:scale-105 origin-[20px_26px] transition-transform duration-300">
          {/* Legs */}
          <path d="M14 22l-4-2M13 26l-5 0M14 30l-4 2" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M26 22l4-2M27 26l5 0M26 30l4 2" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" />
          
          {/* Main Body */}
          <ellipse cx="20" cy="27" rx="5.5" ry="9.5" fill="#5a2f12" stroke="#1a1a1a" strokeWidth="1.8" />
          {/* Head */}
          <ellipse cx="20" cy="17" rx="3.5" ry="3" fill="#5a2f12" stroke="#1a1a1a" strokeWidth="1.8" />
          {/* Antennae */}
          <path d="M18 14.5c-2.5-4-5-5-7.5-6M22 14.5c2.5-4 5-5 7.5-6" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Number Badge */}
        <rect x="36" y="36" width="22" height="22" rx="2" fill="#d46b4e" stroke="#1a1a1a" strokeWidth="2" />
        <text x="47" y="52" fill="#f6f5f0" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="monospace">07</text>
      </svg>
    </div>
  );
}
