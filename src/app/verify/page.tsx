"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search, Loader2, ShieldCheck, ShieldAlert } from "lucide-react";

function VerificationContent() {
  const searchParams = useSearchParams();
  const idQuery = searchParams.get("id")?.trim() || "";

  const [memberId, setMemberId] = useState(idQuery);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    verified: boolean;
    name?: string;
    uniqueId?: string;
    issueDate?: string;
    error?: string;
  } | null>(null);

  const performLookup = async (id: string) => {
    if (!id) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/check-records?id=${encodeURIComponent(id)}`);
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

  useEffect(() => {
    if (idQuery) {
      const timer = setTimeout(() => {
        performLookup(idQuery);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [idQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (memberId.trim()) {
      performLookup(memberId.trim());
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f5f0] grid-bg flex flex-col justify-between font-mono-label selection:bg-[#d46b4e] selection:text-white">
      {/* Dynamic Stripe Header */}
      <div className="w-full h-3 bg-[#22572c] shrink-0" />
      <div className="w-full h-1.5 bg-[#d46b4e] shrink-0" />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 my-12 w-full max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="group mb-8 inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors bg-[#f6f5f0] border-2 border-[#1a1a1a] px-4 py-2 rounded-sm shadow-[2px_2px_0px_#1a1a1a] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#1a1a1a]"
        >
          <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Homepage
        </Link>

        {/* Portal Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-headline-md tracking-tight uppercase font-extrabold text-[#1a1a1a]">
            VERIFICATION <span className="text-[#d46b4e]">PORTAL</span>
          </h1>
          <p className="text-xs uppercase text-[#888880] tracking-widest font-black mt-2">
            New Generation Action Party · Live Database Verification
          </p>
        </div>

        {/* Verification Card */}
        <div className="w-full max-w-lg bg-[#f6f5f0] border-2 border-[#1a1a1a] p-6 sm:p-8 relative shadow-[8px_8px_0px_#1a1a1a] overflow-hidden">
          {/* Card Top Stripe */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-[#22572c]" />

          {loading ? (
            <div className="py-12 text-center flex flex-col items-center justify-center gap-4">
              <Loader2 className="animate-spin size-12 text-[#d46b4e]" />
              <div>
                <h3 className="text-lg font-extrabold uppercase text-[#1a1a1a]">
                  Querying Live Registry
                </h3>
                <p className="text-xs text-[#888880] uppercase tracking-wider mt-1">
                  Connecting to Sheets API Database...
                </p>
              </div>
            </div>
          ) : result ? (
            <div>
              {result.verified ? (
                // Verified State
                <div className="text-center">
                  <div className="inline-flex items-center justify-center bg-[#22572c]/10 border border-[#22572c] p-4 rounded-full mb-4 animate-bounce animate-duration-1000">
                    <ShieldCheck className="size-12 text-[#22572c]" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#22572c] uppercase tracking-tight">
                    Credential Verified
                  </h3>
                  <p className="text-xs font-bold text-[#888880] uppercase tracking-widest mt-1">
                    OFFICIAL NEWGAP MEMBER RECORD
                  </p>

                  {/* Receipt Detail Grid */}
                  <div className="mt-8 border-2 border-[#1a1a1a] bg-[#f6f5f0] p-4 text-left relative shadow-[4px_4px_0px_#1a1a1a] space-y-4">
                    <div className="absolute top-0 bottom-0 left-0 w-2 bg-[#22572c]" />
                    <div className="pl-4">
                      <span className="block text-[8px] uppercase tracking-widest font-black text-[#888880] mb-1">
                        MEMBER NAME
                      </span>
                      <span className="block text-md font-bold uppercase text-[#1a1a1a]">
                        {result.name}
                      </span>
                    </div>
                    <div className="pl-4 border-t border-[#1a1a1a]/10 pt-3">
                      <span className="block text-[8px] uppercase tracking-widest font-black text-[#888880] mb-1">
                        UNIQUE MEMBER ID
                      </span>
                      <span className="block text-sm font-black text-[#22572c] uppercase tracking-wider">
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

                  <p className="mt-6 text-xs text-[#888880] leading-relaxed">
                    This digital credential has been dynamically checked and verified against the live, authentic registration sheet for the New Generation Action Party (NEWGAP) of India.
                  </p>
                </div>
              ) : (
                // Failed State
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

                  <p className="mt-6 text-xs text-[#888880] leading-relaxed">
                    Please ensure the ID was copied or scanned correctly. Unofficial, tampered, or unregistered cards will fail to verify against the live party directory.
                  </p>
                </div>
              )}

              {/* Reset Button */}
              <button
                onClick={() => {
                  setResult(null);
                  setMemberId("");
                }}
                className="btn-retro-secondary w-full py-4 text-xs font-bold mt-8 flex justify-center items-center gap-2"
              >
                Verify Another Card
              </button>
            </div>
          ) : (
            // Form lookup state
            <div>
              <div className="mb-6 text-center">
                <Search className="size-8 mx-auto text-[#1a1a1a]/60 mb-2" />
                <h3 className="text-lg font-extrabold uppercase text-[#1a1a1a]">
                  Registry Lookup
                </h3>
                <p className="text-xs text-[#888880] uppercase tracking-wider mt-1">
                  Check membership validity instantly
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1a1a1a] mb-2 font-bold">
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
                  className="btn-retro-primary w-full py-4 text-sm font-bold flex justify-center items-center gap-2"
                >
                  <Search className="size-4" />
                  VERIFY NOW
                </button>
              </form>

              <div className="mt-6 border-t border-[#1a1a1a]/10 pt-4 text-center">
                <p className="text-[10px] text-[#888880] leading-relaxed uppercase">
                  Verify the physical or digital card by scanning the QR code, or manually lookup using the ID code.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="w-full border-t border-[#1a1a1a]/10 py-6 text-center bg-[#f6f5f0]/80 shrink-0">
        <p className="text-[10px] text-[#888880] uppercase tracking-widest font-black">
          NEWGAP · SECURE MEMBERSHIP VERIFICATION PROTOCOL · INDIA 🇮🇳
        </p>
      </footer>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-[#f6f5f0] grid-bg flex items-center justify-center p-4">
          <div className="bg-[#f6f5f0] border-2 border-[#1a1a1a] shadow-[8px_8px_0px_#1a1a1a] p-8 max-w-md w-full text-center">
            <Loader2 className="animate-spin size-8 mx-auto text-[#d46b4e] mb-4" />
            <h3 className="font-extrabold text-[#1a1a1a] uppercase tracking-wider text-xs">
              Loading Verification Portal...
            </h3>
          </div>
        </div>
      }
    >
      <VerificationContent />
    </Suspense>
  );
}
