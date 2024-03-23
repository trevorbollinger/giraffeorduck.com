function startButton() {
  var startButton = document.getElementById("startButton");
  var giraffeButton = document.getElementById("giraffeButton");
  var duckButton = document.getElementById("duckButton");
  var imageDisplay = document.getElementById("imageDisplay");
  var imageContainer = document.getElementById("imageContainer");

  imageDisplay.src = "images/image0.jpg";
  imageContainer.style.height = "200px";

  startButton.style.display = "none";
  giraffeButton.style.display = "block";
  duckButton.style.display = "block";
  imageDisplay.style.display = "block";
}

function giraffeButton() {
  checkAnswer("g");
}

function duckButton() {
  checkAnswer("d");
}

function checkAnswer(answer) {
  if (answer === answers[roundNum]) {
    score++;
    resultArray[roundNum] = "✅";
    changeColor("box" + roundNum, "green");
  } else {
    resultArray[roundNum] = "❌";
    changeColor("box" + roundNum, "red");
  }

  if (roundNum == 4) {
    endGame();
  } else {
    document.getElementById("imageDisplay").src = "images/" + images[roundNum];
  }
  roundNum++;
}

function endGame() {
  var startButton = document.getElementById("startButton");
  var giraffeButton = document.getElementById("giraffeButton");
  var duckButton = document.getElementById("duckButton");
  var imageDisplay = document.getElementById("imageDisplay");
  var imageContainer = document.getElementById("imageContainer");
  var shareButton = document.getElementById("shareButton");

  imageDisplay.src = "images/image1.jpg";
  imageContainer.style.height = "0px";

  startButton.style.display = "none";
  giraffeButton.style.display = "none";
  duckButton.style.display = "none";
  imageDisplay.style.display = "none";
  shareButton.style.display = "block";

  shareMsg = "Giraffe or Duck? #" + day + "\n" + resultArray.join("");

  console.log(shareMsg);
}

function changeColor(boxId, colorAlias) {
  var box = document.getElementById(boxId);
  if (box) {
    // Check if the color alias exists in the object
    if (colorAliases[colorAlias]) {
      box.style.backgroundColor = colorAliases[colorAlias];
    } else {
      console.error("Color alias not found: " + colorAlias);
    }
  } else {
    console.error("Box not found with ID: " + boxId);
  }
}
