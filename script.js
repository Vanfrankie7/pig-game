'use strict';

//VARIABLES FOR ELEMENTS
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
//const score1El = document.querySelector('#score--1'); //Still the universal way to select a class or an ID.
const score1El = document.getElementById('score--1'); //Way to select an ID selector. We just passed in the name of the ID without a # symbol.
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice'); //Variable for the .dice class.
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing; //Declaring the variables without values, to then asssign values to them in the init function.

//SETTING THE FUNCTION FOR THE  STARTING CONDITION OF THE GAME. WHENEVER WE LOAD THE PAGE FOR THE FIRST TIME OR WHENEVER THE NEW-GAME BUTTON IS CLICKED.
const init = function () {
  scores = [0, 0]; //reassigning values to the 4 variables declared empty above.
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden'); //Hiding the dice from the initial state by APPLYING the .hidden class set to display: none; in our css.
  player0El.classList.remove('player--winner'); //We need to remove the winner class on the both, cos we wont know who won the game.
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active'); //Setting the first player to be the first player when the game restarts
  player1El.classList.remove('player--active');
};
init();

//CREATING A FUNCTION FOR SWITCHING PLAYERS
const switchPlayer = function () {
  //Switch to the next player If it is a 1, and lose your score.
  document.getElementById(`current--${activePlayer}`).textContent = 0; //Selecting the current player which at this point is still 0,
  // then we set this text content to 0, then we switch from 0 to 1.
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //switching the active player. If it is 0, then the new active player should be 1, else it should be 0.

  //Toggling both the player--0 and player--1 at the same time to ensure that the player--class is only at one of the elements at once.
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  //For now, Playing is true, but When a winner emerges, playing becomes false as set in the if(scores[activePlayer] >= 100) block below
  if (playing) {
    //1. Generating a Random Dice roll
    const dice = Math.trunc(Math.random() * 6) + 1; //Generating a Random number from 1-6 in a click event.

    //2. We Display the Dice
    diceEl.classList.remove('hidden'); //Removing the .hidden class from the element in a click event.
    diceEl.src = `dice-${dice}.png`; //Loading the corresponding image of the rolled Dice number with a template literal.

    //3. Check for rolled 1:
    if (dice !== 1) {
      //If it is NOT a 1, Add number to current score
      currentScore += dice; //currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //Selecting the score dynamically based on who the active player is right now
    } else {
      //Switch to the NEXT player
      switchPlayer(); //The swicthPlayer function was set above and called here.
    }
  }
});

//IMPLEMENTING THE BTN-HOLD FUNCTIONALITY
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add Current score to active player's score.
    scores[activePlayer] += currentScore; //scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if Player's score is >= 100.
    if (scores[activePlayer] >= 100) {
      // Finish the game if yes
      playing = false; //Playing becomes false when a winner emerges, so, the functionality of rolling and holding btns will become false as set here..
      diceEl.classList.add('hidden'); //Adding the .hidden class to hide the Dice when a player wins the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); //Adding the class name .player--winner if the IF condition is true.

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); //Removing the .player--actice class from the elemnet so that the css styles will not Clash when a player wins.
    } else {
      //3. Switch to the next player
      switchPlayer(); //The swicthPlayer function was set above and called here.
    }
  }
});

//IMPLEMENTING THE NEW GAME BUTTON TO RESET ALL THE CONDITIONS OF THE GAME.
btnNew.addEventListener('click', init); //Calling the innit function here to be executed in the click event handler of the btnNew
