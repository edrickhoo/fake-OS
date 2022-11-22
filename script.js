const menuClock = document.querySelector(".task-bar__clock");
const startBtn = document.querySelector(".task-bar__start");

const getCurrentTime = () => {
  let date = new Date().toString().slice(16, 24);
  let currentTime = "00:00:00 AM";

  if (Number(date.substring(0, 2)) > 12) {
    currentTime = `${date} PM`;
  } else {
    currentTime = `${date} AM`;
  }
  return currentTime;
};

const setCurrentTime = () => {
  let currentTime = getCurrentTime();

  menuClock.textContent = currentTime;
};

setInterval(setCurrentTime, 1000);

const toggleStartMenu = () => {
  let startMenu = document.querySelector(".start-menu");
  startMenu.classList.toggle("start-menu--toggle");
  startBtn.classList.toggle("task-bar__start--selected");
};

startBtn.addEventListener("click", toggleStartMenu);
