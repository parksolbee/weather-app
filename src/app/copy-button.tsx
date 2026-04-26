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
      className="w-full py-3 px-6 bg-white text-zinc-900 font-semibold text-sm rounded-xl hover:bg-zinc-200 transition-colors"
    >
      {copied ? "Copied!" : "Copy Script"}
    </button>
  );
}
