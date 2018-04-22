let timerID;
let seconds;
let nextType;
let notifTitle;
let notifText;
let paused;

let numBreaks = 1;

function runTimer() {
  timer(seconds); // eslint-disable-line
  timerID = setInterval(() => timer(seconds), 1000); // eslint-disable-line
}

function notify(presentType, title, text) {
  if (Notification.permission === 'default') {
    Notification.requestPermission();
  }

  if (Notification.permission === 'granted') {
    const notif = new Notification(title, {
      text,
      icon: '../img/tomato.png',
    });
    return notif;
  }

  return 0;
}

function pomodoro(presentType) {
  let pomodoroMinutes;
  let color;
  clearInterval(timerID);
  if (presentType === 'p') {
    pomodoroMinutes = document.getElementById('ptime').value;
    document.title = 'POMODORO';
    color = 'black';
    if ((numBreaks % 4) === 0) {
      nextType = 'lb';
    } else {
      nextType = 'sb';
    }
    notifTitle = 'Pomodoro time!';
    notifText = 'Time for a pomodoro!';
    paused = 0;
  } else if (presentType === 'sb') {
    document.title = 'POMODORO - Short break';
    pomodoroMinutes = document.getElementById('sbtime').value;
    numBreaks += 1;
    nextType = 'p';
    color = '#008000';
    notifTitle = 'Break time!';
    notifText = 'Time for a short break!';
  } else {
    document.title = 'POMODORO - Long break';
    pomodoroMinutes = document.getElementById('lbtime').value;
    numBreaks += 1;
    nextType = 'p';
    color = '#00FF00';
    notifTitle = 'Break time!';
    notifText = 'Time for a long break!';
  }
  document.getElementById('minute').style.color = color;
  document.getElementById('second').style.color = color;
  seconds = pomodoroMinutes * 60;
  runTimer(seconds);
  notify(presentType, notifTitle, notifText);
}

function pause() {
  let text;
  if (paused) {
    paused = 0;
    runTimer(seconds);
    text = 'Pause';
  } else {
    paused = 1;
    clearInterval(timerID);
    text = 'Continue';
  }
  document.getElementById('stop').value = text;
}

function playSound(soundObj) {
  const sound = document.getElementById(soundObj);
  sound.play();
}

function timer() {
  let remainingSeconds;
  let minutes = Math.round((seconds - 30) / 60);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  remainingSeconds = seconds % 60;
  if (remainingSeconds < 10) {
    remainingSeconds = `0${remainingSeconds}`;
  }
  document.getElementById('minute').innerHTML = minutes;
  document.getElementById('second').innerHTML = remainingSeconds;
  if (seconds > 0) {
    seconds -= 1;
  } else {
    clearInterval(timerID);
    pomodoro(nextType);
    playSound('bell');
  }
}

function reset() {
  clearInterval(timerID);
  document.getElementById('ptime').value = 25;
  document.getElementById('sbtime').value = 5;
  document.getElementById('lbtime').value = 15;
  document.getElementById('minute').innerHTML = 25;
  document.getElementById('second').innerHTML = '00';
}

document.addEventListener('DOMContentLoaded', function () { // eslint-disable-line
  if (!Notification) {
    console.log('Notifications not available');
  } else if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }

  document.getElementById('pomodoro').onclick = function p() { pomodoro('p'); };
  document.getElementById('sbreak').onclick = function sb() { pomodoro('sb'); };
  document.getElementById('lbreak').onclick = function lb() { pomodoro('lb'); };
  document.getElementById('stop').onclick = pause;
  document.getElementById('reset').onclick = reset;
});
