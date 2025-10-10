import "./style.css";

let counter: number = 0;

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

button.addEventListener("click", () => {
  counter++;
  counterDisplay.innerHTML = `${counter} clicks`;
});

setInterval(() => {
  counter++;
  counterDisplay.innerHTML = `${counter} clicks`;
}, 1000);

document.body.appendChild(counterDisplay);
document.body.appendChild(button);
