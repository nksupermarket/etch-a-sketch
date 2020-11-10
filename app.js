let blackInk = true;
let colorInk;
let shadeInk;

const container = document.querySelector("#grid");
const gridSize = document.querySelector("#grid-size");

window.onload = createGrid(16);

gridSize.addEventListener("change", () => {
  let x = gridSize.value;
  if (x > 0 && x <= 100) {
    createGrid(x);
  } else {
    alert("Grid size must be between 0 and 100");
  }
});

function createGrid(x) {
  container.style.cssText = `grid-template-columns: repeat(${x},1fr); grid-template-rows: repeat(${x}, 1fr)`;
  container.textContent = "";
  /* resets the grid */

  for (let i = 0; i < Math.pow(x, 2); i++) {
    const gridBox = document.createElement("div");
    gridBox.classList.add("grid-boxes");
    container.appendChild(gridBox);
  }

  const gridBoxes = document.querySelectorAll(".grid-boxes");
  gridBoxes.forEach((gridBoxes) => {
    gridBoxes.addEventListener("mouseover", colorChange);
  });
}

function rdmNumber() {
  return Math.floor(Math.random() * 256);
}

function colorChange() {
  if (blackInk) {
    this.style.background = "black";
  } else if (colorInk) {
    this.style.background = `rgb(
              ${rdmNumber()},
              ${rdmNumber()},
              ${rdmNumber()}
            )`;
    this.style.filter = "brightness(1)";
  } else {
    const shade = this.style.filter;
    let shadeNbr = shade.slice(11, shade.length - 1);
    /* pull # out of brightness() into a string */
    if (shadeNbr || shadeNbr.length > 0) shadeNbr = Number(shadeNbr);
    /* check against empty string/empty square */
    if (typeof shadeNbr === "number") {
      this.style.filter = `brightness(${(shadeNbr -= 0.1)})`;
    } else {
      this.style.filter = "brightness(0.9)";
    }
  }
}

const clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener("click", clearGrid);
function clearGrid() {
  const gridBoxes = document.querySelectorAll(".grid-boxes");
  gridBoxes.forEach((gridBoxes) => {
    gridBoxes.style.background = "white";
    gridBoxes.style.filter = "brightness(1)";
  });
}

const blackBtn = document.querySelector("#black-btn");
blackBtn.addEventListener("click", () => (blackInk = true));

const shadeBtn = document.querySelector("#shade-btn");
shadeBtn.addEventListener("click", () => {
  blackInk = false;
  colorInk = false;
});

const colorBtn = document.querySelector("#color-btn");
colorBtn.addEventListener("click", () => {
  blackInk = false;
  colorInk = true;
});

const title = document.querySelector("h1");
let titleStr = title.textContent;
titleStr = titleStr.split("");
title.textContent = "";

for (i = 0; i < titleStr.length; i++) {
  title.innerHTML += `<span>${titleStr[i]}</span>`;
}

let char = 0;
let timer = setInterval(onTick, 50);

function onTick() {
  let titleLetters = title.querySelectorAll("span")[char];
  titleLetters.classList.add("fade-in");
  titleLetters.animate(
    [
      { color: `rgba(${rdmNumber()}, ${rdmNumber()}, ${rdmNumber()}, 1)` },
      { color: `rgba(${rdmNumber()}, ${rdmNumber()}, ${rdmNumber()}, 1)` },
    ],
    {
      duration: 200,
      fill: "forwards",
      iterations: 2,
      easing: "linear",
      direction: "alternate-reverse",
    }
  );
  char++;

  if (char === titleStr.length) {
    title.classList.add("grow");
    const titlePg = document.querySelector("#title-pg");
    title.onanimationend = () => {
      titlePg.classList.add("shrink");
      title.classList.add("shrink");
    };
    complete();
    return;
  }
}

function complete() {
  clearInterval(timer);
  timer = null;
}
