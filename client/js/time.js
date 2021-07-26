// import dayjs from 'dayjs';
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
