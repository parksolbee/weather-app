"use client";

import { useState, useEffect } from "react";

export function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function update() {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: "Europe/London",
        }).toUpperCase()
      );
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return <p className="text-white font-semibold text-[18px] drop-shadow-md">{time}</p>;
}
