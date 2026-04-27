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
      className="w-full py-4 px-6 bg-transparent text-[#e8a0bf] font-semibold text-sm uppercase tracking-wider rounded-full border border-[#e8a0bf]/30 hover:border-[#e8a0bf]/60 hover:bg-[#e8a0bf]/5 transition-all"
    >
      {copied ? "COPIED!" : "COPY SCRIPT"}
    </button>
  );
}
