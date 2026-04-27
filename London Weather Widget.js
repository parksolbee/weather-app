// VaSol Weather Widget for Scriptable (self-updating)
const CORE_URL = "https://raw.githubusercontent.com/parksolbee/weather-app/main/widget-core.js";
const req = new Request(CORE_URL);
const script = await req.loadString();
const fn = new Function("return (async () => {" + script + "})()");
await fn();
