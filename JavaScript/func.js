function startButton() {
  console.log(currentIteration());

  var startButton = document.getElementById("startButton");
  var giraffeButton = document.getElementById("giraffeButton");
  var duckButton = document.getElementById("duckButton");
  var imageDisplay = document.getElementById("imageDisplay");
  var imageContainer = document.getElementById("imageContainer");
  var buttonContainer = document.getElementById("buttonContainer");
  var scoreboard = document.getElementById("scoreboard");
  var content = document.getElementById("content");
  var scoreCount = document.getElementById("scoreCount");
  var instrButton = document.getElementById("instrButton");
  var info = document.getElementById("info");
  var imgnum = currentIteration()*5;
  var navbar = document.querySelector('.navbar');
    var logoCon = document.getElementById("logoContainer");
  logoCon.style.display = "none";


  imageDisplay.src = "images/animals/image_" + imgnum + ".jpg";

  startButton.style.display = "none";
  giraffeButton.style.display = "inline-flex";
  duckButton.style.display = "inline-flex";
  imageDisplay.style.display = "flex";
  imageContainer.style.display = "flex";
  scoreboard.style.display = "flex";
  scoreCount.style.display = "flex";
  content.style.display = "flex";
  info.style.display = "none";
  instrButton.style.display = "none";
      navbar.style.display = 'flex';

}

function giraffeButton() {
  checkAnswer("g");
}

function duckButton() {
  checkAnswer("d");
}

function checkAnswer(answer) {

  console.log(roundNum);
  if (answer === answers[roundNum]) {
    score++;
    resultArray[roundNum] = "✅";
    changeColor("box" + roundNum, "green");
  } else {
    resultArray[roundNum] = "❌";
    changeColor("box" + roundNum, "red");
  }
  roundNum++;
  if (roundNum == 5) {
    endGame();
  } else {
    var imgnum = currentIteration()*5+roundNum;
    document.getElementById("imageDisplay").src =
      "images/animals/image_" + imgnum + ".jpg";
  }
}

function endGame() {
  var startButton = document.getElementById("startButton");
  var giraffeButton = document.getElementById("giraffeButton");
  var duckButton = document.getElementById("duckButton");
  var imageDisplay = document.getElementById("imageDisplay");
  var imageContainer = document.getElementById("imageContainer");
  var shareButton = document.getElementById("shareButton");
  var endmsg = document.getElementById("endmsg");


  imageContainer.style.height = "0px";

  startButton.style.display = "none";
  giraffeButton.style.display = "none";
  duckButton.style.display = "none";
  imageDisplay.style.display = "none";
  shareButton.style.display = "flex";
  imageContainer.style.display = "none";
  endmsg.style.display = "flex";


  endmsg.innerHTML = "Your score is " + score + "/5. Thank you for playing!";
  

  shareMsg = "Giraffe or Duck? #" + currentIteration() + "\n" + resultArray.join("");

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

function currentIteration() {
    const targetDate = new Date('2024-02-22T00:00:01');
    const currentDate = new Date();
    const easternCurrentDate = new Date(currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const timeDifference = easternCurrentDate.getTime() - targetDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
}


    // Function to open the popup
    function openPopup() {
        document.getElementById("popupOverlay").style.display = "block";
        document.getElementById("popup").style.display = "block";
    }

    // Function to close the popup
    function closePopup() {
        document.getElementById("popupOverlay").style.display = "none";
        document.getElementById("popup").style.display = "none";
    }