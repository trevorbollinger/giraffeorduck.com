var colorAliases = {
  blue: "#0d6efd",
  red: "#9e221e",
  green: "#198754",
  yellow: "#ffc107",
  // Add more aliases as needed
};

var images = [
  "image1.jpg",
  "image2.webp",
  "image3.jpg",
  "image4.jpg",
  "image5.jpg",
];

var answers = ["giraffe", "giraffe", "giraffe", "duck", "duck"]; // replace with your answers

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
let encoder = new TextEncoder(); // This defaults to UTF-8
