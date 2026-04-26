// London Weather Widget for Scriptable (self-updating)
// The widget fetches the latest design from GitHub automatically.
// To update: just edit widget-core.js in your GitHub repo.

const CORE_URL = "https://raw.githubusercontent.com/parksolbee/weather-app/main/widget-core.js";

const req = new Request(CORE_URL);
const script = await req.loadString();
await eval(script);
