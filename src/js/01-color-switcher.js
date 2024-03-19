const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

startButton.addEventListener('click', startColorSwitch);
stopButton.addEventListener('click', stopColorSwitch);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let colorIntervalId;

function startColorSwitch() {
  startButton.disabled = true;
  changeBackgroundColor();
  colorIntervalId = setInterval(changeBackgroundColor, 1000);
}

function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function stopColorSwitch() {
  startButton.disabled = false;
  clearInterval(colorIntervalId);
}
