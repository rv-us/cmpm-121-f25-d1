import "./style.css";

// Create a button element
const button = document.createElement('button');
button.innerHTML = '🚀'; // Rocket emoji instead of cookie
button.style.fontSize = '48px';
button.style.padding = '20px';
button.style.border = 'none';
button.style.borderRadius = '10px';
button.style.cursor = 'pointer';
button.style.backgroundColor = '#4CAF50';
button.style.color = 'white';

// Add the button to the page
document.body.appendChild(button);
