"use client";

export function Rain() {
  const hearts = Array.from({ length: 15 }, (_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 4;
    const duration = 2 + Math.random() * 2;
    const size = 10 + Math.random() * 10;

    return (
      <div
        key={`heart-${i}`}
        className="absolute animate-heart"
        style={{
          left: `${left}%`,
          bottom: "-20px",
          fontSize: `${size}px`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
      >
        ❤️
      </div>
    );
  });

  return (
    <div className="absolute inset-0 z-[5] overflow-hidden">
      {hearts}
    </div>
  );
}
