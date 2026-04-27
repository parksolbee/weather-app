"use client";

import { useState, useEffect } from "react";

function seededRandom(seed: number) {
  const x = Math.sin(seed + 77) * 10000;
  return x - Math.floor(x);
}

export function WidgetClouds() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const clouds = Array.from({ length: 8 }, (_, i) => {
    const left = seededRandom(i + 1) * 100;
    const delay = seededRandom(i + 50) * 4;
    const duration = 2 + seededRandom(i + 100) * 2;
    const size = 10 + seededRandom(i + 150) * 8;

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
        }}
      >
        ⛅
      </div>
    );
  });

  return (
    <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
      {clouds}
    </div>
  );
}
