function startButton() {
  var startButton = document.getElementById("startButton");
  var giraffeButton = document.getElementById("giraffeButton");
  var duckButton = document.getElementById("duckButton");
  var imageDisplay = document.getElementById("imageDisplay");
  var imageContainer = document.getElementById("imageContainer");
  var buttonContainer = document.getElementById("buttonContainer");
  var scoreboard = document.getElementById("scoreboard");
  var content = document.getElementById("content");
  var scoreCount = document.getElementById("scoreCount");

  imageDisplay.src = "images/image0.jpg";

  startButton.style.display = "none";
  giraffeButton.style.display = "inline-flex";
  duckButton.style.display = "inline-flex";
  imageDisplay.style.display = "flex";
  imageContainer.style.display = "flex";
  scoreboard.style.display = "flex";
  scoreCount.style.display = "flex";
  content.style.display = "flex";
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
  var endmsg = document.getElementById("endmsg");

  imageDisplay.src = "images/image1.jpg";
  imageContainer.style.height = "0px";

  startButton.style.display = "none";
  giraffeButton.style.display = "none";
  duckButton.style.display = "none";
  imageDisplay.style.display = "none";
  shareButton.style.display = "flex";
  imageContainer.style.display = "none";
  endmsg.style.display = "flex";

  if (score <= 0) {
    endmsg.innerHTML = "You got " + score + " correct!\nDumbass!";
  } else {
    endmsg.innerHTML = "You got " + score + " correct!";
  }

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
