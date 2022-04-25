import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";

const refs = {
    dtPicker: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),

    timerDay: document.querySelector('.value[data-days]'),
    timerHours: document.querySelector('.value[data-hours]'),
    timerMinutes: document.querySelector('.value[data-minutes]'),
    timerSeconds: document.querySelector('.value[data-seconds]'),
}


refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onClickStart);

let timerId = null;
let futureDateMs = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        futureDateMs = Date.parse(selectedDates[0]);
    
        if (selectedDates[0] < options.defaultDate) {
            window.alert("Please choose a date in the future")
        } else {
            refs.startBtn.disabled = false;
        } 
        console.log(selectedDates[0]);
    },
}; 

flatpickr(refs.dtPicker, options);

function onClickStart() {
    
    timerId = setInterval(() => {
        const defaultDate = new Date;
        const defaultDateMs = Date.parse(defaultDate);
        const differenceMs = futureDateMs - defaultDateMs;
        refs.startBtn.disabled = true;
        refs.dtPicker.disabled = true;

        if (defaultDateMs === futureDateMs) {
            onTimeStop();
        }
        const time = convertMs(differenceMs);
        updateClockface(time);
    }, 1000);
};

function onTimeStop() {
    clearInterval(timerId);
    refs.startBtn.disabled = false;
    refs.dtPicker.disabled = false;
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function updateClockface({ days, hours, minutes, seconds }) {
    refs.timerDay.textContent = addLeadingZero(days);
    refs.timerHours.textContent = addLeadingZero(hours);
    refs.timerMinutes.textContent = addLeadingZero(minutes);
    refs.timerSeconds.textContent = addLeadingZero(seconds);
 }

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

