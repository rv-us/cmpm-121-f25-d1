import "./style.css";

interface Item {
  name: string;
  cost: number;
  rate: number;
  owned: number;
  baseCost: number;
}

let counter: number = 0;
let growthRate: number = 0;
let lastTime: number = performance.now();

const availableItems: Item[] = [
  { name: "Fuel Pump", cost: 10, rate: 0.1, owned: 0, baseCost: 10 },
  { name: "Rocket Engine", cost: 100, rate: 2.0, owned: 0, baseCost: 100 },
  { name: "Space Station", cost: 1000, rate: 50, owned: 0, baseCost: 1000 },
];

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter} fuel`;
counterDisplay.style.fontSize = "24px";
counterDisplay.style.margin = "20px";
counterDisplay.style.fontWeight = "bold";

const growthDisplay = document.createElement("div");
growthDisplay.innerHTML = `${growthRate.toFixed(1)} fuel/sec`;
growthDisplay.style.fontSize = "18px";
growthDisplay.style.margin = "10px";
growthDisplay.style.color = "#666";

const button = document.createElement("button");
button.innerHTML = "🚀 Launch Rocket";
button.style.fontSize = "16px";
button.style.padding = "10px 20px";
button.style.border = "2px solid #333";
button.style.borderRadius = "5px";
button.style.cursor = "pointer";
button.style.backgroundColor = "#4A90E2";
button.style.color = "white";

button.addEventListener("click", () => {
  counter++;
  counterDisplay.innerHTML = `${counter} fuel`;
});

const upgradeButtons: HTMLButtonElement[] = [];
const ownedDisplays: HTMLDivElement[] = [];

availableItems.forEach((item, _index) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `Buy ${item.name} (${item.cost} fuel)`;
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
      item.cost = Math.floor(item.baseCost * Math.pow(1.15, item.owned));
      counterDisplay.innerHTML = `${counter} fuel`;
      growthDisplay.innerHTML = `${growthRate.toFixed(1)} fuel/sec`;
      ownedDisplay.innerHTML = `${item.name}: ${item.owned} owned`;
      upgradeButton.innerHTML = `Buy ${item.name} (${item.cost} fuel)`;
    }
  });

  upgradeButtons.push(upgradeButton);
  ownedDisplays.push(ownedDisplay);
});

function updateCounter(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  counter += growthRate * deltaTime;
  counterDisplay.innerHTML = `${Math.floor(counter)} fuel`;

  upgradeButtons.forEach((button, index) => {
    button.disabled = counter < availableItems[index].cost;
  });

  lastTime = currentTime;
  requestAnimationFrame(updateCounter);
}

requestAnimationFrame(updateCounter);

document.body.appendChild(counterDisplay);
document.body.appendChild(growthDisplay);
document.body.appendChild(button);

availableItems.forEach((_, index) => {
  document.body.appendChild(upgradeButtons[index]);
  document.body.appendChild(ownedDisplays[index]);
});
