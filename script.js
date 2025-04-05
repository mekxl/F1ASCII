const trackElement = document.getElementById("game");
const trackSegments = [];
const segmentHeight = 5; // Altura de cada segmento da pista
const segmentWidth = 40; // Largura de cada segmento da pista
let playerPosition = { x: 20, y: 2 };
let lapCount = 0;
let raceStarted = false;

function generateTrackSegment() {
    const segment = [];
    for (let i = 0; i < segmentHeight; i++) {
        let line = " |";
        for (let j = 1; j < segmentWidth - 1; j++) {
            line += Math.random() < 0.2 ? "A" : " "; // 20% de chance de ter um carro adversário
        }
        line += "|";
        segment.push(line);
    }
    return segment;
}

function renderTrack() {
    const output = [];
    for (let i = 0; i < segmentHeight; i++) {
        if (trackSegments.length > i) {
            output.push(trackSegments[i]);
        } else {
            output.push(" |" + " ".repeat(segmentWidth - 2) + "|"); // Linha vazia se não houver segmento
        }
    }
    const playerLine = output[playerPosition.y].split("");
    playerLine[playerPosition.x] = "^"; // Representa o carro do jogador
    output[playerPosition.y] = playerLine.join("");
    trackElement.textContent = output.join("\n");
}

function startRace() {
    raceStarted = true;
    lapCount = 1; // Começa a contagem de voltas
    trackSegments.push(generateTrackSegment()); // Adiciona o primeiro segmento
    renderTrack();
    movePlayer();
}

function movePlayer() {
    if (raceStarted) {
        // Adiciona um novo segmento à pista a cada movimento do jogador
        if (playerPosition.y < segmentHeight - 1) {
            playerPosition.y++;
        } else {
            trackSegments.push(generateTrackSegment());
            playerPosition.y = 0; // Reseta a posição do jogador para o início do novo segmento
        }
        renderTrack();
        setTimeout(movePlayer, 1000); // Move o jogador a cada segundo
    }
}

// Função para mover o jogador
function controlPlayer(direction) {
    if (direction === 'up' && playerPosition.y > 0) {
        playerPosition.y--;
    } else if (direction === 'down' && playerPosition.y < segmentHeight - 1) {
        playerPosition.y++;
    }
    renderTrack();
}

// Adiciona eventos de teclado para movimentar o jogador
document.addEventListener('keydown', (event) => {
    if (raceStarted) {
        if (event.key === 'ArrowUp' || event.key === 'w') {
            controlPlayer('up');
        } else if (event.key === 'ArrowDown' || event.key === 's') {
            controlPlayer('down');
        }
    }
});

// Início do jogo
setTimeout(startRace, 2000);
