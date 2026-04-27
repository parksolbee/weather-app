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
      className="w-full py-3 px-6 bg-gradient-to-r from-[#e8a0bf] to-[#f4c28f] text-[#1a1520] font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity"
    >
      {copied ? "Copied!" : "Copy Script"}
    </button>
  );
}
