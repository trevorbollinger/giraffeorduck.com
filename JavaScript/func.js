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
}

function giraffeButton() {
  checkAnswer("giraffe");
}

function duckButton() {
  checkAnswer("duck");
}

function checkAnswer(answer) {
  if (roundNum < 4) {
    if (answer === answers[roundNum]) {
      score++;
      changeColor("box" + roundNum, "green");
    } else {
      changeColor("box" + roundNum, "red");
    }

    roundNum++;

    document.getElementById("imageDisplay").src = "images/" + images[roundNum];
  } else {
    endGame();
  }
}

function endGame() {
  var startButton = document.getElementById("startButton");
  var giraffeButton = document.getElementById("giraffeButton");
  var duckButton = document.getElementById("duckButton");
  var imageDisplay = document.getElementById("imageDisplay");
  var imageContainer = document.getElementById("imageContainer");

  imageDisplay.src = "images/image1.jpg";
  imageContainer.style.height = "0px";

  startButton.style.display = "none";
  giraffeButton.style.display = "none";
  duckButton.style.display = "none";
  imageDisplay.style.display = "none";
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

function shareBut() {
  if (navigator.share) {
    navigator
      .share({
        title: "web.dev",
        text: "Check out web.dev.",
        url: "https://web.dev/",
      })
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error));
  }
}

window.Clipboard = (function (window, document, navigator) {
  var textArea, copy;

  function isOS() {
    return navigator.userAgent.match(/ipad|iphone/i);
  }

  function createTextArea(text) {
    textArea = document.createElement("textArea");
    textArea.value = text;
    document.body.appendChild(textArea);
  }

  function selectText() {
    var range, selection;

    if (isOS()) {
      range = document.createRange();
      range.selectNodeContents(textArea);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }
  }

  function copyToClipboard() {
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }

  copy = function (text) {
    createTextArea(text);
    selectText();
    copyToClipboard();
  };

  return {
    copy: copy,
  };
})(window, document, navigator);
