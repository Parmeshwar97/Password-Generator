let rangeSlider = document.getElementById("range");
let allBoxes = document.getElementsByClassName("checkBoxes");

let displayValue = document.querySelector(".pass-length");
let generateButton = document.querySelector(".generate-btn");
let showPass = document.querySelector(".pass-para");

let copyMsg = document.querySelector("[copiedMsg]");
let indicator = document.querySelector(".indicator");
let copyBtn = document.querySelector("[copyIcon]");
let indColor = "";

// password range
function getRangeValue() {
  displayValue.innerHTML = rangeSlider.value;
  const min = rangeSlider.min;
  const max = rangeSlider.max;
  rangeSlider.style.backgroundSize =
    ((rangeSlider.value - min) * 100) / (max - min) + "% 100%";
}

// generate and display password
function displayPass() {
  let password = checkIncludes();
  showPass.textContent = password;
  showIndicator();
}

// copy Button
async function copyPass() {
  try {
    await navigator.clipboard.writeText(showPass.innerHTML);
    copyMsg.innerHTML = "Copied";
    copyMsg.classList.add("active");
    console.log(copyMsg.classList);
    
    removeMsg();
  } catch (e) {
    copyMsg.innerHTML = "failed";
    console.log(e);
  }
}
copyBtn.addEventListener("click", copyPass);

function removeMsg() {
  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}
// checkBox checker
function checkIncludes() {
  let pass = "";
  let value = displayValue.innerHTML;
  if (pass.length <= value) {
    for (i = 1; i <= value; i++) {
      for (e of allBoxes) {
        if (e.checked === true && pass.length < value) {
          switch (e.id) {
            case "uppercase":
              pass += generateUpcase();
              break;
            case "lowercase":
              pass += generateLowcase();
              break;
            case "numbers":
              pass += generateNumbers();
              break;
            case "symbols":
              pass += generateSymbols();
              break;
          }
        }
      }
    }
  }
  let finalPass = pass
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
  return finalPass;
}

//indicator
function showIndicator() {
  let count = countFun();
  let range = displayValue.innerHTML;
  if (count >= 3 && range >= 8) {
    indColor = "#0f0";
  } else if (count >= 2 && range >= 6) {
    indColor = "#ff0";
  } else indColor = "#f00";
  indicator.style.backgroundColor = indColor;
  indicator.style.boxShadow = `0px 0px 20px 2px ${indColor}`;
}

// get color
function setColor(color) {}

function countFun() {
  let count = 0;
  let value = displayPass.value;
  for (e of allBoxes) {
    if (e.checked === true) {
      count++;
    }
  }
  return count;
}

// generating UPPERCASE
function generateUpcase(range) {
  let pass = "";
  let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let rmd = Math.floor(Math.random() * letters.length);
  pass = pass + letters.charAt(rmd);
  return pass;
}

// generating Lowercase
function generateLowcase() {
  let pass = "";
  let letters = "abcdefghijklmnopqrstuvwxyz";
  let rmd = Math.floor(Math.random() * letters.length);
  pass = pass + letters.charAt(rmd);
  return pass;
}

// generating Numbers
function generateNumbers() {
  let pass = "";
  let rmd = Math.floor(Math.random() * 9);
  pass = pass + rmd;
  return pass;
}

//generating Symbols
function generateSymbols() {
  let pass = "";
  let symbols = "!@#$%&'()*+-./:;<=>?[]^_`{|}~";
  let rmd = Math.floor(Math.random() * symbols.length);
  pass = pass + symbols.charAt(rmd);
  return pass;
}

//Events
rangeSlider.addEventListener("click", getRangeValue);
generateButton.addEventListener("click", displayPass);
