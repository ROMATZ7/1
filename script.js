// script.js
// Contraseña específica para este juego
const correctPassword = "GERMANSMC";

// Referencias a elementos HTML
const passwordScreen = document.getElementById("password-screen");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");
const gameContainer = document.getElementById("game-container");

// Función para verificar la contraseña
function checkPassword() {
    if (passwordInput.value === correctPassword) {
        // Ocultar pantalla de contraseña y mostrar el juego
        passwordScreen.classList.add("hidden");
        gameContainer.classList.remove("hidden");
    } else {
        // Mostrar mensaje de error si la contraseña es incorrecta
        errorMessage.classList.remove("hidden");
    }
}
const emojis = [
    '✨', '🌹', '🌸', '🍓', '🍫', '🌌', '🩷', '💟', 
    '🍪', '🐰', '🌟', '🕯️', '💎', '🎆', '🍬', '🍭', 
    '🧸', '🎁'
]; // 18 emojis diferentes
let board = [];
let firstCard = null;
let secondCard = null;
let matchedPairs = 0;
const totalPairs = emojis.length; // 18 parejas (36 cartas)
const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

// Restricción de tiempo
const allowTesting = true; // Cambiar a false para habilitar solo en la fecha/hora real

function isGameAvailable() {
    const now = new Date();
    if (allowTesting) return true; // Siempre habilitado para pruebas
    return (
        now.getMonth() === 11 && // Diciembre (mes 11)
        now.getDate() === 25 &&
        now.getHours() >= 9 &&
        now.getHours() < 10
    );
}

// Mostrar cuenta regresiva si no está disponible
function showCountdown() {
    const now = new Date();
    const targetTime = new Date(now.getFullYear(), 11, 25, 9, 0, 0);
    const timeLeft = targetTime - now;

    if (timeLeft > 0) {
        const hours = Math.floor(timeLeft / 3600000);
        const minutes = Math.floor((timeLeft % 3600000) / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        messageElement.textContent = `El juego estará disponible en ${hours}h ${minutes}m ${seconds}s.`;
    } else {
        startGame();
    }
}

// Crear tablero
function createBoard() {
    boardElement.innerHTML = '';
    board = [];
    matchedPairs = 0;

    // Duplicar emojis y mezclarlos
    const shuffledEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

    shuffledEmojis.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.dataset.value = emoji;
        card.addEventListener('click', () => revealCard(card));
        board.push(card);
        boardElement.appendChild(card);
    });

    // Estilo dinámico del tablero
    const size = Math.ceil(Math.sqrt(board.length));
    boardElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
}

// Revelar carta
function revealCard(card) {
    if (card.classList.contains('revealed') || firstCard && secondCard) return;

    card.classList.add('revealed');
    card.textContent = card.dataset.value;

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkMatch();
    }
}

// Verificar coincidencia
function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard = null;
        secondCard = null;
        matchedPairs++;

        if (matchedPairs === totalPairs) {
            endGame(true);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('revealed');
            firstCard.textContent = '';
            secondCard.classList.remove('revealed');
            secondCard.textContent = '';
            firstCard = null;
            secondCard = null;
        }, 1000);
    }
}

// Terminar juego
function endGame(won) {
    if (won) {
        messageElement.textContent = '🎉 ¡Ganaste! contraseña: BUEN0RR0. Para avanzar, en la presentación toca una de las monedas';
    }
    board.forEach(card => card.removeEventListener('click', () => revealCard(card)));
}

// Reiniciar juego
function resetGame() {
    if (!isGameAvailable()) {
        setInterval(showCountdown, 1000);
        return;
    }
    messageElement.textContent = '';
    createBoard();
}

// Inicializar juego
resetButton.addEventListener('click', resetGame);
resetGame();