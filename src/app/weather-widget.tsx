"use client";

import { useState, useEffect } from "react";
import { WidgetClouds } from "./widget-clouds";

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
    }, 20 * 1000); // 20 seconds
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-[400px] h-[400px] rounded-[16px] overflow-hidden shadow-2xl shrink-0">
      {/* Background photo */}
      {PHOTOS.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{
            objectPosition: "center 40%",
            opacity: i === photoIndex ? 1 : 0,
          }}
        />
      ))}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Floating clouds */}
      <WidgetClouds />


      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8">
        {/* Together since + message */}
        <div>
          <p className="text-white font-semibold text-[14px] drop-shadow-md">Together since Dec 27, 2025</p>
          <p className="text-white font-bold text-[18px] drop-shadow-md">{together.count} {together.label}</p>
          <div className="flex flex-col gap-1.5 mt-2">
            {CONVOS[photoIndex].map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "sb" ? "justify-end" : "justify-start"}`}>
                <div className={`${msg.from === "sb" ? "bg-[#007AFF] rounded-2xl rounded-br-sm" : "bg-white/20 backdrop-blur-md rounded-2xl rounded-bl-sm"} px-3 py-1.5 max-w-[75%] shadow-lg`}>
                  <p className="text-white text-[13px]">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cities row */}
        <div className="flex gap-6">
          {/* London */}
          <div>
            <p className="text-white font-semibold text-[14px] drop-shadow-md">🫖 London <span className="text-white/60 text-[11px]">{london.date}</span></p>
            <p className="text-white font-bold text-[28px] leading-none tracking-[-1px] drop-shadow-md">{london.time}</p>
            <p className="text-white font-semibold text-[18px] drop-shadow-md mt-1">{londonTemp}°</p>
          </div>

          {/* San Francisco */}
          <div>
            <p className="text-white font-semibold text-[14px] drop-shadow-md">🌁 San Francisco <span className="text-white/60 text-[11px]">{sf.date}</span></p>
            <p className="text-white font-bold text-[28px] leading-none tracking-[-1px] drop-shadow-md">{sf.time}</p>
            <p className="text-white font-semibold text-[18px] drop-shadow-md mt-1">{sfTemp}°</p>
          </div>
        </div>
      </div>
    </div>
  );
}
