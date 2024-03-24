var colorAliases = {
  blue: "#0d6efd",
  red: "#9e221e",
  green: "#198754",
  yellow: "#ffc107",
  darkgrey: "#404040",
};

var images = [
  "image_0.jpg",
  "image_1.jpg",
  "image_2.jpg",
  "image_3.jpg",
  "image_4.jpg",
];

var answers = ["g", "d", "g", "g", "d"];

var day = 30;

var roundNum = 0;
var score = 0;

var shareMsg = "";

var resultArray = ["-", "-", "-", "-", "-"];

function share() {
  navigator.share({
    text: shareMsg,
  });
}
