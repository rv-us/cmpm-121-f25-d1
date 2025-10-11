import "./style.css";

let counter: number = 0;
let growthRate: number = 0;
let lastTime: number = performance.now();

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter} clicks`;
counterDisplay.style.fontSize = "24px";
counterDisplay.style.margin = "20px";
counterDisplay.style.fontWeight = "bold";

const button = document.createElement("button");
button.innerHTML = "Click Me";
button.style.fontSize = "16px";
button.style.padding = "10px 20px";
button.style.border = "2px solid #333";
button.style.borderRadius = "5px";
button.style.cursor = "pointer";
button.style.backgroundColor = "#f0f0f0";
button.style.color = "#333";

console.log("edit by Anish");
console.log("actually edited by Rachit");

button.addEventListener("click", () => {
  counter++;
  counterDisplay.innerHTML = `${counter} clicks`;
});

const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Buy Upgrade (10 clicks)";
upgradeButton.style.fontSize = "16px";
upgradeButton.style.padding = "10px 20px";
upgradeButton.style.border = "2px solid #333";
upgradeButton.style.borderRadius = "5px";
upgradeButton.style.cursor = "pointer";
upgradeButton.style.backgroundColor = "#f0f0f0";
upgradeButton.style.color = "#333";
upgradeButton.style.margin = "10px";
upgradeButton.disabled = true;

upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1;
    counterDisplay.innerHTML = `${counter} clicks`;
  }
});

function updateCounter(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  counter += growthRate * deltaTime;
  counterDisplay.innerHTML = `${Math.floor(counter)} clicks`;

  upgradeButton.disabled = counter < 10;

  lastTime = currentTime;
  requestAnimationFrame(updateCounter);
}

requestAnimationFrame(updateCounter);

document.body.appendChild(counterDisplay);
document.body.appendChild(button);
document.body.appendChild(upgradeButton);
