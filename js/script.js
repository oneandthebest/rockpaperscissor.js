//Challenge 1: age in days

function ageInDays() {
  var birthYear = prompt('sdfs');
  var ageInDays = (2021 - birthYear) * 365;
  var h1 = document.createElement('h1');
  var textAnswer = document.createTextNode('you are ' + ageInDays + ' days');
  h1.setAttribute('id', 'ageInDays');
  h1.appendChild(textAnswer);
  document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
  document.getElementById('ageInDays').remove();
}

//Challenge 2: generate cat
function generateCat() {
  var image = document.createElement('img');
  var div = document.getElementById('flex-cat-gen');
  image.src = 'http://moar.edgecats.net/';
  div.appendChild(image);
}

//challenge 3: rock paper scissor
function rpsGame(yourChoice) {
  // console.log(yourChoice);
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randToRpsInt());
  // console.log('Computer choice:', botChoice);
  results = decideWinner(humanChoice, botChoice);
  // console.log(results);
  message = finalMessage(results);
  // console.log(message);
  rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };

  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][yourChoice];

  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { message: 'you lost', color: 'red' };
  } else if (yourScore === 0.5) {
    return { message: 'you tied', color: 'yellow' };
  } else {
    return { message: 'you won!', color: 'green' };
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var imagesDatabase = {
    rock: document.getElementById('rock').src,
    paper: document.getElementById('paper').src,
    scissors: document.getElementById('scissors').src,
  };

  //remove all images
  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();

  var humanDiv = document.createElement('div');
  var botDiv = document.createElement('div');
  var messageDiv = document.createElement('div');

  humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
  messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + '<h1>';
  botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";

  document.getElementById('flex-box-rps-div').appendChild(humanDiv);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
  document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

// challenge 4: change color of buttons
var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}

// console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === 'red') {
    buttonsRed();
  } else if (buttonThingy.value === 'green') {
    buttonsGreen();
  } else if (buttonThingy.value === 'reset') {
    buttonColorReset();
  } else if (buttonThingy.value === 'random') {
    randomColors();
  }
}

function buttonsRed() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-danger');
  }
}

function buttonsGreen() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-success');
  }
}

function buttonColorReset() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

function randomColors() {
  let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];

  for (let i = 0; i < all_buttons.length; i++) {
    let randomNumber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
  }
}

// challenge 5: blackjack
// challenge 5: blackjack
// challenge 5: blackjack
// challenge 5: blackjack
// challenge 5: blackjack
let blackjackGame = {
  "You": {"scoreSpan": "#your-blackjack-result", "div": "#your-box", "score": 0,},
  "Dealer": {"scoreSpan": "#dealer-blackjack-result", "div": "#dealer-box", "score": 0,},
  "Cards": ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
  "cardsMap": {'A': [1, 11], '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10,},
  "Wins": 0,
  "Losses": 0,
  "Draws": 0,
}

const YOU = blackjackGame['You'];
const DEALER = blackjackGame['Dealer'];

const HIT_SOUND = new Audio('sounds/swish.m4a');

document.querySelector('#blackjack-hit').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand').addEventListener('click', dealerLogic);

function blackjackHit() {
  r = document.querySelector('#blackjack-result').textContent;
      if (YOU['score'] <= 21) {
          card = pickCard();
          showCard(YOU);
          updateScore(card, YOU);
          showScore(YOU);
      } else {
          alert('Sorry! Cannot pick card after bust.')
      }
}

function showCard(activePlayer) {
  displayCard(card, activePlayer);
}

function blackjackDeal() {
  document.querySelector('#blackjack-result').textContent = 'Let\'s Play';
  document.querySelector('#blackjack-result').style.color = '#212529'
  updateTable();
  let yourImages = document.querySelector('#your-box').querySelectorAll('img');
  let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
  for (let i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
  }
  for (let j = 0; j < dealerImages.length; j++) {
      dealerImages[j].remove();
  }
  HIT_SOUND.play();

  YOU['score'] = 0;
  DEALER['score'] = 0;

  document.querySelector('#your-blackjack-result').textContent = 0;
  document.querySelector('#dealer-blackjack-result').textContent = 0;

  document.querySelector('#your-blackjack-result').style.color = 'white';
  document.querySelector('#dealer-blackjack-result').style.color = 'white';
}

function displayCard(card, activePlayer) {
  let cardImage = document.createElement('img');
  cardImage.src = `images/${card}.png`;
  document.querySelector(activePlayer['div']).appendChild(cardImage);
  HIT_SOUND.play();
}

function pickCard() {
  return blackjackGame['Cards'][Math.floor(Math.random() * 13)];
}

function updateScore(card, activePlayer) {
  // If adding 11 keeps me below 21, add 11, otherwise add 1.
  if (card == 'A') {
      if (activePlayer['score'] + 11 <= 21) {
          activePlayer['score'] += 11;
      } else {
          activePlayer['score'] += 1;
      }
  } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer['score'] <= 21) {
      document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  } else {
      document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
      document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
  }
}

function dealerLogic() {
  while (DEALER['score'] < 15) {
      let card = pickCard();
      displayCard(card, DEALER);
      updateScore(card, DEALER);
      showScore(DEALER);
  }

  showResult(computeWinner());
}

// Compute winner and return result
function computeWinner() {
  let winner;

  if (YOU['score'] <= 21) {
      if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
          winner = YOU;
      } else if (YOU['score'] < DEALER['score']) {
          winner = DEALER;
      }
  } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
      winner = DEALER;
  }
  return winner;
}

function showResult(result) {
  resultSpan = document.querySelector('#blackjack-result');
  if (result == YOU) {
      resultSpan.textContent = 'You won! :D';
      resultSpan.style.color = 'green';
      const kaChing = new Audio('sounds/cash.mp3');
      kaChing.play();
      blackjackGame['Wins']++;
  } else if (result == DEALER) {
      resultSpan.textContent = 'You lost! :-(';
      resultSpan.style.color = 'red';
      const aww = new Audio('sounds/aww.mp3');
      aww.play();
      blackjackGame['Losses']++;
  } else {
      resultSpan.textContent = 'You drew! :|';
      // resultSpan.style.color = 'black';
      blackjackGame['Draws']++;
  }
}

function blackjackReset() {
  document.querySelector('#blackjack-result').textContent = 'Let\'s Play!'
  document.querySelector('#blackjack-result').style.color = 'black';
}

function updateTable() {
  let wins = document.querySelector('#wins');
  let losses = document.querySelector('#losses');
  let draws = document.querySelector('#draws');

  wins.textContent = blackjackGame['Wins'];
  losses.textContent = blackjackGame['Losses'];
  draws.textContent = blackjackGame['Draws'];
}
