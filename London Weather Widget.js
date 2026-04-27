// VaSol LDR Widget for Scriptable (self-updating)
const CORE_URL = "https://raw.githubusercontent.com/parksolbee/weather-app/main/widget-core.js?v=" + Date.now();
const req = new Request(CORE_URL);
const script = await req.loadString();
await eval("(async () => {" + script + "})()");
