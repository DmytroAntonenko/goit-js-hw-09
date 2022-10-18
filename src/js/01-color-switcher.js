function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

const startBtn = document.querySelector('button[data-start]');
console.log(startBtn);
const stopBtn = document.querySelector('button[data-stop]');
console.log(stopBtn);
const bodyRef = document.querySelector('body');
let timerId = null;
startBtn.disabled = false;

startBtn.addEventListener('click', changeBodyColor);

function changeBodyColor (event) {
  if(startBtn.disabled = true) {
  timerId = setInterval(() => 
  { bodyRef.style.backgroundColor = getRandomHexColor(); }, 1000)
  }
  return;
};

stopBtn.addEventListener('click', removeBodyColor);
function removeBodyColor (event) {
 clearInterval(timerId);
 startBtn.disabled = false;
};

