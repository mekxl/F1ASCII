const trackElement = document.getElementById("game");

const INTERLAGOS_TRACK = [
    " |                          | ",
    " |                          | ",
    " |                          | ",
    " |                          | ",
    " |                          | ",
    " |                          | ",
    " |                          | ",
    " |                          | ",
    " |                          | ",
    " |                          | ",
    " |                          | ",
    " |                          | ",
    " |                          | ",
    " |                          | ",
    " |                          | ",
    " |                          | ",
    " |                          | ",
    " |                          | ",
    " |                          | ",
    " |                          | ",
];

let playerPosition = { x: 20, y: 18 };
let lapCount = 0;
let raceStarted = false;
let opponents = [
    { x: 15, y: 5, direction: 1 }, // Carro 1
    { x: 25, y: 10, direction: -1 }, // Carro 2
];

function renderTrack(track, playerPos) {
    const output = track.map((line, y) => {
        if (y === playerPos.y) {
            return line.substring(0, playerPos.x) + "^" + line.substring(playerPos.x + 1);
        }
        return line;
    });

    // Desenhar os adversários
    opponents.forEach(opponent => {
        if (opponent.y < track.length) {
            const line = output[opponent.y].split("");
            line[opponent.x] = "A"; // Representa o carro adversário
            output[opponent.y] = line.join("");
        }
    });

    trackElement.textContent = output.join("\n");
    checkLapCompletion(); // Verifica se o jogador completou uma volta
}

function renderStartLights(step) {
    const lights = ["🔴", "🔴", "🔴", "🔴", "🔴"];
    let output = "\n\n\n";
    output += "    " + lights.map((l, i) => (i < step ? l : "⚫")).join(" ") + "\n";
    output += "\nPREPARE-SE...\n";
    trackElement.textContent = output;
}

function startRace() {
    raceStarted = true;
    lapCount = 1; // Começa a contagem de voltas
    renderTrack(INTERLAGOS_TRACK, playerPosition);
    moveOpponents(); // Inicia o movimento dos adversários
}

function showLightsAndStartRace() {
    let step = 0;
    const interval = setInterval(() => {
        step++;
        renderStartLights(step);
        if (step >= 5) {
            clearInterval(interval);
            setTimeout(startRace, 1000);
        }
    }, 800);
}

function moveOpponents() {
    opponents.forEach(opponent => {
        opponent.x += opponent.direction; // Move o carro adversário
        // Verifica se o carro adversário bateu nas bordas
        if (opponent.x <= 1 || opponent.x >= INTERLAGOS_TRACK[0].length - 2) {
            opponent.direction *= -1; // Inverte a direção
        }
        // Verifica colisão com o jogador
        if (opponent.x === playerPosition.x && opponent.y === playerPosition.y) {
            alert("Colisão! Você foi ultrapassado!");
            resetRace();
        }
    });
    renderTrack(INTERLAGOS_TRACK, playerPosition);
    if (raceStarted) {
        setTimeout(moveOpponents, 1000); // Move os adversários a cada segundo
    }
}

function checkLapCompletion() {
    if (playerPosition.y === 0) { // Supondo que a linha 0 é a linha de chegada
        lapCount++;
        if (lapCount > 5) {
            alert("Você completou a corrida!");
            resetRace();
        } else {
            playerPosition.y = 18; // Volta para a posição inicial
        }
    }
}

function resetRace() {
    raceStarted = false;
    lapCount = 0;
    playerPosition = { x: 20, y: 18 };
    opponents = [
        { x:  15, y: 5, direction: 1 },
        { x: 25, y: 10, direction: -1 },
    ];
    renderTrack(INTERLAGOS_TRACK, playerPosition);
    setTimeout(showLightsAndStartRace, 2000);
}

// Início do jogo
renderTrack(INTERLAGOS_TRACK, playerPosition);
setTimeout(showLightsAndStartRace, 2000);
