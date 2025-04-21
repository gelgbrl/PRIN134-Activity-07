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
    players.forEach(player => player.score = 0);
    players.forEach(player => shootBall(player, attempts));
    return rankPlayers(players);
  }
  
  // DOM Setup
  const app = document.getElementById('app');
  
  const container = document.createElement('div');
  container.classList.add('container');
  app.append(container);
  
  const header = document.createElement('h2');
  header.textContent = 'Basketball Game';
  container.append(header);
  
  const subHeader = document.createElement('h3');
  subHeader.textContent = 'Add Players';
  container.append(subHeader);
  
  const playerControls = document.createElement('div');
  container.append(playerControls);
  
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter player name';
  playerControls.append(input);
  
  const addButton = document.createElement('button');
  addButton.textContent = 'Add';
  playerControls.append(addButton);
  
  const playerList = document.createElement('div');
  playerList.classList.add('mt-3');
  container.append(playerList);
  
  const startButton = document.createElement('button');
  startButton.textContent = 'Start Game';
  startButton.classList.add('mt-3');
  container.append(startButton);
  
  const resultsContainer = document.createElement('div');
  resultsContainer.id = 'results';
  resultsContainer.classList.add('mt-4');
  container.append(resultsContainer);
  
  const players = [];
  
  function renderPlayers() {
    playerList.innerHTML = '';
    players.forEach((player, index) => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.marginBottom = '8px';
      wrapper.style.gap = '10px';
  
      const nameLabel = document.createElement('span');
      nameLabel.textContent = player.name;
  
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.style.fontSize = '12px'; 
      removeBtn.style.padding = '4px 8px'; 
      removeBtn.style.fontWeight = 'bold'; 
      removeBtn.style.cursor = 'pointer';
      removeBtn.style.backgroundColor = 'red'; 
      removeBtn.style.color = 'white'; 
      removeBtn.style.border = 'none'; 
      removeBtn.style.borderRadius = '4px'; 
      removeBtn.addEventListener('click', () => {
        players.splice(index, 1);
        renderPlayers();
      });
  
      wrapper.append(nameLabel, removeBtn);
      playerList.append(wrapper);
    });
  }
  
  addButton.addEventListener('click', () => {
    const name = input.value.trim();
    if (name) {
      const player = new Player(name);
      players.push(player);
      renderPlayers();
      input.value = '';
    }
  });
  
  startButton.addEventListener('click', () => {
    if (players.length < 2) {
      alert("Add at least 2 players to start the game.");
      return;
    }
  
    resultsContainer.innerHTML = '';
    const attempts = 10;
  
    players.forEach(player => {
      player.score = 0;
      shootBall(player, attempts);
    });
  
    let ranked = rankPlayers([...players]);
  
    const resultsTitle = document.createElement('h4');
    resultsTitle.textContent = "Game Results:";
    resultsContainer.append(resultsTitle);
  
    ranked.forEach((player, index) => {
      const line = document.createElement('p');
      line.textContent = `${index + 1}. ${player.name} - ${player.score} points`;
      resultsContainer.append(line);
    });
  
    let topScore = ranked[0].score;
    let tied = ranked.filter(p => p.score === topScore);
    let round = 2;
    const maxRounds = 3;
  
  
    while (tied.length > 1 && round <= maxRounds) {
      const roundHeader = document.createElement('h4');
      roundHeader.textContent = `Tiebreaker Round ${round}`;
      resultsContainer.append(roundHeader);
  
      tied = tieBreaker(tied, attempts, round);
  
      const roundResults = document.createElement('p');
      roundResults.textContent = `Results after Round ${round}:`;
      resultsContainer.append(roundResults);
  
      tied.forEach((player, index) => {
        const line = document.createElement('p');
        line.textContent = `${index + 1}. ${player.name} - ${player.score} points`;
        resultsContainer.append(line);
      });
  
      topScore = tied[0].score;
      tied = tied.filter(p => p.score === topScore);
      round++;
    }
  
    const winner = document.createElement('h3');
    winner.innerHTML = `Winner: <strong>${tied[0].name}</strong> with <strong>${tied[0].score}</strong> points!`;
    resultsContainer.append(winner);
  });
  