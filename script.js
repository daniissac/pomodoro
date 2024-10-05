let timer;
let timeLeft;
let isWorking = true;
let sessionsCompleted = 0;

const timerDisplay = document.getElementById('timer');
const statusDisplay = document.getElementById('status');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const workDurationInput = document.getElementById('workDuration');
const breakDurationInput = document.getElementById('breakDuration');
const sessionsCompletedDisplay = document.getElementById('sessionsCompleted');
const notificationSound = document.getElementById('notificationSound');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timer);
                timer = null;
                notificationSound.play();
                if (isWorking) {
                    sessionsCompleted++;
                    sessionsCompletedDisplay.textContent = sessionsCompleted;
                    startBreak();
                } else {
                    startWork();
                }
            }
        }, 1000);
        startBtn.textContent = 'Pause';
    } else {
        clearInterval(timer);
        timer = null;
        startBtn.textContent = 'Resume';
    }
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    isWorking = true;
    startWork();
}

function startWork() {
    timeLeft = workDurationInput.value * 60;
    isWorking = true;
    statusDisplay.textContent = 'Work';
    updateDisplay();
    startBtn.textContent = 'Start';
}

function startBreak() {
    timeLeft = breakDurationInput.value * 60;
    isWorking = false;
    statusDisplay.textContent = 'Break';
    updateDisplay();
    startBtn.textContent = 'Start';
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
workDurationInput.addEventListener('change', startWork);
breakDurationInput.addEventListener('change', () => {
    if (!isWorking) {
        startBreak();
    }
});

startWork();