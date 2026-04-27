import { WeatherWidget } from "./weather-widget";
import { CopyButton } from "./copy-button";
import { PageHearts } from "./page-hearts";

const SCRIPT_URL = "https://raw.githubusercontent.com/parksolbee/weather-app/main/London%20Weather%20Widget.js";

export default async function Home() {
  const [londonRes, sfRes] = await Promise.all([
    fetch("https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=-0.1276&current=temperature_2m&timezone=Europe%2FLondon", { cache: "no-store" }),
    fetch("https://api.open-meteo.com/v1/forecast?latitude=37.7749&longitude=-122.4194&current=temperature_2m&timezone=America%2FLos_Angeles", { cache: "no-store" }),
  ]);
  const londonData = await londonRes.json();
  const sfData = await sfRes.json();
  const londonTemp = Math.round(londonData.current.temperature_2m);
  const sfTemp = Math.round(sfData.current.temperature_2m);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0a0a0a] p-6 overflow-hidden">
      {/* Subtle warm glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#e8a0bf]/8 blur-[150px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#e8a0bf]/5 blur-[150px]" />

      {/* Floating hearts */}
      <PageHearts />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-20 max-w-[900px]">
        {/* Left: Instructions */}
        <div className="space-y-6 max-w-[350px]">
          <div>
            <h1 className="text-white text-3xl font-bold">⛅ VaSol LDR Widget</h1>
            <p className="text-white/60 text-sm mt-2">Same sky, different cities — a live weather widget for your iPhone home screen.</p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="text-[#e8a0bf] font-bold text-sm shrink-0">1.</span>
              <p className="text-white/80 text-sm">
                Download <a href="https://apps.apple.com/app/scriptable/id1405459188" className="text-[#e8a0bf] underline" target="_blank" rel="noopener noreferrer">Scriptable</a> from the App Store on your iPhone (free)
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-[#e8a0bf] font-bold text-sm shrink-0">2.</span>
              <p className="text-white/80 text-sm">
                Create new script (+) in Scriptable and copy and paste the script below
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-[#e8a0bf] font-bold text-sm shrink-0">3.</span>
              <p className="text-white/80 text-sm">
                Long press your home screen, tap &quot;Edit,&quot; search &quot;Add Widget,&quot; find &quot;Scriptable&quot; then edit it to choose this script
              </p>
            </div>
          </div>

          <CopyButton scriptUrl={SCRIPT_URL} />
        </div>

        {/* Right: Widget preview */}
        <div className="rounded-[20px] shadow-[0_0_60px_rgba(232,160,191,0.15)]">
          <WeatherWidget londonTemp={londonTemp} sfTemp={sfTemp} />
        </div>
      </div>
    </div>
  );
}
