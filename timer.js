let timer;
let seconds = 0; // 初期値は0秒

document.getElementById('startButton').addEventListener('click', function() {
    unlockAudio();
    startTimer();
});
document.getElementById('stopButton').addEventListener('click', stopTimer);
document.getElementById('resetButton').addEventListener('click', resetTimer);
document.getElementById('setTimerButton').addEventListener('click', setTimer);

function unlockAudio() {
    document.querySelectorAll('audio').forEach(audio => {
        audio.play().then(() => {
            audio.pause();
            audio.currentTime = 0;
        }).catch(() => {});
    });
    // イベントリスナーを削除
    document.body.removeEventListener('touchstart', unlockAudio, false);
}

document.body.addEventListener('touchstart', unlockAudio, false);

function updateDisplay() {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    document.getElementById('timerDisplay').textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            if (seconds > 0) {
                seconds--;
                updateDisplay();
                checkAlerts();
            } else {
                stopTimer();
                playFinalAlertSound();
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    updateDisplay();
}

function setTimer() {
    let minutes = parseInt(document.getElementById('minutesInput').value);
    if (!isNaN(minutes) && minutes > 0) {
        seconds = minutes * 60;
        updateDisplay();
    }
}

function checkAlerts() {
    if (document.getElementById('alert1min').checked && seconds === 60) {
        document.getElementById('alert1minSound').play();
    }
    if (document.getElementById('alert5min').checked && seconds === 5 * 60) {
        document.getElementById('alert5minSound').play();
    }
    if (document.getElementById('alert10min').checked && seconds === 10 * 60) {
        document.getElementById('alert10minSound').play();
    }
    if (document.getElementById('alert15min').checked && seconds === 15 * 60) {
        document.getElementById('alert15minSound').play();
    }
}

function playFinalAlertSound() {
    const finalAlertSound = document.getElementById('finalAlertSound');
    finalAlertSound.play();
}

updateDisplay();
