
const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}

refs.startBtn.addEventListener('click', onClickStart);
refs.stopBtn.addEventListener('click', onClickStop);

let timerId = null;
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function onClickStart() {
   timerId = setInterval(() => {
        const bgColor = getRandomHexColor();
       refs.body.style.backgroundColor = bgColor;
       refs.startBtn.disabled = true;
  }, 500);
};

function onClickStop() {
    clearInterval(timerId);
    refs.startBtn.disabled = false;
};
