/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
document.addEventListener('DOMContentLoaded', function () {

	let scores, currentTotal, activePlayer, isPlaying, previousScore;
	let dice = document.querySelector('.dice');
	let current0 = document.getElementById('current-0');
	let current1 = document.getElementById('current-1');
	let panel0 = document.querySelector('.player-0-panel');
	let panel1 = document.querySelector('.player-1-panel');
	let input = document.getElementById('winning-score');
	
	init();

	// add event listener to the roll dice btn
	document.querySelector('.btn-roll').addEventListener('click', rollDice);
	function rollDice(e) {
		if(isPlaying) {
			// 1. roll the dice and display the result
			let currentScore = Math.floor(Math.random() * 6) + 1;
			dice.src = `./imgs/dice-${currentScore}.png`; // update the dice img to reflect num rolled
			dice.style.display = 'block'; // display the dice
			
			// 2. update the roundScore if the num rolled is greater than 1
			// and update the player's current score
			if (currentScore !== 1) {
				currentTotal += currentScore;
				if(currentScore === 6) {
					if (previousScore === currentScore) {
						// clear the active players current and global scores
						currentScore = previousScore = currentTotal = 0;
						scores[activePlayer] = 0;
						document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
						nextPlayer();
					} else {
						previousScore = currentScore;
					}
				}
			} else {
				nextPlayer();
			}
			document.querySelector(`#current-${activePlayer}`).textContent = '' + currentTotal;
		}
	}
	
	// add an event listener to the hold btn
	document.querySelector('.btn-hold').addEventListener('click', hold);
	function hold(e) {
		if(isPlaying) {
			// save current score to the player's global score
			scores[activePlayer] += currentTotal;
			
			// display the player's global score
			document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
			
			// get the winning score
			let winningScore = document.getElementById('winning-score').value;
			
			// check if the player has won the game, otherwise switch players
			if (scores[activePlayer] >= (winningScore || 100)) {
				// player has won
				document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
				dice.style.display = 'none';
				document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
				document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
				isPlaying = false;
			} else {
				nextPlayer();
			}
		}
	}

	// start a new game
	document.querySelector('.btn-new').addEventListener('click', init);
	
	function nextPlayer() {
		// reset the players current score and switch to the other player
		currentTotal = previousScore = 0;
		activePlayer = (activePlayer === 0)? 1 : 0;
		
		// reset the current scores & update ui
		current0.textContent = current1.textContent = '0';
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		dice.style.display = 'none';
	}

	function init() {
		// initialize the app
		isPlaying = true;
		scores = [0,0];
		currentTotal = activePlayer = previousScore = 0;
		
		dice.style.display = 'none'; // hide the dice until it's rolled
		
		// set the starting ui
		current0.textContent = current1.textContent = '0';
		panel0.classList.remove(['winner'], ['active']);
		panel1.classList.remove(['winner'], ['active']);
		panel0.classList.add('active');
		document.getElementById('score-0').textContent = '0';
		document.getElementById('score-1').textContent = '0';
		document.getElementById('name-0').textContent = 'Player 1';
		document.getElementById('name-1').textContent = 'Player 2';
		document.getElementById('winning-score').value = '';
	}
	

});


