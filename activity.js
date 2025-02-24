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