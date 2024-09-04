const board = document.getElementById('game-board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

const cardValues = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;

function initializeBoard() {
    cardValues.sort(() => Math.random() - 0.5); // Embaralha os valores

    board.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedPairs = 0;

    cardValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;

        const img = document.createElement('img');
        img.src = `images/${value}.png`; // Assegure-se de ter imagens nomeadas de acordo com os valores das cartas
        card.appendChild(img);

        card.addEventListener('click', () => handleCardClick(card));
        board.appendChild(card);
        cards.push(card);
    });

    statusDisplay.textContent = 'Encontre todos os pares!';
}

function handleCardClick(card) {
    if (flippedCards.length === 2 || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === cardValues.length / 2) {
            statusDisplay.textContent = 'Você ganhou!';
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function resetGame() {
    initializeBoard();
}

resetButton.addEventListener('click', resetGame);

// Inicia o jogo pela primeira vez
initializeBoard();
