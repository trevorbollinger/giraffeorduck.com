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
var roundNum = 0;
var score = 0;

("use strict");

function sleep(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function logText(message, isError) {
  if (isError) console.error(message);
  else console.log(message);

  const p = document.createElement("p");
  if (isError) p.setAttribute("class", "error");
  document.querySelector("#output").appendChild(p);
  p.appendChild(document.createTextNode(message));
}

function logError(message) {
  logText(message, true);
}

function setShareButtonsEnabled(enabled) {
  document.querySelector("#share").disabled = !enabled;
  document.querySelector("#share-no-gesture").disabled = !enabled;
}

function checkboxChanged(e) {
  const checkbox = e.target;
  const textfield = document.querySelector("#" + checkbox.id.split("_")[0]);

  textfield.disabled = !checkbox.checked;
  if (!checkbox.checked) textfield.value = "";
}

async function testWebShare() {
  const title_input = document.querySelector("#title");
  const text_input = document.querySelector("#text");
  const url_input = document.querySelector("#url");

  const title = title_input.disabled ? undefined : title_input.value;
  const text = text_input.disabled ? undefined : text_input.value;
  const url = url_input.disabled ? undefined : url_input.value;
  setShareButtonsEnabled(false);
  try {
    await navigator.share({ title, text, url });
    logText("Successfully sent share");
  } catch (error) {
    logError("Error sharing: " + error);
  }
  setShareButtonsEnabled(true);
}

async function testWebShareDelay() {
  setShareButtonsEnabled(false);
  await sleep(6000);
  testWebShare();
}

function onLoad() {
  // Checkboxes disable and delete textfields.
  document
    .querySelector("#title_checkbox")
    .addEventListener("click", checkboxChanged);
  document
    .querySelector("#text_checkbox")
    .addEventListener("click", checkboxChanged);
  document
    .querySelector("#url_checkbox")
    .addEventListener("click", checkboxChanged);

  document.querySelector("#share").addEventListener("click", testWebShare);
  document
    .querySelector("#share-no-gesture")
    .addEventListener("click", testWebShareDelay);

  if (navigator.share === undefined) {
    setShareButtonsEnabled(false);
    if (window.location.protocol === "http:") {
      // navigator.share() is only available in secure contexts.
      //  window.location.replace(window.location.href.replace(/^http:/, "https:"));
    } else {
      logError(
        "Error: You need to use a browser that supports this draft " +
          "proposal.",
      );
    }
  }
}

window.addEventListener("load", onLoad);
