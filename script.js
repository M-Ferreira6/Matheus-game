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
    document.getElementById("message").textContent = `Parabéns! Você completou todas as fases!`;
    document.getElementById("phase").textContent = '';
    document.getElementById("timer").textContent = '';
    document.getElementById("guessField").style.display = 'none';
    document.getElementById("retryButton").style.display = 'none';
    document.getElementById("winScreen").style.display = 'block'; // Mostra a tela de vitória
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
    if (attempts >= maxAttempts -1) {
        displayMessage(`Suas tentativas acabaram. O número correto era ${secretNumber}.`);
        document.getElementById("guessField").disabled = true;
        document.getElementById("retryButton").style.display = 'inline';
        return;
    }

    let guess = parseInt(document.getElementById("guessField").value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        displayMessage(`Por favor, insira um número entre 1 e 100.`);
        return;
    }

    attempts++;

    if (guess === secretNumber) {
        if (phase === 4) {
            displayMessage(`Parabéns! Você acertou o número ${secretNumber} na Fase ${phase} em ${attempts} tentativas.`);
            document.getElementById("guessField").disabled = true;
            clearInterval(timer); // Para o cronômetro quando o jogo termina
            showVictoryScreen(); // Mostra a tela de vitória para a Fase 4
        } else {
            displayMessage(`Parabéns! Você acertou o número ${secretNumber} na Fase ${phase} em ${attempts} tentativas.`);
            document.getElementById("guessField").disabled = true;
            setTimeout(advancePhase, 2000);
        }
    } else if (guess < secretNumber) {
        displayMessage(`Tente um número maior. Tentativas restantes: ${maxAttempts - attempts}`);
    } else {
        displayMessage(`Tente um número menor. Tentativas restantes: ${maxAttempts - attempts}`);
    }

    if (phase === 4 && attempts === maxAttempts && guess !== secretNumber) {
        displayMessage(`Suas tentativas acabaram. O número correto era ${secretNumber}.`);
        document.getElementById("guessField").disabled = true;
        document.getElementById("retryButton").style.display = 'inline';
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
    document.getElementById("winScreen").style.display = 'none'; // Oculta a tela de vitória ao reiniciar
    startPhase();
}

window.onload = () => {
    phase = 1;
    attempts = 0;
    secretNumber = Math.floor(Math.random() * 100) + 1;
    startPhase();
};
