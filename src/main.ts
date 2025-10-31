import "./style.css";

// UI Design Credits:
// - Dark space background inspired by space-themed projects in the gallery
// - Button animations inspired by interactive UI designs from peer projects
// See gallery: https://rndmcnlly.github.io/cmpm-121-f25-d1-gallery/

// ============================================================================
// Types
// ============================================================================

interface Item {
  name: string;
  cost: number;
  rate: number;
  owned: number;
  baseCost: number;
  description: string;
}

// ============================================================================
// Game State
// ============================================================================

let fuel: number = 0;
let fuelPerSecond: number = 0;
let lastTime: number = performance.now();

// ============================================================================
// Game Data
// ============================================================================

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

// ============================================================================
// UI Construction
// ============================================================================

const fuelDisplay = document.createElement("div");
fuelDisplay.classList.add("fuel-display");
fuelDisplay.innerHTML = `${fuel} fuel`;

const growthDisplay = document.createElement("div");
growthDisplay.classList.add("growth-display");
growthDisplay.innerHTML = `${fuelPerSecond.toFixed(1)} fuel/sec`;

const launchButton = document.createElement("button");
launchButton.classList.add("launch-button");
launchButton.innerHTML = "🚀 Launch Rocket";

// ============================================================================
// Event Handlers
// ============================================================================

launchButton.addEventListener("click", () => {
  fuel++;
  fuelDisplay.innerHTML = `${fuel} fuel`;
});

// ============================================================================
// Upgrade System
// ============================================================================

const upgradeButtons: HTMLButtonElement[] = [];
const ownedDisplays: HTMLDivElement[] = [];
const descriptionDisplays: HTMLDivElement[] = [];

availableItems.forEach((item, _index) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.classList.add("upgrade-button");
  upgradeButton.innerHTML = `Buy ${item.name} (${item.cost} fuel)`;
  upgradeButton.disabled = true;

  const ownedDisplay = document.createElement("div");
  ownedDisplay.classList.add("owned-display");
  ownedDisplay.innerHTML = `${item.name}: ${item.owned} owned`;

  const descriptionDisplay = document.createElement("div");
  descriptionDisplay.classList.add("description-display");
  descriptionDisplay.innerHTML = item.description;

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

// ============================================================================
// Game Loop
// ============================================================================

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

// ============================================================================
// DOM Setup
// ============================================================================

document.body.appendChild(fuelDisplay);
document.body.appendChild(growthDisplay);
document.body.appendChild(launchButton);

availableItems.forEach((_, index) => {
  document.body.appendChild(upgradeButtons[index]);
  document.body.appendChild(ownedDisplays[index]);
  document.body.appendChild(descriptionDisplays[index]);
});
