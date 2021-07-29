import dayjs from 'dayjs';
export { headerTime };

function headerTime() {
  const time = document.getElementById('time');

  const showTime = () => {
    const timeFormat = dayjs().format('dddd HH:mm');
    time.innerHTML = timeFormat;
  };
  showTime();
  setInterval(showTime, 1000);
}

function checkTimes(startTime, endTime) {
  if (endTime < startTime) {
    const arr = endTime.split(':');
    endTime = dayjs().hour(arr[0]).minute(arr[1]).second(0);
    endTime = dayjs(endTime).add(1, 'day');
  }
  return { startTime, endTime };
}

// on lights on, check for next off time by updating this.on.
// on lights off, check for next start time by updating this.off.
// only update this.on and this.off by set.on and set.off
