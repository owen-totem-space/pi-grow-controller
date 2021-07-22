// import dayjs from 'dayjs';
(function () {
  const time = document.getElementById('time');
  const showTime = () => {
    const timeFormat = dayjs().format('dddd HH:mm');
    time.innerHTML = timeFormat;
    setInterval(showTime, 60000);
  };
  showTime();
})();
