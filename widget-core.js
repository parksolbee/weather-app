// widget-core.js — edit this file to update everyone's widget

const PHOTOS = [
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo1.jpg",
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo2.png",
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo3.png",
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo4.png",
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo5.png",
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo6.png",
];

// Pick photo based on 10-minute intervals
const photoIndex = Math.floor(Date.now() / (10 * 60 * 1000)) % PHOTOS.length;

// Fetch weather for both cities
const [londonRes, sfRes] = await Promise.all([
  new Request("https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=-0.1276&current=temperature_2m&timezone=Europe%2FLondon").loadJSON(),
  new Request("https://api.open-meteo.com/v1/forecast?latitude=37.7749&longitude=-122.4194&current=temperature_2m&timezone=America%2FLos_Angeles").loadJSON(),
]);
const londonTemp = Math.round(londonRes.current.temperature_2m);
const sfTemp = Math.round(sfRes.current.temperature_2m);

// Fetch background image
const imgReq = new Request(PHOTOS[photoIndex]);
const bgImage = await imgReq.loadImage();

// Times
const now = new Date();
const londonTime = now.toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Europe/London" }).toUpperCase();
const sfTime = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/Los_Angeles" }).toUpperCase();

// Together since
const togetherSince = new Date("2025-12-27");
const diffDays = Math.floor((now.getTime() - togetherSince.getTime()) / (1000 * 60 * 60 * 24));
let togetherLabel;
if (diffDays < 0) {
  togetherLabel = "Not yet!";
} else if (diffDays < 7) {
  togetherLabel = `${diffDays} ${diffDays === 1 ? "Day" : "Days"} ago`;
} else if (diffDays < 30) {
  const weeks = Math.floor(diffDays / 7);
  togetherLabel = `${weeks} ${weeks === 1 ? "Week" : "Weeks"} ago`;
} else if (diffDays < 365) {
  const months = Math.floor(diffDays / 30);
  togetherLabel = `${months} ${months === 1 ? "Month" : "Months"} ago`;
} else {
  togetherLabel = `${diffDays} Days ago`;
}

// Build widget
const widget = new ListWidget();
widget.setPadding(12, 12, 12, 12);
widget.backgroundImage = bgImage;

// Dark overlay via background gradient
const gradient = new LinearGradient();
gradient.locations = [0, 1];
gradient.colors = [new Color("#000", 0.3), new Color("#000", 0.3)];
widget.backgroundGradient = gradient;

const shadow = new Color("#000", 0.5);

// London
const londonLabel = widget.addText("London");
londonLabel.font = Font.semiboldSystemFont(11);
londonLabel.textColor = Color.white();
londonLabel.shadowColor = shadow;
londonLabel.shadowRadius = 3;

const londonTempText = widget.addText(`${londonTemp}°`);
londonTempText.font = Font.blackSystemFont(32);
londonTempText.textColor = Color.white();
londonTempText.shadowColor = shadow;
londonTempText.shadowRadius = 3;

const londonTimeText = widget.addText(londonTime);
londonTimeText.font = Font.semiboldSystemFont(11);
londonTimeText.textColor = Color.white();
londonTimeText.shadowColor = shadow;
londonTimeText.shadowRadius = 3;

widget.addSpacer(4);

// San Francisco
const sfLabel = widget.addText("San Francisco");
sfLabel.font = Font.semiboldSystemFont(11);
sfLabel.textColor = Color.white();
sfLabel.shadowColor = shadow;
sfLabel.shadowRadius = 3;

const sfTempText = widget.addText(`${sfTemp}°`);
sfTempText.font = Font.blackSystemFont(32);
sfTempText.textColor = Color.white();
sfTempText.shadowColor = shadow;
sfTempText.shadowRadius = 3;

const sfTimeText = widget.addText(sfTime);
sfTimeText.font = Font.semiboldSystemFont(11);
sfTimeText.textColor = Color.white();
sfTimeText.shadowColor = shadow;
sfTimeText.shadowRadius = 3;

widget.addSpacer();

// Together since
const togetherTitle = widget.addText("Together since");
togetherTitle.font = Font.semiboldSystemFont(11);
togetherTitle.textColor = Color.white();
togetherTitle.shadowColor = shadow;
togetherTitle.shadowRadius = 3;

const togetherCount = widget.addText(togetherLabel);
togetherCount.font = Font.boldSystemFont(14);
togetherCount.textColor = Color.white();
togetherCount.shadowColor = shadow;
togetherCount.shadowRadius = 3;

const dateText = widget.addText("Dec 27, 2025");
dateText.font = Font.semiboldSystemFont(10);
dateText.textColor = new Color("#fff", 0.7);
dateText.shadowColor = shadow;
dateText.shadowRadius = 3;

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}

Script.complete();
