const cursor = document.getElementById("cursor");
const cursorText = document.getElementById("currentCursor");
const score = document.getElementById("score");
const multiplierValue = document.getElementById("multiplierValue");
const MultiplierPriseElm = document.getElementById("MultiplierPrise");
const supermultiplierValue = document.getElementById("supermultiplierValue");
const SuperMultiplierPriseElm = document.getElementById("SuperMultiplierPrise");
const clicksperclick = document.getElementById("clicksperclick");
const events = document.getElementById("events");
const eventtime = document.getElementById("eventtime");


var scale = 1;
var multiplier = 1;
var supermultiplier = 1; // Initialize supermultiplier

let scoreValue = 0; // Initialize a score variable
let currentCursor = "Standard"; // Initialize current cursor name

cursor.addEventListener("click", function (e) {
  // click DETECT
  const click_audio = document.createElement("audio");
  click_audio.src = "audio/click_sound.mp3";
  click_audio.play();

  console.log("hit cursor");
  ScoreApply(); // Increment the score value
  scale += 0.1; // Increase the scale of the cursor by 0.1
  cursor.style.transform =
    "rotate(" + (Math.random() * 360 - 180) + "deg) scale(" + scale + ")";
  cursor.style.transition = "transform 0.2s";

  // Create a span element at the click location
  const span = document.createElement("span");
  span.innerText = "+" + plusscoreperclick;
  span.style.padding = "2px";
  span.style.opacity = "0.7";
  span.style.position = "absolute";
  span.style.left = e.pageX + "px";
  span.style.top = e.pageY + "px";
  span.style.transform = "translate(-50%, -50%)"; // Center the span at the click location
  span.style.pointerEvents = "none"; // Make sure the span does not interfere with clicks
  span.style.color = "white";
  span.style.backgroundColor = "black"
  span.style.borderRadius = "20%";
  // span.style.mixBlendMode = "difference";
  span.style.transition = "1s";
  document.body.appendChild(span);
  setTimeout(() => {
    span.style.transform = "translate(-50%, -200%)";
    span.style.opacity = "0";
  }, 0);

  setTimeout(() => {
    span.remove();
  }, 1000);

  setTimeout(() => {
    cursor.style.transform = "rotate(0deg) scale(1)";
    cursor.style.transition = "transform 1s";
  }, 500);

  checkScore(); // Call checkScore to potentially change the cursor image
  SettingsApply(); // Update the settings
});

setInterval(() => {
  scale = 1; // Reset the scale to 1
}, 1000);

var plusscoreperclick = 1 * multiplier * supermultiplier;
function ScoreApply() {
  plusscoreperclick = 1 * multiplier * supermultiplier;
  scoreValue += plusscoreperclick; // Correctly increment scoreValue
}

function checkScore() {   
  if (scoreValue > 220) {
    cursor.setAttribute("src", "img/doritos cursor.png"); // Change cursor image if score > 200
    currentCursor = "Doritos Cursor";
  }
   else if (scoreValue > 200) {
    cursor.setAttribute("src", "img/google cursor.gif"); // Change cursor image if score > 200
    currentCursor = "Google Cursor";
  } else if (scoreValue > 150) {
    cursor.setAttribute("src", "img/gradient-cursor.png"); // Change cursor image if score > 150
    currentCursor = "Gradient Cursor";
  } else if (scoreValue > 120) {
    cursor.setAttribute("src", "img/fish cursor.gif"); // Change cursor image if score > 120
    currentCursor = "Fish Cursor";
  } else if (scoreValue > 100) {
    cursor.setAttribute("src", "img/MacOs.jpg"); // Change cursor image if score > 100
    currentCursor = "Mac OS Cursor";
  } else if (scoreValue > 80) {
    cursor.setAttribute("src", "img/among sus.gif"); // Change cursor image if score > 80
    currentCursor = "Among sus";
  } else if (scoreValue > 50) {
    cursor.setAttribute("src", "img/pixel_cursor.jpg"); // Change cursor image if score > 50
    currentCursor = "Pixel Cursor";
  } else if (scoreValue > 20) {
    cursor.setAttribute("src", "img/tick-pok cursor.jpg"); // Change cursor image if score > 20
    currentCursor = "Tick-Pok";
  } else {
    cursor.setAttribute("src", "img/start-cursor.jpg"); // Reset cursor image if score <= 20
    currentCursor = "Standard"; // Reset cursor image name to Standard when score <= 20
  }
  applyCursorText();
}

function applyCursorText() {
  cursorText.innerHTML = "Current Cursor: " + currentCursor; // Update cursor text element with the current cursor image name
}

function SettingsApply() {
  applyCursorText();
  MultiplierPriseCalc();
  SuperMultiplierPriseCalc();
  localStorageSet();
  score.innerHTML = "Score: " + scoreValue;
  multiplierValue.innerHTML = "Multiplier: " + multiplier;
  MultiplierPriseElm.innerHTML = "Multiplier Prise: " + MultiplierPrise;
  supermultiplierValue.innerHTML = "Supermultiplier: " + supermultiplier;
  SuperMultiplierPriseElm.innerHTML =
    "Supermultiplier Prise: " + SuperMultiplierPrise;
  clicksperclick.innerHTML = "Clicks per Click: " + plusscoreperclick;
}

var MultiplierPrise;
function MultiplierPriseCalc() {
  MultiplierPrise = multiplier * 100;
}

var SuperMultiplierPrise;
function SuperMultiplierPriseCalc() {
  SuperMultiplierPrise = supermultiplier * MultiplierPrise * 10;
}


document
  .getElementById("multiplierPlus")
  .addEventListener("click", function () {
    if (MultiplierPrise <= scoreValue) {
      const click_audio = document.createElement("audio");
      click_audio.src = "audio/sfx_patcher_button_launch.mp3";
      click_audio.play();

      multiplier++;
      scoreValue -= MultiplierPrise; // Correctly subtract from scoreValue
      SettingsApply();
    } else {
      alert("Not enough points for multiplier prize.");
    }
  });


document
  .getElementById("supermultiplierPlus")
  .addEventListener("click", function () {
    if (SuperMultiplierPrise <= scoreValue) {
      const click_audio = document.createElement("audio");
      click_audio.src = "audio/inceptionbutton.mp3";
      click_audio.play();

      supermultiplier++;
      scoreValue -= SuperMultiplierPrise; // Correctly subtract from scoreValue
      SettingsApply();
    } else {
      alert("Not enough points for super multiplier prize.");
    }
  });

function localStorageSet() {
  if (commandEntered === false) {
    localStorage.setItem("score", scoreValue);
    localStorage.setItem("multiplier", multiplier);
    localStorage.setItem("supermultiplier", supermultiplier);
  } else if (commandEntered === true && cheats === 1) {
    localStorage.setItem("score", scoreValue);
    localStorage.setItem("multiplier", multiplier);
    localStorage.setItem("supermultiplier", supermultiplier);
  } else {console.error("YOU USING DEVELOPMENT CONSOLE!!?!?!?!?!??!")}
}

function localStorageGet() {
  scoreValue = parseInt(localStorage.getItem("score")) || 0; // Default to 0 if null
  multiplier = parseInt(localStorage.getItem("multiplier")) || 1; // Default to 1 if null
  supermultiplier = parseInt(localStorage.getItem("supermultiplier")) || 1; // Default to 1 if null
  SettingsApply();
}

window.addEventListener("load", localStorageGet);

// Events
const eventList = [
  { name: "Block", duration: () => Math.random() * 5000, action: blockEvent },
  { name: "Double Score", duration: () => 10000, action: doubleScoreEvent },
  {
    name: "Halve Multiplier",
    duration: () => 5000,
    action: halveMultiplierEvent
  }
];

function blockEvent(duration) {
  events.innerHTML = 'Event: <span class="red">Block!</span>';
  cursor.style.display = "none";
  setTimeout(() => {
    cursor.style.display = "block";
    events.innerHTML = 'Event: <span class="red"></span>';
  }, duration);
}

function doubleScoreEvent(duration) {
  events.innerHTML = 'Event: <span class="green">Double Score!</span>';
  const originalMultiplier = multiplier;
  multiplier *= 2;
  setTimeout(() => {
    multiplier = originalMultiplier;
    events.innerHTML = 'Event: <span class="green"></span>';
  }, duration);
}

function halveMultiplierEvent(duration) {
  events.innerHTML = 'Event: <span class="red">Halve Multiplier!</span>';
  const originalMultiplier = multiplier;
  multiplier /= 2;
  setTimeout(() => {
    multiplier = originalMultiplier;
    events.innerHTML = 'Event: <span class="green"></span>';
  }, duration);
}

function triggerRandomEvent() {
  const randomEvent = eventList[Math.floor(Math.random() * eventList.length)];
  const duration = randomEvent.duration();
  randomEvent.action(duration);
  resetNextEventTimer();
}

function resetNextEventTimer() {
  nextEventTime = Math.random() * 120;
  clearInterval(nextEventInterval);
  startNextEventCountdown();
}

function startNextEventCountdown() {
  eventtime.innerHTML = `Time to next event: ${Math.ceil(
    nextEventTime
  )} seconds`;
  nextEventInterval = setInterval(() => {
    nextEventTime -= 1;
    eventtime.innerHTML = `Time to next event: ${Math.ceil(
      nextEventTime
    )} seconds`;
    if (nextEventTime <= 0) {
      clearInterval(nextEventInterval);
      triggerRandomEvent();
    }
  }, 1000);
}

let nextEventTime = Math.random() * 120;
let nextEventInterval;
startNextEventCountdown();

function resetGame() {
  scoreValue = 0;
  multiplier = 1;
  supermultiplier = 1;
  SettingsApply();
  localStorageSet();
}

function GetAll() {
  scoreValue = Infinity;
  multiplier = Infinity;
  supermultiplier = Infinity;
}

// Developer ui opener
function devuiOpener() {
  if (devui.style.display === "none") {
    devui.style.display = "block";
  } else if (devui.style.display === "block") {
    devui.style.display = "none";
  }
}

// dev tools
var CommandsEnterCount = 0;
const devconsoleAB = document.getElementById("devconsoleAB");
const devui = document.getElementById("devui");
const DCOAH = document.getElementById("devconsoleOutputandHistory");
var Devconsoleoutput = null;
var cheats = 0;
var commandEntered = false;
if (devconsoleAB !== null) {
  devconsoleAB.addEventListener("click", devconsoleApply);
}

// Select all elements with the class 'devconsole'
// Step 1: Select all input elements with the class 'devconsole'
const devconsole = document.querySelectorAll("#devconsole");

// Step 2: Loop through each element and add the keyup event listener
devconsole.forEach((element, index) => {
  // Ensure the element is an input element
  if (element instanceof HTMLInputElement) {
    console.log(`Attaching listener to input element ${index}`, element); // Debugging log
    // Step 3: Add keyup event listener to trigger on Enter key
    element.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        devconsoleApply(element); // Pass the input element itself
      }
    });
  } else {
    console.error(`Element at index ${index} is not an input or is undefined:`, element); // Log if not an input
  }
});

// Step 4: Define the devconsoleApply function to handle the input command
function devconsoleApply(inputElement) {
  // Step 5: Validate the input element
  
  if (!inputElement || !(inputElement instanceof HTMLInputElement) || typeof inputElement.value !== 'string') {
    console.error("Invalid input element or no value provided:", inputElement); // Enhanced error handling
    Devconsoleoutput = "Invalid input element or no value provided";
    return;
  }

  // Step 6: Trim and process the input value
  let input = inputElement.value.trim().toLowerCase(); // Get and sanitize the input value

  // Step 7: Handle commands based on input value using if statements
  if (input === "is") {
    scoreValue = Infinity;
    Devconsoleoutput = "Score is now infinite";
  } else if (input.startsWith("ss ")) {
    // Check for 'ss <number>' format
    let parts = input.split(" ");
    if (parts.length === 2 && !isNaN(parts[1])) {
      scoreValue = parseInt(parts[1], 10);
      Devconsoleoutput = "Score is now " + scoreValue;
    } else {
      console.error("Invalid input format. Please use 'ss <number>'.");
      Devconsoleoutput = "Invalid input format. Please use 'ss <number>'.";
    }
  } else if (input === "reset") {
    resetGame(); // Call resetGame function
    Devconsoleoutput = "Game has been reset";
  } else if (input === "" || input === null || input === undefined) {
    console.error("No input provided."); // Handle empty input
  } else if (input === "ga" || input === "getall") {
    GetAll(); // Call GetAll function
    Devconsoleoutput = "Score, multiplier, and supermultiplier are now infinite";
  } else if (input.startsWith("cheats ")) {
    // Check for 'cheats <number>' format
    let parts = input.split(" ");
    if (parts.length === 2 && !isNaN(parts[1])) {
      cheats = parseInt(parts[1], 10);
      Devconsoleoutput = "cheats is now " + cheats;
    } else {
      console.error("Invalid input format. Please use 'cheats <number>'.");
      Devconsoleoutput = "Invalid input format. Please use 'cheats <number>'.";
    }
  } else if (
    input === "ui" ||
    input === "user interface" ||
    input === "dev ui" ||
    input === "development user interface"
  ) {
    devuiOpener(); // Call devuiOpener function
    Devconsoleoutput = "UI is now open";
  } else {
    // Command not found
    console.error(`Command '${input}' not found.`);
    Devconsoleoutput = `Command '${input}' not found.`;
  }
  // output in console
  if (inputElement !== null || inputElement !== undefined) {
    DCOAH.innerHTML += CommandsEnterCount + ". " + inputElement.value + ':  ' + Devconsoleoutput + "<br>";
  }

  // Step 8: Call necessary functions and clear input
  localStorageSet();   // Save any changes to local storage
  checkScore();        // Check score and potentially update UI
  SettingsApply();     // Apply any settings updates
  inputElement.value = ''; // Clear the input field after processing
  Devconsoleoutput = null; // clear the Devconsoleoutput variable
  CommandsEnterCount++
}

devuiOpener()
devuiOpener()


document.querySelector('#devui ::after').addEventListener('click', devuiOpener);


// Localstorge get
function Update() {
  localStorageGet(); // get the local storage objects
  checkScore(); // Call checkScore to potentially change the cursor image
  SettingsApply(); // Update the settings
}
Update()


// CONESOLE DRAGING
const draggable = document.querySelector('.draggable');

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// Mouse down event
draggable.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - draggable.offsetLeft;
    offsetY = e.clientY - draggable.offsetTop;
    draggable.style.cursor = 'grabbing';
});

// Mouse move event
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        draggable.style.left = `${e.clientX - offsetX}px`;
        draggable.style.top = `${e.clientY - offsetY}px`;
    }
});

// Mouse up event
document.addEventListener('mouseup', () => {
    isDragging = false;
    draggable.style.cursor = 'grab';
});
