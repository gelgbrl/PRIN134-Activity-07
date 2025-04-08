class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }
}

function calculateSuccessRate() {
    return Math.random(); 
}

function shootBall(player, attempts) {
    let successfulShots = 0;
    for (let i = 0; i < attempts; i++) {
        if (calculateSuccessRate() > 0.5) { 
            player.score += 1;
            successfulShots += 1;
        }
    }
    return successfulShots; 
}

function rankPlayers(players) {
    return players.sort((a, b) => b.score - a.score);
}

function tieBreaker(players, attempts, roundNumber) {
    console.log(`\n${String.fromCodePoint(127936)} Round ${roundNumber} begins! ${String.fromCodePoint(127936)}`);

    players.forEach(player => player.score = 0);

    players.forEach(player => {
        const successfulShots = shootBall(player, attempts);
        console.log(`${player.name} made ${successfulShots} successful shots this round.`);
    });

    const rankedPlayers = rankPlayers(players);
    console.log(`\n${String.fromCodePoint(127942)} Ranking after this round: ${String.fromCodePoint(127942)}`);
    rankedPlayers.forEach((player, index) => {
        console.log(`${index + 1}. ${player.name} - Score: ${player.score}`);
    });

    return rankedPlayers; 
}

function runGame() {
    const players = [
        new Player("Seju"),
        new Player("Sumin"),
        new Player("Sungji"),
        new Player("Nami"),
        new Player("Kim")
    ];

    const attempts = 10; 

    players.forEach(player => shootBall(player, attempts));

    let rankedPlayers = rankPlayers(players);

    console.log(`${String.fromCodePoint(127941)} Ranking after this round: ${String.fromCodePoint(127941)}`);
    rankedPlayers.forEach((player, index) => {
        console.log(`${index + 1}. ${player.name} - Score: ${player.score}`);
    });

    let topScore = rankedPlayers[0].score;
    let tiedWinners = rankedPlayers.filter(player => player.score === topScore);

    let roundNumber = 2;
    while (tiedWinners.length > 1) {
        console.log(`\nTiebreaker needed between: ${tiedWinners.map(player => player.name).join(", ")}`);
        tiedWinners = tieBreaker(tiedWinners, attempts, roundNumber);
        topScore = tiedWinners[0].score;
        tiedWinners = tiedWinners.filter(player => player.score === topScore);
        roundNumber++;
    }

    console.log(`\n${String.fromCodePoint(129351)} The winner is: ${tiedWinners[0].name} with ${tiedWinners[0].score} points ${String.fromCodePoint(129351)}`);
}

// Run the game
runGame();


const app = document.getElementById('app');

const container = document.createElement('div');
container.id = 'main';
container.classList.add('container');
app.append(container);

const header = document.createElement('h3');
header.textContent = 'NAME';
container.append(header);


const playerName = document.createElement('h4');
playerName.id = 'players';
playerName.classList.add('players-group', 'pt-3', 'pb-2');
container.append(playerName);

const playerText = document.createElement('h3');
playerText.textContent = 'PLAYERS';
container.append(playerText)

const playerControls = document.createElement('div'); 
playerControls.id = 'player-controls';
playerControls.classList.add('input-group');
document.getElementById('players').before(playerControls);

const playersInput = document.createElement('input');
playersInput.type = 'text';
playersInput.id = 'player-input';
playersInput.classList.add('input-players');
playerControls.append(playersInput); 

const playersNameButton = document.createElement('button');
playersNameButton.id = 'btn-name';
playersNameButton.classList.add('btn', 'btn-outline-primary');
playersNameButton.textContent = 'Add';
playersNameButton.addEventListener('click', () => {
    let playersInput = document.getElementById('player-input');
    let playerName = document.getElementById('players');

    let newItem = document.createElement('h4');
    newItem.classList.add('list-group-item');
    newItem.textContent = " " + playersInput.value; 

    playerName.append(newItem);
    playersInput.value = '';
}) 

playerControls.append(playersNameButton);