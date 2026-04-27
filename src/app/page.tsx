import { WeatherWidget } from "./weather-widget";
import { CopyButton } from "./copy-button";

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
    <div className="relative flex min-h-screen items-center justify-center bg-[#1a0f14] p-6 overflow-hidden">
      {/* Animated blob gradient background */}
      <div className="absolute inset-0 bg-[#1a0f14]">
        <div className="absolute w-[600px] h-[600px] top-[-10%] left-[-10%] rounded-full bg-[#7eb5d6] blur-[120px] animate-blob opacity-50" />
        <div className="absolute w-[500px] h-[500px] top-[20%] right-[-5%] rounded-full bg-[#e8a0bf] blur-[120px] animate-blob2 opacity-50" />
        <div className="absolute w-[550px] h-[550px] bottom-[-10%] left-[20%] rounded-full bg-[#a8d5ba] blur-[120px] animate-blob3 opacity-40" />
        <div className="absolute w-[400px] h-[400px] top-[50%] left-[50%] rounded-full bg-[#c4a0e8] blur-[100px] animate-blob opacity-35" style={{ animationDelay: "3s" }} />
        <div className="absolute w-[450px] h-[450px] bottom-[10%] right-[20%] rounded-full bg-[#f4c28f] blur-[110px] animate-blob2 opacity-30" style={{ animationDelay: "5s" }} />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-20 max-w-[900px]">
        {/* Left: Instructions */}
        <div className="space-y-6 max-w-[350px]">
          <div>
            <h1 className="text-white text-3xl whitespace-nowrap" style={{ fontFamily: "var(--font-dotmatrix)" }}>VaSol LDR Widget <span style={{ fontFamily: "system-ui" }}>🫰🏻</span></h1>
            <p className="text-white/60 text-sm mt-2">Same sky, different city. A live widget to track time difference and remind us of our love that spans miles apart.</p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="text-white font-bold text-sm shrink-0">1.</span>
              <p className="text-white/80 text-sm">
                Download <a href="https://apps.apple.com/app/scriptable/id1405459188" className="text-[#e8a0bf] underline" target="_blank" rel="noopener noreferrer">Scriptable</a> from the App Store on your iPhone (free)
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-white font-bold text-sm shrink-0">2.</span>
              <p className="text-white/80 text-sm">
                Create new script (+) in Scriptable and copy and paste the script below
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-white font-bold text-sm shrink-0">3.</span>
              <p className="text-white/80 text-sm">
                Long press your home screen, tap &quot;Edit,&quot; search &quot;Add Widget,&quot; find &quot;Scriptable&quot; then edit it to choose this script
              </p>
            </div>
          </div>

          <CopyButton scriptUrl={SCRIPT_URL} />
        </div>

        {/* Right: Widget preview */}
        <div>
          <WeatherWidget londonTemp={londonTemp} sfTemp={sfTemp} />
        </div>
      </div>
    </div>
  );
}
