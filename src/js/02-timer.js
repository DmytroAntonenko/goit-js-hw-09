import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const spansRef = document.querySelectorAll('.value');
for(const span of spansRef) {
    span.style.fontSize = '48px';
    span.style.fontWeight = '500';
};

const labelsRef = document.querySelectorAll('.label');
for(const label of labelsRef) {
    label.style.fontSize = '16px';
    label.style.fontWeight = '500';
    label.style.textTransform = 'upperCase';
};

const divsRef = document.querySelectorAll('.field');
for(const div of divsRef) {
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.marginRight = '12px';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';
};

const timerRef = document.querySelector('.timer');
timerRef.style.display = 'flex';

const inputRef = document.querySelector('#datetime-picker')
inputRef.style.fontSize = '18px';

const btnRef = document.querySelector('button')
btnRef.style.fontSize = '18px';
btnRef.disabled = false;

const valueOfDays = document.querySelector('[data-days]');
const valueOfHours = document.querySelector('[data-hours]');
const valueOfMinutes = document.querySelector('[data-minutes]');
const valueOfSeconds = document.querySelector('[data-seconds]');

let selectedDate = null;
let timeInterval = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if(selectedDates[0] < new Date()){
        Notiflix.Notify.warning("Please choose a date in the future")
        btnRef.disabled = true;
        ;
    } 
    else {
      btnRef.disabled = false;
      selectedDate = selectedDates[0];
    }  
    },
  };

  flatpickr(inputRef, options);


  btnRef.addEventListener('click', startCounter);
  function startCounter() {
   timeInterval = setInterval(timeCounter, 1000);
  }

  function timeCounter() {
    const deltaTime = selectedDate - new Date();
    const time = convertMs(deltaTime);
  
    if (deltaTime <= 0) {
      Notiflix.Notify.success('Поздравляю! Ты досмотрел отсчет до конца.');
      btnRef.disabled = false;
      clearInterval(timeInterval);
      return;
    }
  
    updateValueTime(time);
  }

  function updateValueTime({ days, hours, minutes, seconds}) {
    valueOfDays.textContent = `${days}`;
    valueOfHours.textContent = `${hours}`;
    valueOfMinutes.textContent = `${minutes}`;
    valueOfSeconds.textContent = `${seconds}`;
  }
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }