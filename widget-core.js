const PHOTOS = [
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo2.png",
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo3.png",
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo4.png",
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo5.png",
  "https://raw.githubusercontent.com/parksolbee/weather-app/main/public/photo6.png",
];

const CONVOS = [
  [{ from: "sb", text: "Dreaming of you \uD83D\uDCAD\uD83E\uDEF6\uD83C\uDFFB" }, { from: "vas", text: "See you in the dreams" }],
  [{ from: "vas", text: "You can rely on Vasu \u2764\uFE0F" }, { from: "sb", text: "Nawww love you boo" }],
  [{ from: "vas", text: "I'm a ddongjaengyi \uD83D\uDCA9" }, { from: "sb", text: "You're my favorite ddongjaengyi" }],
  [{ from: "sb", text: "You're the love of my life" }, { from: "vas", text: "And you are mine" }],
  [{ from: "vas", text: "You're my everything" }, { from: "sb", text: "And I am yours" }],
];

const photoIndex = Math.floor(Date.now() / (10 * 60 * 1000)) % PHOTOS.length;

const londonReq = new Request("https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=-0.1276&current=temperature_2m&timezone=Europe%2FLondon");
const sfReq = new Request("https://api.open-meteo.com/v1/forecast?latitude=37.7749&longitude=-122.4194&current=temperature_2m&timezone=America%2FLos_Angeles");
const londonRes = await londonReq.loadJSON();
const sfRes = await sfReq.loadJSON();
const londonTemp = Math.round(londonRes.current.temperature_2m);
const sfTemp = Math.round(sfRes.current.temperature_2m);

const imgReq = new Request(PHOTOS[photoIndex]);
const bgImage = await imgReq.loadImage();

const now = new Date();
const londonTime = now.toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Europe/London" }).toUpperCase();
const londonDate = now.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "Europe/London" });
const sfTime = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/Los_Angeles" }).toUpperCase();
const sfDate = now.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "America/Los_Angeles" });

const togetherSince = new Date("2025-12-27");
const diffDays = Math.floor((now.getTime() - togetherSince.getTime()) / (1000 * 60 * 60 * 24));
let togetherLabel;
if (diffDays < 0) {
  togetherLabel = "Not yet!";
} else if (diffDays < 7) {
  togetherLabel = diffDays + (diffDays === 1 ? " day" : " days");
} else if (diffDays < 30) {
  const weeks = Math.floor(diffDays / 7);
  togetherLabel = weeks + (weeks === 1 ? " week" : " weeks");
} else if (diffDays < 365) {
  const months = Math.floor(diffDays / 30);
  togetherLabel = months + (months === 1 ? " month" : " months");
} else {
  togetherLabel = diffDays + " days";
}

const shadow = new Color("#000", 0.5);
const widget = new ListWidget();
widget.setPadding(16, 20, 16, 20);
widget.backgroundColor = new Color("#111", 1);

// Together since (top)
const togetherTitle = widget.addText("Together since");
togetherTitle.font = Font.boldSystemFont(14);
togetherTitle.textColor = Color.white();

const togetherSub = widget.addText("Dec 27, 2025 \u00B7 " + togetherLabel);
togetherSub.font = Font.systemFont(11);
togetherSub.textColor = new Color("#fff", 0.4);

widget.addSpacer(4);

// Photo + messages row
const midRow = widget.addStack();
midRow.layoutHorizontally();
midRow.centerAlignContent();
midRow.spacing = 10;

// Photo
const photoStack = midRow.addStack();
photoStack.size = new Size(70, 70);
photoStack.cornerRadius = 35;
photoStack.borderWidth = 2;
photoStack.borderColor = new Color("#e8a0bf", 0.4);
const photo = photoStack.addImage(bgImage);
photo.imageSize = new Size(70, 70);
photo.containerRelativeShape = true;

// Messages
const msgStack = midRow.addStack();
msgStack.layoutVertically();
msgStack.spacing = 3;

const convo = CONVOS[photoIndex];
for (const msg of convo) {
  const row = msgStack.addStack();
  row.layoutHorizontally();
  if (msg.from === "sb") row.addSpacer();
  const bubble = row.addStack();
  bubble.backgroundColor = msg.from === "sb" ? new Color("#9b4d6e", 1) : new Color("#fff", 0.1);
  bubble.cornerRadius = 10;
  bubble.setPadding(3, 8, 3, 8);
  const msgText = bubble.addText(msg.text);
  msgText.font = Font.systemFont(10);
  msgText.textColor = Color.white();
  msgText.lineLimit = 1;
  if (msg.from === "vas") row.addSpacer();
}

widget.addSpacer(6);

// City cards row
const citiesRow = widget.addStack();
citiesRow.layoutHorizontally();
citiesRow.spacing = 8;

// London card
const londonCard = citiesRow.addStack();
londonCard.layoutVertically();
londonCard.backgroundColor = new Color("#fff", 0.05);
londonCard.cornerRadius = 14;
londonCard.setPadding(10, 12, 10, 12);
londonCard.size = new Size(0, 0);

const londonHeader = londonCard.addStack();
londonHeader.layoutHorizontally();
londonHeader.spacing = 4;
const londonEmoji = londonHeader.addText("\uD83E\uDED6");
londonEmoji.font = Font.systemFont(10);
const londonLabel = londonHeader.addText("LONDON");
londonLabel.font = Font.semiboldSystemFont(9);
londonLabel.textColor = new Color("#fff", 0.5);

londonCard.addSpacer(4);
const londonTimeText = londonCard.addText(londonTime);
londonTimeText.font = Font.boldSystemFont(18);
londonTimeText.textColor = Color.white();

const londonInfo = londonCard.addStack();
londonInfo.layoutHorizontally();
londonInfo.spacing = 4;
const londonTempText = londonInfo.addText(londonTemp + "\u00B0");
londonTempText.font = Font.boldSystemFont(14);
londonTempText.textColor = new Color("#e8a0bf", 1);
const londonDateText = londonInfo.addText(londonDate);
londonDateText.font = Font.systemFont(9);
londonDateText.textColor = new Color("#fff", 0.3);

// SF card
const sfCard = citiesRow.addStack();
sfCard.layoutVertically();
sfCard.backgroundColor = new Color("#fff", 0.05);
sfCard.cornerRadius = 14;
sfCard.setPadding(10, 12, 10, 12);

const sfHeader = sfCard.addStack();
sfHeader.layoutHorizontally();
sfHeader.spacing = 4;
const sfEmoji = sfHeader.addText("\uD83C\uDF01");
sfEmoji.font = Font.systemFont(10);
const sfLabel = sfHeader.addText("SAN FRANCISCO");
sfLabel.font = Font.semiboldSystemFont(9);
sfLabel.textColor = new Color("#fff", 0.5);

sfCard.addSpacer(4);
const sfTimeText = sfCard.addText(sfTime);
sfTimeText.font = Font.boldSystemFont(18);
sfTimeText.textColor = Color.white();

const sfInfo = sfCard.addStack();
sfInfo.layoutHorizontally();
sfInfo.spacing = 4;
const sfTempText = sfInfo.addText(sfTemp + "\u00B0");
sfTempText.font = Font.boldSystemFont(14);
sfTempText.textColor = new Color("#e8a0bf", 1);
const sfDateText = sfInfo.addText(sfDate);
sfDateText.font = Font.systemFont(9);
sfDateText.textColor = new Color("#fff", 0.3);

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}

Script.complete();
