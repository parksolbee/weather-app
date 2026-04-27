var PHOTOS = [
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo2.png",
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo3.png",
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo4.png",
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo5.png",
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo6.png",
];

var CONVOS = [
  [{ from: "sb", text: "Dreaming of you \uD83D\uDCAD\uD83E\uDEF6\uD83C\uDFFB" }, { from: "vas", text: "See you in the dreams" }],
  [{ from: "vas", text: "You can rely on Vasu \u2764\uFE0F" }, { from: "sb", text: "Nawww love you boo" }],
  [{ from: "vas", text: "I'm a ddongjaengyi \uD83D\uDCA9" }, { from: "sb", text: "You're my favorite ddongjaengyi" }],
  [{ from: "sb", text: "You're the love of my life" }, { from: "vas", text: "And you are mine" }],
  [{ from: "vas", text: "You're my everything" }, { from: "sb", text: "And I am yours" }],
];

var photoIndex = Math.floor(Date.now() / (10 * 60 * 1000)) % PHOTOS.length;

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

var shadow = new Color("#000", 0.5);
var widget = new ListWidget();
widget.setPadding(0, 0, 0, 0);
widget.backgroundColor = new Color("#111", 1);

// Top section: photo as background with together since + messages overlaid
var topSection = widget.addStack();
topSection.layoutHorizontally();
topSection.backgroundImage = bgImage;
topSection.size = new Size(0, 110);
topSection.setPadding(10, 14, 10, 14);

// Left spacer to push messages right
topSection.addSpacer();

// Right side: together since + messages
var rightCol = topSection.addStack();
rightCol.layoutVertically();
rightCol.spacing = 4;

// Together since overlay
var togetherBg = rightCol.addStack();
togetherBg.backgroundColor = new Color("#000", 0.5);
togetherBg.cornerRadius = 8;
togetherBg.setPadding(4, 8, 4, 8);
togetherBg.layoutVertically();

var togetherTitle = togetherBg.addText("Together since");
togetherTitle.font = Font.boldSystemFont(11);
togetherTitle.textColor = Color.white();

var togetherSub = togetherBg.addText("Dec 27, 2025 \u00B7 " + togetherLabel);
togetherSub.font = Font.systemFont(9);
togetherSub.textColor = new Color("#fff", 0.6);

rightCol.addSpacer();

// Messages overlay
var convo = CONVOS[photoIndex];
for (var i = 0; i < convo.length; i++) {
  var msg = convo[i];
  var row = rightCol.addStack();
  row.layoutHorizontally();
  if (msg.from === "sb") row.addSpacer();
  var bubble = row.addStack();
  bubble.backgroundColor = msg.from === "sb" ? new Color("#9b4d6e", 0.9) : new Color("#000", 0.5);
  bubble.cornerRadius = 10;
  bubble.setPadding(3, 8, 3, 8);
  var msgText = bubble.addText(msg.text);
  msgText.font = Font.systemFont(10);
  msgText.textColor = Color.white();
  msgText.lineLimit = 1;
  if (msg.from === "vas") row.addSpacer();
}

widget.addSpacer(6);

// City cards row
var citiesRow = widget.addStack();
citiesRow.layoutHorizontally();
citiesRow.spacing = 8;
citiesRow.setPadding(0, 14, 12, 14);

// London card
var londonCard = citiesRow.addStack();
londonCard.layoutVertically();
londonCard.backgroundColor = new Color("#fff", 0.05);
londonCard.cornerRadius = 14;
londonCard.setPadding(8, 10, 8, 10);

var londonHeader = londonCard.addStack();
londonHeader.layoutHorizontally();
londonHeader.spacing = 4;
var londonEmoji = londonHeader.addText("\uD83E\uDED6");
londonEmoji.font = Font.systemFont(10);
var londonLabel = londonHeader.addText("LONDON");
londonLabel.font = Font.semiboldSystemFont(9);
londonLabel.textColor = new Color("#fff", 0.5);

londonCard.addSpacer(2);
var londonTimeText = londonCard.addText(londonTime);
londonTimeText.font = Font.boldSystemFont(16);
londonTimeText.textColor = Color.white();

var londonInfo = londonCard.addStack();
londonInfo.layoutHorizontally();
londonInfo.spacing = 4;
var londonTempText = londonInfo.addText(londonTemp + "\u00B0");
londonTempText.font = Font.boldSystemFont(13);
londonTempText.textColor = new Color("#e8a0bf", 1);
var londonDateText = londonInfo.addText(londonDate);
londonDateText.font = Font.systemFont(9);
londonDateText.textColor = new Color("#fff", 0.3);

// SF card
var sfCard = citiesRow.addStack();
sfCard.layoutVertically();
sfCard.backgroundColor = new Color("#fff", 0.05);
sfCard.cornerRadius = 14;
sfCard.setPadding(8, 10, 8, 10);

var sfHeader = sfCard.addStack();
sfHeader.layoutHorizontally();
sfHeader.spacing = 4;
var sfEmoji = sfHeader.addText("\uD83C\uDF01");
sfEmoji.font = Font.systemFont(10);
var sfLabel = sfHeader.addText("SAN FRANCISCO");
sfLabel.font = Font.semiboldSystemFont(9);
sfLabel.textColor = new Color("#fff", 0.5);

sfCard.addSpacer(2);
var sfTimeText = sfCard.addText(sfTime);
sfTimeText.font = Font.boldSystemFont(16);
sfTimeText.textColor = Color.white();

var sfInfo = sfCard.addStack();
sfInfo.layoutHorizontally();
sfInfo.spacing = 4;
var sfTempText = sfInfo.addText(sfTemp + "\u00B0");
sfTempText.font = Font.boldSystemFont(13);
sfTempText.textColor = new Color("#e8a0bf", 1);
var sfDateText = sfInfo.addText(sfDate);
sfDateText.font = Font.systemFont(9);
sfDateText.textColor = new Color("#fff", 0.3);

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}

Script.complete();
