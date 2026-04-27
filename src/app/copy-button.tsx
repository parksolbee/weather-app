"use client";

import { useState } from "react";

export function CopyButton({ scriptUrl }: { scriptUrl: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const res = await fetch(scriptUrl);
    const text = await res.text();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="w-full py-4 px-6 bg-transparent text-[#6e2040] font-semibold text-sm uppercase tracking-wider rounded-full border border-[#6e2040]/40 hover:border-[#6e2040]/70 hover:bg-[#6e2040]/5 transition-all"
    >
      {copied ? "COPIED!" : "COPY SCRIPT"}
    </button>
  );
}
