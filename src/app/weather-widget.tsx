"use client";

import { useState, useEffect } from "react";
import { Rain } from "./rain";

const PHOTOS = ["/photo1.jpg", "/photo2.png", "/photo3.png", "/photo4.png", "/photo5.png", "/photo6.png"];
const TOGETHER_SINCE = new Date("2025-12-27");

function getTogetherText() {
  const now = new Date();
  const diff = now.getTime() - TOGETHER_SINCE.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days < 0) return { count: "Not yet!", label: "", date: "Dec 27, 2025" };
  if (days < 7) return { count: `${days}`, label: days === 1 ? "Day ago" : "Days ago", date: "Dec 27, 2025" };
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return { count: `${weeks}`, label: weeks === 1 ? "Week ago" : "Weeks ago", date: "Dec 27, 2025" };
  }
  if (days < 365) {
    const months = Math.floor(days / 30);
    return { count: `${months}`, label: months === 1 ? "Month ago" : "Months ago", date: "Dec 27, 2025" };
  }
  return { count: `${days}`, label: "Days ago", date: "Dec 27, 2025" };
}

function useTime(timezone: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    function update() {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: timezone,
        }).toUpperCase()
      );
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [timezone]);
  return time;
}

export function WeatherWidget({ londonTemp, sfTemp }: { londonTemp: number; sfTemp: number }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const londonTime = useTime("Europe/London");
  const sfTime = useTime("America/Los_Angeles");
  const together = getTogetherText();

  useEffect(() => {
    const id = setInterval(() => {
      setPhotoIndex((i) => (i + 1) % PHOTOS.length);
    }, 30 * 1000); // 30 seconds
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

      {/* Hearts */}
      <Rain />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8">
        {/* Together since */}
        <div>
          <p className="text-white font-semibold text-[14px] drop-shadow-md">Together since</p>
          <p className="text-white font-bold text-[18px] drop-shadow-md">{together.count} {together.label}</p>
          <p className="text-white/70 font-semibold text-[12px] drop-shadow-md">{together.date}</p>
        </div>

        {/* Cities row */}
        <div className="flex gap-6">
          {/* London */}
          <div>
            <p className="text-white font-semibold text-[14px] drop-shadow-md">London</p>
            <p className="text-white font-bold text-[28px] leading-none tracking-[-1px] drop-shadow-md">{londonTime}</p>
            <p className="text-white font-semibold text-[18px] drop-shadow-md mt-1">{londonTemp}°</p>
          </div>

          {/* San Francisco */}
          <div>
            <p className="text-white font-semibold text-[14px] drop-shadow-md">San Francisco</p>
            <p className="text-white font-bold text-[28px] leading-none tracking-[-1px] drop-shadow-md">{sfTime}</p>
            <p className="text-white font-semibold text-[18px] drop-shadow-md mt-1">{sfTemp}°</p>
          </div>
        </div>
      </div>
    </div>
  );
}
