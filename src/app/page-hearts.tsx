"use client";

import { useState, useEffect } from "react";

function seededRandom(seed: number) {
  const x = Math.sin(seed + 50) * 10000;
  return x - Math.floor(x);
}

export function PageHearts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const hearts = Array.from({ length: 20 }, (_, i) => {
    const left = seededRandom(i + 500) * 100;
    const delay = seededRandom(i + 600) * 8;
    const duration = 6 + seededRandom(i + 700) * 6;
    const size = 8 + seededRandom(i + 800) * 14;
    const opacity = 0.1 + seededRandom(i + 900) * 0.15;

    return (
      <div
        key={i}
        className="absolute animate-heart"
        style={{
          left: `${left}%`,
          bottom: "-20px",
          fontSize: `${size}px`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          opacity,
        }}
      >
        ⛅
      </div>
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts}
    </div>
  );
}
