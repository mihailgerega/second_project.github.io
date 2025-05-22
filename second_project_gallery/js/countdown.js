const graduationDate = new Date('2028-06-30T00:00:00');

const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

updateCountdown();
setInterval(updateCountdown, 1000);

function updateCountdown() {
  const currentTime = new Date();
  const difference = graduationDate - currentTime;
  if (difference < 0) {
    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    return;
  }
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
  daysElement.textContent = days < 10 ? `0${days}` : days;
  hoursElement.textContent = hours < 10 ? `0${hours}` : hours;
  minutesElement.textContent = minutes < 10 ? `0${minutes}` : minutes;
  secondsElement.textContent = seconds < 10 ? `0${seconds}` : seconds;
}
