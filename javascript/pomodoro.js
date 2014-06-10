var timerID,
 seconds,
 numBreaks,
 nextType,
 notifTitle, notifText

numBreaks = 1;
function pomodoro(presentType) {
	clearInterval(timerID);
	if(presentType == "p") {
		pomodoroMinutes = document.getElementById('ptime').value;
		document.title = "POMODORO";
		color = "black";
		if((numBreaks % 4) == 0) {
			nextType = 'lb';
		} else {
			nextType = 'sb';
		}
		notifTitle = "Pomodoro time!";
		notifText = "Time for a pomodoro!";
	} else if(presentType == "sb")
	{
		document.title = "POMODORO - Short break";
		pomodoroMinutes = document.getElementById('sbtime').value;
		numBreaks++;
		nextType = 'p';
		color = "#008000";
		notifTitle = "Break time!";
		notifText = "Time for a short break!";
	} else {
		document.title = "POMODORO - Long break";
		pomodoroMinutes = document.getElementById('lbtime').value;
		numBreaks++;
		nextType = 'p';
		color = "#00FF00";
		notifTitle = "Break time!";
		notifText = "Time for a long break!";
	}
	document.getElementById('minute').style.color = color;
	document.getElementById('second').style.color = color;
	seconds = pomodoroMinutes * 60;
	timer(seconds);
	timerID = setInterval('timer(seconds)', 1000);
	notify(presentType, notifTitle, notifText);
}


function stopClock() {
	clearInterval(timerID);		
	
}

function timer(){
	var minutes = Math.round((seconds - 30)/60);
	if(minutes < 10) {
		minutes = "0" + minutes;
	}
	var remainingSeconds = seconds % 60;
	if(remainingSeconds < 10) {
		remainingSeconds = "0" + remainingSeconds;
	}
	document.getElementById('minute').innerHTML = minutes;
	document.getElementById('second').innerHTML = remainingSeconds;
	if(seconds > 0) {
		seconds--;		
	}
	else {
		clearInterval(timerID);
		pomodoro(nextType);
		playSound("bell");
	}
}

function reset(){
	clearInterval(timerID);
	document.getElementById('ptime').value = 15;
	document.getElementById('sbtime').value = 5;
	document.getElementById('lbtime').value = 25;
	document.getElementById('minute').innerHTML = 25;
	document.getElementById('second').innerHTML = '00';
}

function playSound(soundObj){
	var sound = document.getElementById(soundObj);
	sound.play();
}
function notify(presentType, notifTitle, notifText) {
	if(presentType == 'p')
	{
		$.growl.error({title: notifTitle, message: notifText});
	}
	else {
		$.growl.notice	({title: notifTitle, message: notifText});
	}
//$.growl({ title: "Growl", message: "The kitten is awake!" });
}
