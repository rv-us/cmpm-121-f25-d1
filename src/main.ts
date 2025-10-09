import "./style.css";

// Incremental game - Step 1: Basic clickable button

// Create a button element
const button = document.createElement("button");
button.innerHTML = "Click Me";
button.style.fontSize = "16px";
button.style.padding = "10px 20px";
button.style.border = "2px solid #333";
button.style.borderRadius = "5px";
button.style.cursor = "pointer";
button.style.backgroundColor = "#f0f0f0";
button.style.color = "#333";

// Add the button to the page
document.body.appendChild(button);
