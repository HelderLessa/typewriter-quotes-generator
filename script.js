const quotesDiv = document.getElementById("quotes");

let finalMsg = "";
let textPosition = 0;
let flag = true;

async function generateQuote() {
  const response = await fetch("https://api.quotable.io/random");
  if (!response.ok) {
    throw new Error(`Something went wrong! Status: ${response.status}`);
  }
  const data = await response.json();
  finalMsg = data.content;
}

function typewriter() {
  if (flag) {
    generateQuote();
    flag = false;
  }

  if (textPosition < finalMsg.length) {
    quotesDiv.innerHTML =
      finalMsg.substring(0, textPosition) + "<span>\u25AE</span>";
    textPosition++;
    setTimeout(typewriter, 100);
  } else {
    finalMsg = "";
    setTimeout(typewriter, 3000);
    textPosition = 0;
    flag = true;
  }
}

typewriter();
