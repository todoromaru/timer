let timer;
let seconds = 0; // 初期値は0秒

// 各ボタンにイベントリスナーを追加
document.getElementById('startButton').addEventListener('click', function() {
    unlockAudio();
    startTimer();
});
document.getElementById('stopButton').addEventListener('click', stopTimer);
document.getElementById('resetButton').addEventListener('click', resetTimer);
document.getElementById('setTimerButton').addEventListener('click', setTimer);

// iOSデバイスでのオーディオ再生の問題を回避するための関数
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

// 最初のタッチイベントでオーディオをアンロック
document.body.addEventListener('touchstart', unlockAudio, false);

// タイマーの表示を更新する関数
function updateDisplay() {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    document.getElementById('timerDisplay').textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// タイマーをスタートする関数
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

// タイマーをストップする関数
function stopTimer() {
    clearInterval(timer);
    timer = null;
}

// タイマーをリセットする関数
function resetTimer() {
    stopTimer();
    seconds = 0;
    updateDisplay();
}

// タイマーを設定する関数
function setTimer() {
    let minutes = parseInt(document.getElementById('minutesInput').value);
    if (!isNaN(minutes) && minutes > 0) {
        seconds = minutes * 60;
        updateDisplay();
    }
}

// 中間アラートをチェックする関数
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

// タイマー終了時のアラームを鳴らす関数
function playFinalAlertSound() {
    const finalAlertSound = document.getElementById('finalAlertSound');
    finalAlertSound.play();
}

// ページがロードされた時にタイマーの表示を更新
updateDisplay();
