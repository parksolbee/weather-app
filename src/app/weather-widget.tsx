"use client";

import { useState, useEffect } from "react";

const PHOTOS = ["/photo2.png", "/photo3.png", "/photo4.png", "/photo5.png", "/photo6.png"];
const CONVOS = [
  [
    { from: "sb", text: "Dreaming of you 💭🫶🏼" },
    { from: "vas", text: "See you in the dreams" },
  ],
  [
    { from: "vas", text: "You can rely on Vasu ❤️" },
    { from: "sb", text: "Nawww love you boo" },
  ],
  [
    { from: "vas", text: "I'm a ddongjaengyi 💩" },
    { from: "sb", text: "You're my favorite ddongjaengyi" },
  ],
  [
    { from: "sb", text: "You're the love of my life" },
    { from: "vas", text: "And you are mine" },
  ],
  [
    { from: "vas", text: "You're my everything" },
    { from: "sb", text: "And I am yours" },
  ],
];
const TOGETHER_SINCE = new Date("2025-12-27");

function getTogetherText() {
  const now = new Date();
  const diff = now.getTime() - TOGETHER_SINCE.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days < 0) return { count: "Not yet!", label: "" };
  if (days < 7) return { count: `${days}`, label: days === 1 ? "day" : "days" };
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return { count: `${weeks}`, label: weeks === 1 ? "week" : "weeks" };
  }
  if (days < 365) {
    const months = Math.floor(days / 30);
    return { count: `${months}`, label: months === 1 ? "month" : "months" };
  }
  return { count: `${days}`, label: "days" };
}

function useTimeAndDate(timezone: string) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    function update() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: timezone,
        }).toUpperCase()
      );
      setDate(
        now.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          timeZone: timezone,
        })
      );
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [timezone]);
  return { time, date };
}

export function WeatherWidget({ londonTemp, sfTemp }: { londonTemp: number; sfTemp: number }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const london = useTimeAndDate("Europe/London");
  const sf = useTimeAndDate("America/Los_Angeles");
  const together = getTogetherText();

  useEffect(() => {
    const id = setInterval(() => {
      setPhotoIndex((i) => (i + 1) % PHOTOS.length);
    }, 20 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-[400px] h-[400px] rounded-[20px] overflow-hidden shadow-2xl shrink-0 bg-[#111] flex flex-col">
      {/* Fullscreen photo background */}
      <div className="absolute inset-0">
        {PHOTOS.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ objectPosition: "center 30%", opacity: i === photoIndex ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content overlaid */}
      <div className="relative z-10 flex flex-col justify-between h-full p-5">
        {/* Top: Together since */}
        <div>
          <p className="text-white font-bold text-[14px] drop-shadow-md">Together since</p>
          <p className="text-white/60 text-[11px] drop-shadow-md">Dec 27, 2025 · {together.count} {together.label}</p>
        </div>

        {/* Middle: Messages */}
        <div className="self-start">
          <MessageBubbles convo={CONVOS[photoIndex]} photoIndex={photoIndex} />
        </div>

        {/* Bottom: Two city cards */}
        <div className="flex gap-3">
        {/* London */}
        <div className="flex-1 bg-black/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[14px]">🫖</span>
            <p className="text-white/50 text-[11px] font-semibold uppercase tracking-wider">London</p>
          </div>
          <p className="text-white text-[28px] leading-none" style={{ fontFamily: "var(--font-dotmatrix)" }}>{london.time}</p>
          <div className="flex items-baseline gap-2 mt-1.5">
            <p className="text-[#e8a0bf] text-[20px]" style={{ fontFamily: "var(--font-dotmatrix)" }}>{londonTemp}°</p>
            <p className="text-white/30 text-[11px]">{london.date}</p>
          </div>
        </div>

        {/* San Francisco */}
        <div className="flex-1 bg-black/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[14px]">🌁</span>
            <p className="text-white/50 text-[11px] font-semibold uppercase tracking-wider">San Francisco</p>
          </div>
          <p className="text-white text-[28px] leading-none" style={{ fontFamily: "var(--font-dotmatrix)" }}>{sf.time}</p>
          <div className="flex items-baseline gap-2 mt-1.5">
            <p className="text-[#e8a0bf] text-[20px]" style={{ fontFamily: "var(--font-dotmatrix)" }}>{sfTemp}°</p>
            <p className="text-white/30 text-[11px]">{sf.date}</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

function MessageBubbles({ convo, photoIndex }: { convo: { from: string; text: string }[]; photoIndex: number }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    const t1 = setTimeout(() => setVisibleCount(1), 500);
    const t2 = setTimeout(() => setVisibleCount(2), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [photoIndex]);

  return (
    <div className="flex flex-col gap-2">
      {convo.map((msg, i) => (
        <div
          key={`${photoIndex}-${i}`}
          className={`flex ${msg.from === "sb" ? "justify-end" : "justify-start"} transition-all duration-500 ${i < visibleCount ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <div className={`${msg.from === "sb" ? "bg-[#9b4d6e] rounded-2xl rounded-br-sm" : "bg-black/50 backdrop-blur-sm rounded-2xl rounded-bl-sm"} inline-block px-3 py-1.5`}>
            <p className="text-white text-[12px] whitespace-nowrap">{msg.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
