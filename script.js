let secretNumber;
let attempts;
const maxAttempts = 8;
let phase = 1;
let timer;
let timeLeft;

const phaseTimes = [60, 50, 30, 20]; // Tempo para cada fase em segundos

function startPhase() {
    timeLeft = phaseTimes[phase - 1];
    document.getElementById("timer").textContent = `Tempo restante: ${formatTime(timeLeft)}`;
    document.getElementById("phase").textContent = `Fase ${phase}: ${phaseTimes[phase - 1]} segundos`;
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    if (timeLeft < 0) {
        timeLeft = 0;
        clearInterval(timer);
        document.getElementById("timer").textContent = `Tempo restante: ${formatTime(timeLeft)}`;
        endGame();
    } else {
        document.getElementById("timer").textContent = `Tempo restante: ${formatTime(timeLeft)}`;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function endGame() {
    displayMessage(`Tempo esgotado! O número correto era ${secretNumber}.`);
    document.getElementById("guessField").disabled = true;
    document.getElementById("retryButton").style.display = 'inline';
}

function showVictoryScreen() {
    document.getElementById("message").textContent = 'Parabéns! Você completou todas as fases!';
    document.getElementById("phase").textContent = '';
    document.getElementById("timer").textContent = '';
    document.getElementById("guessField").style.display = 'none';
    document.getElementById("retryButton").style.display = 'none';
    document.getElementById("winScreen").style.display = 'block';
}

function advancePhase() {
    if (phase < 4) {
        document.getElementById("message").textContent = `Parabéns! Passando para a fase ${phase + 1}...`;
        document.getElementById("guessField").disabled = true;
        document.getElementById("retryButton").style.display = 'none';

        setTimeout(() => {
            phase++;
            attempts = 0;
            secretNumber = Math.floor(Math.random() * 100) + 1;
            document.getElementById("guessField").value = '';
            document.getElementById("guessField").disabled = false;
            document.getElementById("message").textContent = '';
            startPhase();
        }, 2000);
    } else {
        showVictoryScreen();
    }
}

function checkGuess() {
    let guess = parseInt(document.getElementById("guessField").value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        displayMessage('Por favor, insira um número entre 1 e 100.');
        return;
    }

    if (guess === secretNumber) {
        displayMessage(`Parabéns! Você acertou o número ${secretNumber} na Fase ${phase} em ${attempts + 1} tentativas.`);
        document.getElementById("guessField").disabled = true;
        clearInterval(timer);

        if (phase === 4) {
            showVictoryScreen();
        } else {
            setTimeout(advancePhase, 2000);
        }
    } else {
        attempts++;
        
        if (attempts >= maxAttempts) {
            displayMessage(`Suas tentativas acabaram. O número correto era ${secretNumber}.`);
            document.getElementById("guessField").disabled = true;
            document.getElementById("retryButton").style.display = 'inline';
        } else {
            if (guess < secretNumber) {
                displayMessage(`Tente um número maior. Tentativas restantes: ${maxAttempts - attempts}`);
            } else {
                displayMessage(`Tente um número menor. Tentativas restantes: ${maxAttempts - attempts}`);
            }
        }
    }
}

function displayMessage(message) {
    document.getElementById("message").textContent = message;
}

function resetGame() {
    phase = 1;
    attempts = 0;
    secretNumber = Math.floor(Math.random() * 100) + 1;
    document.getElementById("guessField").value = '';
    document.getElementById("guessField").style.display = 'inline';
    document.getElementById("guessField").disabled = false;
    document.getElementById("message").textContent = '';
    document.getElementById("retryButton").style.display = 'none';
    document.getElementById("winScreen").style.display = 'none';
    startPhase();
}

window.onload = () => {
 resetGame();
};

// Previne o envio do formulário ao pressionar Enter
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Previne o comportamento padrão
            if (!document.getElementById("guessField").disabled) {
                checkGuess();
            }
        }
    });
});

