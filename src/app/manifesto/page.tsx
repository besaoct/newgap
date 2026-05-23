"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  ManifestoIconOne,
  ManifestoIconTwo,
  ManifestoIconThree,
  ManifestoIconFour,
  ManifestoIconFive,
  ManifestoIconSix,
  ManifestoIconSeven,
} from "./manifesto-icons";
import { partyInfo } from "@/data/content";

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



export default function ManifestoPage() {
  return (
    <div className="min-h-screen bg-[#f6f5f0] grid-bg flex flex-col justify-between font-mono-label selection:bg-[#d46b4e] selection:text-white">
      {/* Stripe Header */}
      <div className="w-full h-3 bg-[#22572c] shrink-0" />
      <div className="w-full h-1.5 bg-[#d46b4e] shrink-0" />

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12">
     
        {/* Title */}
        <div className="text-center mb-16">
        <Link 
          href="/" 
          className="group mb-12 inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors bg-[#f6f5f0] border-2 border-[#1a1a1a] px-4 py-2 rounded-sm shadow-[2px_2px_0px_#1a1a1a] hover:translate-y-px hover:shadow-[1px_1px_0px_#1a1a1a]"
        >
          <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Homepage
        </Link>

          <h1 className="font-black text-3xl md:text-4xl tracking-tight font-headline-md uppercase text-[#1a1a1a] mt-6 leading-none">
           {FormattedText({text:"NEWGAP"})} <span className="">Manifesto</span>
          </h1>
          <p className="text-xs uppercase text-[#888880] tracking-widest font-black mt-3">
            Code of Action for a Sovereign, Socialist, Secular, Democratic Republic · Est. 2026
          </p>
        </div>

        {/* Preamble / Founding Contract */}
        <div className="bg-[#f6f5f0] border-2 border-[#1a1a1a] p-8 shadow-[8px_8px_0px_#1a1a1a] mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2.5 h-full bg-[#d46b4e]" />
          <div className="flex items-center gap-4 mb-6 pl-3">
            <ManifestoIconOne className="size-14 shrink-0" />
            <h2 className="text-lg font-black uppercase text-[#1a1a1a] leading-tight">
              Preamble: The Founding Contract
            </h2>
          </div>
          <div className="space-y-4 text-sm text-[#1a1a1a]/85 leading-relaxed pl-3 font-medium">
            <p>
              India is not a failed country. India is a promise that has been repeatedly betrayed by the people entrusted to keep it. The Constitution is not broken; the people charged with upholding it have repeatedly chosen not to.
            </p>
            <p>
              NEWGAP (New Generation Action Party) exists to enforce that contract. We reject the legacy of transactional politics, dynasty rule, and corporate-sponsored campaigns. We compile a new system built on transparent code, peer-to-peer accountability, and merit-driven action.
            </p>
          </div>
        </div>

        {/* Manifesto Pillars */}
        <div className="space-y-8">
          
          {/* Law & Order */}
          <div className="bg-[#f6f5f0] border-2 border-[#1a1a1a] p-8 shadow-[6px_6px_0px_#1a1a1a] relative">
            <div className="absolute top-0 right-0 bg-[#d46b4e] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 border-b-2 border-l-2 border-[#1a1a1a]">
              Strict Enforcement
            </div>
            <div className="flex items-center gap-4 mb-6">
              <ManifestoIconTwo className="size-14 shrink-0" />
              <h3 className="text-md font-black uppercase text-[#1a1a1a] leading-tight">
                Law, Order, and Uncompromising Justice
              </h3>
            </div>
            <div className="space-y-6 text-sm text-[#1a1a1a]/80 leading-relaxed">
              <div>
                <h4 className="font-bold text-[#1a1a1a] uppercase text-xs mb-2">A. Capital Punishment for Heinous Crimes</h4>
                <p className="mb-2">
                  To deter the most severe violations of human dignity, NEWGAP will mandate **death execution** upon swift, rigorous judicial verification for:
                </p>
                <ul className="list-disc pl-5 space-y-1 font-bold text-xs uppercase text-[#d46b4e]">
                  <li>Premeditated Murder</li>
                  <li>Rape</li>
                  <li>Kidnapping with Assault</li>
                </ul>
              </div>
              <div className="border-t border-[#1a1a1a]/10 pt-4">
                <h4 className="font-bold text-[#1a1a1a] uppercase text-xs mb-2">B. Protection Against Crimes of Retaliation</h4>
                <p>
                  We will enact the **Retaliation Prevention Act**. Any official, politician, or corporate entity using their position to threaten, harass, or unlawfully prosecute a whistleblower, journalist, or witness will face mandatory, non-bailable imprisonment.
                </p>
              </div>
            </div>
          </div>

          {/* Corruption */}
          <div className="bg-[#f6f5f0] border-2 border-[#1a1a1a] p-8 shadow-[6px_6px_0px_#1a1a1a]">
            <div className="flex items-center gap-4 mb-6">
              <ManifestoIconThree className="size-14 shrink-0" />
              <h3 className="text-md font-black uppercase text-[#1a1a1a] leading-tight">
                Zero Corruption & Financial Integrity
              </h3>
            </div>
            <div className="space-y-3 text-sm text-[#1a1a1a]/80 leading-relaxed">
              <p>
                <strong>Zero Corporate Funding:</strong> We refuse all corporate donations. Party funding is crowdsourced and logged transparently on a real-time, public digital ledger.
              </p>
              <p>
                <strong>Public Asset Disclosure:</strong> Full financial transparency and asset disclosure for all candidates, representatives, and their immediate families.
              </p>
            </div>
          </div>

          {/* Leadership */}
          <div className="bg-[#f6f5f0] border-2 border-[#1a1a1a] p-8 shadow-[6px_6px_0px_#1a1a1a]">
            <div className="flex items-center gap-4 mb-6">
              <ManifestoIconFour className="size-14 shrink-0" />
              <h3 className="text-md font-black uppercase text-[#1a1a1a] leading-tight">
                Merit-First Governance & Educated Leadership
              </h3>
            </div>
            <div className="space-y-4 text-sm text-[#1a1a1a]/80 leading-relaxed">
              <p>
                Leadership is a profession, not a legacy. We enforce rigorous academic criteria:
              </p>
              <ul className="space-y-2 border-l-2 border-[#d46b4e]/30 pl-4 text-xs font-semibold uppercase text-[#1a1a1a]">
                <li><strong className="text-[#d46b4e]">Candidates:</strong> Minimum Bachelor&apos;s degree and clean criminal record.</li>
                <li><strong className="text-[#d46b4e]">Education Minister:</strong> PhD holder with 10+ years of active teaching.</li>
                <li><strong className="text-[#d46b4e]">Finance Minister:</strong> Top-tier, credentialed economist.</li>
                <li><strong className="text-[#d46b4e]">Prime Minister:</strong> PhD holder + passes independent merit review.</li>
              </ul>
            </div>
          </div>

          {/* Inclusivity */}
          <div className="bg-[#f6f5f0] border-2 border-[#1a1a1a] p-8 shadow-[6px_6px_0px_#1a1a1a]">
            <div className="flex items-center gap-4 mb-6">
              <ManifestoIconFive className="size-14 shrink-0" />
              <h3 className="text-md font-black uppercase text-[#1a1a1a] leading-tight">
                Absolute Inclusivity & Equal Representation
              </h3>
            </div>
            <div className="space-y-3 text-sm text-[#1a1a1a]/80 leading-relaxed">
              <p>
                <strong>50% Women in Cabinet:</strong> Absolute parity. Half of all Cabinet and Parliamentary positions will be reserved for women without expanding the legislature.
              </p>
              <p>
                <strong>Constitutional Secularism:</strong> Absolute equality before the law for all faiths. Division of citizens for votes is prohibited under party discipline.
              </p>
            </div>
          </div>

          {/* Democratic Safeguards */}
          <div className="bg-[#f6f5f0] border-2 border-[#1a1a1a] p-8 shadow-[6px_6px_0px_#1a1a1a]">
            <div className="flex items-center gap-4 mb-6">
              <ManifestoIconSix className="size-14 shrink-0" />
              <h3 className="text-md font-black uppercase text-[#1a1a1a] leading-tight">
                Democratic Safeguards & Defection Lock
              </h3>
            </div>
            <div className="space-y-3 text-sm text-[#1a1a1a]/80 leading-relaxed">
              <p>
                <strong>20-Year Defection Ban:</strong> Any representative defecting from their elected party mandate is immediately disqualified and barred from public office for two decades.
              </p>
              <p>
                <strong>Independent Judiciary:</strong> No Chief Justice shall accept Rajya Sabha seats or government appointments post-retirement.
              </p>
            </div>
          </div>

          {/* Alliance */}
          <div className="bg-[#f6f5f0] border-2 border-[#1a1a1a] p-8 shadow-[6px_6px_0px_#1a1a1a] relative overflow-hidden">
            <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-[#22572c]" />
            <div className="flex items-center gap-4 mb-6 pl-3">
              <ManifestoIconSeven className="size-14 shrink-0" />
              <h3 className="text-md font-black uppercase text-[#1a1a1a] leading-tight">
                The Swarm Alliance (Cockroach Janta Party)
              </h3>
            </div>
            <div className="space-y-3 text-sm text-[#1a1a1a]/85 leading-relaxed pl-3">
              <p>
                We stand with the citizens whom the economy left behind. NEWGAP brings the <strong>educated leadership</strong>, and the Cockroach Janta Party (CJP) brings the <strong>unstoppable swarm</strong>. Together, we build a peer-to-peer movement.
              </p>
            </div>
          </div>

        </div>

        {/* Call to action */}
        <div className="text-center mt-16 py-8 border-t border-[#1a1a1a]/15">
          <p className="text-headline-md uppercase font-black tracking-wider text-[#1a1a1a]">
            COMPILE THE FUTURE.
          </p>
          <p className="text-xs font-bold text-[#888880] uppercase tracking-widest mt-2">
            Jai Hind.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-on-surface/10 py-10 w-full bg-[#f6f5f0]/80 shrink-0">
        <div className="max-w-7xl mx-auto w-full px-container-padding-mobile lg:px-container-padding-desktop flex flex-col lg:flex-row items-center justify-between gap-4 text-mono-label font-mono-label uppercase tracking-widest text-on-surface-variant">
          <div>
            <span className="text-secondary">NEW</span><span className="text-primary font-bold">GAP</span> · {partyInfo.preamble.founding}
          </div>
          <div className="font-mono-label text-[10px]">{partyInfo.hq}</div>
          <div className="font-semibold text-xs flex gap-4 items-center">
            <Link href="/manifesto" className="hover:text-primary transition-colors text-on-surface-variant">Manifesto</Link>
            <span>·</span>
            <span className="text-on-surface-variant">© NEWGAP — No Rights Reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
