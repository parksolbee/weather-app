import { Clock } from "./clock";
import { Rain } from "./rain";
import { CopyButton } from "./copy-button";

const SCRIPT_URL = "https://raw.githubusercontent.com/parksolbee/weather-app/main/London%20Weather%20Widget.js";

export default async function Home() {
  const res = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=-0.1276&current=temperature_2m&timezone=Europe%2FLondon",
    { cache: "no-store" }
  );
  const data = await res.json();
  const temp = Math.round(data.current.temperature_2m);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 gap-10 p-6">
      {/* Widget preview */}
      <div className="relative w-[400px] h-[400px] rounded-[16px] overflow-hidden shadow-2xl">
        <img
          src="/bg.png"
          alt="London park"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 60%" }}
        />
        <Rain />
        <div className="relative z-10 flex flex-col justify-between h-full p-8">
          <div className="flex justify-between items-start">
            <p className="text-white font-black text-[72px] leading-none tracking-[-2px] drop-shadow-md">
              {temp}°
            </p>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-white font-semibold text-[18px] drop-shadow-md">London</p>
              <p className="text-white font-semibold text-[18px] drop-shadow-md">UK</p>
            </div>
            <div className="text-right">
              <p className="text-white font-semibold text-[18px] drop-shadow-md">Today</p>
              <Clock />
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="max-w-[400px] text-center space-y-6">
        <h1 className="text-white text-2xl font-bold">London Weather Widget</h1>
        <p className="text-zinc-400 text-sm">
          A live weather widget for your iPhone home screen.
        </p>

        <div className="text-left space-y-4">
          <div className="flex gap-3">
            <span className="text-white font-bold text-sm shrink-0">1.</span>
            <p className="text-zinc-300 text-sm">
              Download <a href="https://apps.apple.com/app/scriptable/id1405459188" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">Scriptable</a> from the App Store (free)
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-white font-bold text-sm shrink-0">2.</span>
            <p className="text-zinc-300 text-sm">
              Copy the script below and paste it into a new script in Scriptable
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-white font-bold text-sm shrink-0">3.</span>
            <p className="text-zinc-300 text-sm">
              Long press your home screen, tap +, search "Scriptable", add a widget, then edit it to choose this script
            </p>
          </div>
        </div>

        <CopyButton scriptUrl={SCRIPT_URL} />
      </div>
    </div>
  );
}
