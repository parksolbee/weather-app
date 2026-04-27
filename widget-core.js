var PHOTOS = [
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo2.png",
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo3.png",
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo4.png",
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo5.png",
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo6.png",
];

var CONVOS = [
  [{ from: "sb", text: "Dreaming of you 💭🫶🏼" }, { from: "vas", text: "See you in the dreams" }],
  [{ from: "vas", text: "You can rely on Vasu ❤️" }, { from: "sb", text: "Nawww love you boo" }],
  [{ from: "vas", text: "I'm a ddongjaengyi 💩" }, { from: "sb", text: "You're my favorite ddongjaengyi" }],
  [{ from: "sb", text: "You're the love of my life" }, { from: "vas", text: "And you are mine" }],
  [{ from: "vas", text: "You're my everything" }, { from: "sb", text: "And I am yours" }],
];

var photoIndex = Math.floor(Date.now() / (20 * 1000)) % PHOTOS.length;

var londonReq = new Request("https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=-0.1276&current=temperature_2m&timezone=Europe%2FLondon");
var sfReq = new Request("https://api.open-meteo.com/v1/forecast?latitude=37.7749&longitude=-122.4194&current=temperature_2m&timezone=America%2FLos_Angeles");
var londonRes = await londonReq.loadJSON();
var sfRes = await sfReq.loadJSON();
var londonTemp = Math.round(londonRes.current.temperature_2m);
var sfTemp = Math.round(sfRes.current.temperature_2m);

var imgReq = new Request(PHOTOS[photoIndex]);
var bgImage = await imgReq.loadImage();

var now = new Date();
var londonTime = now.toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Europe/London" }).toUpperCase();
var londonDate = now.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "Europe/London" });
var sfTime = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/Los_Angeles" }).toUpperCase();
var sfDate = now.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "America/Los_Angeles" });

var togetherSince = new Date("2025-12-27");
var diffDays = Math.floor((now.getTime() - togetherSince.getTime()) / (1000 * 60 * 60 * 24));
var togetherLabel;
if (diffDays < 0) {
  togetherLabel = "Not yet!";
} else if (diffDays < 7) {
  togetherLabel = diffDays + (diffDays === 1 ? " day" : " days");
} else if (diffDays < 30) {
  var weeks = Math.floor(diffDays / 7);
  togetherLabel = weeks + (weeks === 1 ? " week" : " weeks");
} else if (diffDays < 365) {
  var months = Math.floor(diffDays / 30);
  togetherLabel = months + (months === 1 ? " month" : " months");
} else {
  togetherLabel = diffDays + " days";
}

var widget = new ListWidget();
widget.setPadding(20, 24, 20, 24);
widget.backgroundImage = bgImage;

var gradient = new LinearGradient();
gradient.locations = [0, 0.35, 1];
gradient.colors = [new Color("#000", 0.35), new Color("#000", 0.4), new Color("#000", 0.7)];
widget.backgroundGradient = gradient;

var shadow = new Color("#000", 0.6);

// Together since
var togetherTitle = widget.addText("Together since");
togetherTitle.font = Font.boldRoundedSystemFont(14);
togetherTitle.textColor = Color.white();
togetherTitle.shadowColor = shadow;
togetherTitle.shadowRadius = 3;

var togetherSub = widget.addText("Dec 27, 2025 · " + togetherLabel);
togetherSub.font = Font.regularRoundedSystemFont(11);
togetherSub.textColor = new Color("#fff", 0.6);
togetherSub.shadowColor = shadow;
togetherSub.shadowRadius = 3;

widget.addSpacer();

// Messages - left aligned, centered vertically
var convo = CONVOS[photoIndex];
for (var i = 0; i < convo.length; i++) {
  var msg = convo[i];
  var row = widget.addStack();
  row.layoutHorizontally();
  var bubble = row.addStack();
  bubble.backgroundColor = msg.from === "sb" ? new Color("#9b4d6e", 0.9) : new Color("#000", 0.5);
  bubble.cornerRadius = 14;
  bubble.setPadding(5, 12, 5, 12);
  var msgText = bubble.addText(msg.text);
  msgText.font = Font.regularRoundedSystemFont(13);
  msgText.textColor = Color.white();
  msgText.lineLimit = 1;
  row.addSpacer();
  if (i === 0) widget.addSpacer(3);
}

widget.addSpacer();

// Cities - both left aligned, side by side
var citiesRow = widget.addStack();
citiesRow.layoutHorizontally();
citiesRow.spacing = 24;

// London
var londonCard = citiesRow.addStack();
londonCard.layoutVertically();

var londonLabel = londonCard.addText("🫖 LONDON · " + londonDate);
londonLabel.font = Font.semiboldRoundedSystemFont(10);
londonLabel.textColor = new Color("#fff", 0.6);
londonLabel.shadowColor = shadow;
londonLabel.shadowRadius = 3;

var londonTimeText = londonCard.addText(londonTime);
londonTimeText.font = Font.boldRoundedSystemFont(24);
londonTimeText.textColor = Color.white();
londonTimeText.shadowColor = shadow;
londonTimeText.shadowRadius = 3;

var londonTempText = londonCard.addText(londonTemp + "°");
londonTempText.font = Font.boldRoundedSystemFont(16);
londonTempText.textColor = new Color("#e8a0bf", 1);
londonTempText.shadowColor = shadow;
londonTempText.shadowRadius = 3;

// SF
var sfCard = citiesRow.addStack();
sfCard.layoutVertically();

var sfLabel = sfCard.addText("🌁 SF · " + sfDate);
sfLabel.font = Font.semiboldRoundedSystemFont(10);
sfLabel.textColor = new Color("#fff", 0.6);
sfLabel.shadowColor = shadow;
sfLabel.shadowRadius = 3;

var sfTimeText = sfCard.addText(sfTime);
sfTimeText.font = Font.boldRoundedSystemFont(24);
sfTimeText.textColor = Color.white();
sfTimeText.shadowColor = shadow;
sfTimeText.shadowRadius = 3;

var sfTempText = sfCard.addText(sfTemp + "°");
sfTempText.font = Font.boldRoundedSystemFont(16);
sfTempText.textColor = new Color("#e8a0bf", 1);
sfTempText.shadowColor = shadow;
sfTempText.shadowRadius = 3;

citiesRow.addSpacer();

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}

Script.complete();
