import "./style.css";

let counter: number = 0;
let growthRate: number = 0;
let lastTime: number = performance.now();

const items = [
  { name: "A", cost: 10, rate: 0.1, owned: 0 },
  { name: "B", cost: 100, rate: 2.0, owned: 0 },
  { name: "C", cost: 1000, rate: 50, owned: 0 },
];

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter} clicks`;
counterDisplay.style.fontSize = "24px";
counterDisplay.style.margin = "20px";
counterDisplay.style.fontWeight = "bold";

const growthDisplay = document.createElement("div");
growthDisplay.innerHTML = `${growthRate.toFixed(1)} clicks/sec`;
growthDisplay.style.fontSize = "18px";
growthDisplay.style.margin = "10px";
growthDisplay.style.color = "#666";

const button = document.createElement("button");
button.innerHTML = "Click Me";
button.style.fontSize = "16px";
button.style.padding = "10px 20px";
button.style.border = "2px solid #333";
button.style.borderRadius = "5px";
button.style.cursor = "pointer";
button.style.backgroundColor = "#f0f0f0";
button.style.color = "#333";

button.addEventListener("click", () => {
  counter++;
  counterDisplay.innerHTML = `${counter} clicks`;
});

const upgradeButtons: HTMLButtonElement[] = [];
const ownedDisplays: HTMLDivElement[] = [];

items.forEach((item, index) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `Buy ${item.name} (${item.cost} clicks)`;
  upgradeButton.style.fontSize = "14px";
  upgradeButton.style.padding = "8px 16px";
  upgradeButton.style.border = "2px solid #333";
  upgradeButton.style.borderRadius = "5px";
  upgradeButton.style.cursor = "pointer";
  upgradeButton.style.backgroundColor = "#f0f0f0";
  upgradeButton.style.color = "#333";
  upgradeButton.style.margin = "5px";
  upgradeButton.disabled = true;

  const ownedDisplay = document.createElement("div");
  ownedDisplay.innerHTML = `${item.name}: ${item.owned} owned`;
  ownedDisplay.style.fontSize = "14px";
  ownedDisplay.style.margin = "5px";
  ownedDisplay.style.color = "#666";

  upgradeButton.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      item.owned++;
      growthRate += item.rate;
      counterDisplay.innerHTML = `${counter} clicks`;
      growthDisplay.innerHTML = `${growthRate.toFixed(1)} clicks/sec`;
      ownedDisplay.innerHTML = `${item.name}: ${item.owned} owned`;
    }
  });

  upgradeButtons.push(upgradeButton);
  ownedDisplays.push(ownedDisplay);
});

function updateCounter(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  counter += growthRate * deltaTime;
  counterDisplay.innerHTML = `${Math.floor(counter)} clicks`;

  upgradeButtons.forEach((button, index) => {
    button.disabled = counter < items[index].cost;
  });

  lastTime = currentTime;
  requestAnimationFrame(updateCounter);
}

requestAnimationFrame(updateCounter);

document.body.appendChild(counterDisplay);
document.body.appendChild(growthDisplay);
document.body.appendChild(button);

items.forEach((_, index) => {
  document.body.appendChild(upgradeButtons[index]);
  document.body.appendChild(ownedDisplays[index]);
});
