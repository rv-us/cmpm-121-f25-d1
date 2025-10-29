import "./style.css";

interface Item {
  name: string;
  cost: number;
  rate: number;
  owned: number;
  baseCost: number;
  description: string;
}

let fuel: number = 0;
let fuelPerSecond: number = 0;
let lastTime: number = performance.now();

const availableItems: Item[] = [
  {
    name: "Fuel Pump",
    cost: 10,
    rate: 0.1,
    owned: 0,
    baseCost: 10,
    description:
      "A basic fuel extraction system that slowly pumps fuel from the ground",
  },
  {
    name: "Rocket Engine",
    cost: 100,
    rate: 2.0,
    owned: 0,
    baseCost: 100,
    description:
      "A powerful engine that burns fuel efficiently for continuous thrust",
  },
  {
    name: "Space Station",
    cost: 1000,
    rate: 50,
    owned: 0,
    baseCost: 1000,
    description:
      "A massive orbital facility that processes fuel on an industrial scale",
  },
  {
    name: "Asteroid Miner",
    cost: 10000,
    rate: 200,
    owned: 0,
    baseCost: 10000,
    description:
      "Mining drones that extract precious fuel from nearby asteroids",
  },
  {
    name: "Dyson Sphere",
    cost: 100000,
    rate: 1000,
    owned: 0,
    baseCost: 100000,
    description:
      "A megastructure that harnesses the power of an entire star for fuel production",
  },
];

const fuelDisplay = document.createElement("div");
fuelDisplay.innerHTML = `${fuel} fuel`;
fuelDisplay.style.fontSize = "24px";
fuelDisplay.style.margin = "20px";
fuelDisplay.style.fontWeight = "bold";

const growthDisplay = document.createElement("div");
growthDisplay.innerHTML = `${fuelPerSecond.toFixed(1)} fuel/sec`;
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
  fuel++;
  fuelDisplay.innerHTML = `${fuel} fuel`;
});

const upgradeButtons: HTMLButtonElement[] = [];
const ownedDisplays: HTMLDivElement[] = [];
const descriptionDisplays: HTMLDivElement[] = [];

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

  const descriptionDisplay = document.createElement("div");
  descriptionDisplay.innerHTML = item.description;
  descriptionDisplay.style.fontSize = "12px";
  descriptionDisplay.style.margin = "2px 5px 10px 5px";
  descriptionDisplay.style.color = "#888";
  descriptionDisplay.style.fontStyle = "italic";

  upgradeButton.addEventListener("click", () => {
    if (fuel >= item.cost) {
      fuel -= item.cost;
      item.owned++;
      fuelPerSecond += item.rate;
      item.cost = Math.floor(item.baseCost * Math.pow(1.15, item.owned));
      fuelDisplay.innerHTML = `${fuel} fuel`;
      growthDisplay.innerHTML = `${fuelPerSecond.toFixed(1)} fuel/sec`;
      ownedDisplay.innerHTML = `${item.name}: ${item.owned} owned`;
      upgradeButton.innerHTML = `Buy ${item.name} (${item.cost} fuel)`;
    }
  });

  upgradeButtons.push(upgradeButton);
  ownedDisplays.push(ownedDisplay);
  descriptionDisplays.push(descriptionDisplay);
});

function updateGameState(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  fuel += fuelPerSecond * deltaTime;
  fuelDisplay.innerHTML = `${Math.floor(fuel)} fuel`;

  upgradeButtons.forEach((button, index) => {
    button.disabled = fuel < availableItems[index].cost;
  });

  lastTime = currentTime;
  requestAnimationFrame(updateGameState);
}

requestAnimationFrame(updateGameState);

document.body.appendChild(fuelDisplay);
document.body.appendChild(growthDisplay);
document.body.appendChild(button);

availableItems.forEach((_, index) => {
  document.body.appendChild(upgradeButtons[index]);
  document.body.appendChild(ownedDisplays[index]);
  document.body.appendChild(descriptionDisplays[index]);
});
