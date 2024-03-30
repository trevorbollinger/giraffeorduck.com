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

var rawanswers =
  "nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnndggdggggdggdgdgggggddgdgggddgd";
var answers = rawanswers.split("");

var isChecked = false;
var imagepath = "images/princessibuprofen/Trolling";

var roundNum = 0;
var score = 0;

var shareMsg = "";

var resultArray = ["-", "-", "-", "-", "-"];

function share() {
  navigator.clipboard.writeText(shareMsg).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    },
  );

  navigator.share({
    text: shareMsg,
  });
}

// Get the current date
var currentDate = new Date();

// Format the date as desired (e.g., "March 24, 2024")
var formattedDate = currentDate.toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

// Set the formatted date to the paragraph element
document.getElementById("currentDate").innerText = formattedDate;
document.getElementById("currentIteration").innerText =
  "#" + currentIteration();

function currentIteration() {
  const targetDate = new Date("2024-02-23");
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - targetDate.getTime();
  const daysDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
}
