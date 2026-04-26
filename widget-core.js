// widget-core.js — edit this file to update everyone's widget

const LAT = 51.5072;
const LON = -0.1276;
const BG_IMAGE_URL = "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/bg.png";

// Fetch weather
const weatherReq = new Request(
  `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m&timezone=Europe%2FLondon`
);
const weatherData = await weatherReq.loadJSON();
const temp = Math.round(weatherData.current.temperature_2m);

// Fetch background image
const imgReq = new Request(BG_IMAGE_URL);
const bgImage = await imgReq.loadImage();

// Current time in London
const now = new Date();
const timeStr = now.toLocaleTimeString("en-GB", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Europe/London",
}).toUpperCase();

// Build widget
const widget = new ListWidget();
widget.setPadding(16, 16, 16, 16);
widget.backgroundImage = bgImage;

// Top section
const topStack = widget.addStack();
topStack.layoutHorizontally();

// Left: Today + time
const leftStack = topStack.addStack();
leftStack.layoutVertically();

const todayText = leftStack.addText("Today");
todayText.font = Font.semiboldSystemFont(14);
todayText.textColor = Color.white();
todayText.shadowColor = new Color("#000", 0.5);
todayText.shadowRadius = 3;

const timeText = leftStack.addText(timeStr);
timeText.font = Font.semiboldSystemFont(14);
timeText.textColor = Color.white();
timeText.shadowColor = new Color("#000", 0.5);
timeText.shadowRadius = 3;

topStack.addSpacer();

// Right: Temperature
const tempText = topStack.addText(`${temp}°`);
tempText.font = Font.blackSystemFont(48);
tempText.textColor = Color.white();
tempText.shadowColor = new Color("#000", 0.5);
tempText.shadowRadius = 4;

widget.addSpacer();

// Bottom: Location
const locationStack = widget.addStack();
locationStack.layoutVertically();

const cityText = locationStack.addText("London");
cityText.font = Font.semiboldSystemFont(14);
cityText.textColor = Color.white();
cityText.shadowColor = new Color("#000", 0.5);
cityText.shadowRadius = 3;

const countryText = locationStack.addText("UK");
countryText.font = Font.semiboldSystemFont(14);
countryText.textColor = Color.white();
countryText.shadowColor = new Color("#000", 0.5);
countryText.shadowRadius = 3;

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}

Script.complete();
