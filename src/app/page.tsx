import { Clock } from "./clock";
import { Rain } from "./rain";

export default async function Home() {
  const res = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=-0.1276&current=temperature_2m&timezone=Europe%2FLondon",
    { cache: "no-store" }
  );
  const data = await res.json();
  const temp = Math.round(data.current.temperature_2m);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900">
      <div className="relative w-[400px] h-[400px] rounded-[16px] overflow-hidden shadow-2xl">
        {/* Background */}
        <img
          src="/bg.png"
          alt="London park"
          className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 60%" }}
        />

        {/* Rain */}
        <Rain />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-8">
          {/* Top row */}
          <div className="flex justify-between items-start">
            <p className="text-white font-black text-[72px] leading-none tracking-[-2px] drop-shadow-md">
              {temp}°
            </p>
          </div>

          {/* Bottom row */}
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
    </div>
  );
}
