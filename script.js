const passwordInput = document.getElementById("password-input");
const loginScreen = document.getElementById("login-screen");
const gameContainer = document.getElementById("game-container");
const gameBoard = document.getElementById("game-board");
const winMessage = document.getElementById("win-message");
const errorMessage = document.getElementById("error-message");

function checkPassword() {
    if (passwordInput.value === "GERMANSMC") {
        loginScreen.classList.add("hidden");
        gameContainer.classList.remove("hidden");
        startGame();
    } else {
        errorMessage.classList.remove("hidden");
        setTimeout(() => {
            errorMessage.classList.add("hidden");
        }, 2000);
    }
}

const icons = ["❤️", "💖", "💘", "💝", "💗", "💕", "💞", "💓", "🌹", "💜", "💌", "💍", "🎀", "😍", "💎", "🖤", "💔", "👩‍❤️‍👨"];
let shuffledIcons = [];
let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false;

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame() {
    shuffledIcons = shuffleArray([...icons, ...icons]); // Duplica los iconos para hacer parejas
    gameBoard.innerHTML = "";
    matchedPairs = 0;
    lockBoard = true; // Bloquea el juego al inicio

    shuffledIcons.forEach((icon, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.icon = icon;
        card.dataset.index = index;
        card.innerHTML = icon; // Muestra las cartas por un momento
        gameBoard.appendChild(card);
    });

    setTimeout(() => {
        document.querySelectorAll(".card").forEach(card => {
            card.innerHTML = "";
            card.addEventListener("click", flipCard);
        });
        lockBoard = false; // Desbloquea el juego después de la vista previa
    }, 2000);
}

function flipCard() {
    if (lockBoard || this.classList.contains("flipped")) return;

    this.classList.add("flipped");
    this.innerHTML = this.dataset.icon;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        lockBoard = true; // Bloquea temporalmente para evitar clics rápidos
        setTimeout(checkMatch, 800);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.icon === card2.dataset.icon) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;
    } else {
        swapCards(card1, card2); // Mueve las cartas si no coinciden
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.innerHTML = "";
            card2.innerHTML = "";
        }, 500);
    }

    flippedCards = [];
    lockBoard = false;

    if (matchedPairs === icons.length) {
        winMessage.classList.remove("hidden");
    }
}

function swapCards(card1, card2) {
    const index1 = [...gameBoard.children].indexOf(card1);
    const index2 = [...gameBoard.children].indexOf(card2);

    // Intercambia las cartas en la estructura del DOM
    const temp = document.createElement("div");
    gameBoard.insertBefore(temp, card1);
    gameBoard.insertBefore(card1, card2);
    gameBoard.insertBefore(card2, temp);
    gameBoard.removeChild(temp);
}

startGame();
