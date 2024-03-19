import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startButton: document.querySelector('[data-start]'),
  daysElement: document.querySelector('[data-days]'),
  hoursElement: document.querySelector('[data-hours]'),
  minutesElement: document.querySelector('[data-minutes]'),
  secondsElement: document.querySelector('[data-seconds]'),
};

refs.startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    validateDate(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

const timer = {
  intervalId: null,
  isActive: false,
  selectedDate: null,
  start() {
    if (this.isActive) {
      return;
    }
    refs.startButton.disabled = true;
    this.isActive = true;
    const startTime = this.selectedDate.getTime();

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      if (deltaTime <= 0) {
        this.stop();
        Notify.success('Countdown finished');
        return;
      }
      const time = convertMs(deltaTime);
      updateTimer(time);
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    refs.startButton.disabled = true;
  },
};

refs.startButton.addEventListener('click', () => {
  timer.start();
});

function validateDate(selectedDate) {
  if (selectedDate < new Date()) {
    Notify.failure('Please choose a date in the future');
    refs.startButton.disabled = true;
  } else {
    refs.startButton.disabled = false;
    timer.selectedDate = selectedDate;
  }
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.daysElement.textContent = days;
  refs.hoursElement.textContent = hours;
  refs.minutesElement.textContent = minutes;
  refs.secondsElement.textContent = seconds;
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
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
