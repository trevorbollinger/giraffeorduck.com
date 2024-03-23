function startButton() {
  var startButton = document.getElementById("startButton");
  var giraffeButton = document.getElementById("giraffeButton");
  var duckButton = document.getElementById("duckButton");
  var imageDisplay = document.getElementById("imageDisplay");
  var imageContainer = document.getElementById("imageContainer");

  imageDisplay.src = "images/image1.jpg";
  imageContainer.style.height = "200px";

  startButton.style.display = "none";
  giraffeButton.style.display = "block";
  duckButton.style.display = "block";
  imageDisplay.style.display = "block";

  changeColor("box1", "blue");
}

function giraffeButton() {
  checkAnswer("giraffe");
}

function duckButton() {
  checkAnswer("duck");
}

function checkAnswer(answer) {
  if (answer === answers[roundNum]) {
    score++;
    changeColor("box" + roundNum, "green");
  } else {
    changeColor("box" + roundNum, "red");
  }

  roundNum++;

  document.getElementById("imageDisplay").src = "images/" + images[roundNum];
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
