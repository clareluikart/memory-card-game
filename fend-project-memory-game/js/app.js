let inturn = false;
let tempCard;
let moves = 0;
let matches = 0;
let time = -1;
let timeStopper;
const movesSpan = document.querySelector('.moves');
const movesPlural = document.querySelector('.s')
movesSpan.textContent = moves;

function startTimer() {
  timeStopper = setInterval(function() {
    time++;
    document.querySelector('.timer').textContent = time;
  }, 1000);
}

function addMove() {
  moves++;
  movesSpan.textContent = moves;
  if (moves === 1) {
    movesPlural.textContent = "Move";
  } else {
    movesPlural.textContent = "Moves";
  }
}
/*
 * Create a list that holds all of your cards
 */
function flipCard(event) {
  if (time === -1) {
    time++;
    startTimer();
  }
  console.log(event.target);
  console.log(matches);
  if (event.target != tempCard && event.target.tagName == 'LI') {
    event.target.classList.add("show");
    if (!inturn) {
      inturn = true;
      tempCard = event.target;
    } else {
      if ((tempCard.getElementsByTagName('i'))[0].classList.contains((event.target.getElementsByTagName('i'))[0].classList[1])) {
        tempCard.classList.remove("show");
        event.target.classList.remove("show");
        tempCard.classList.add("match");
        event.target.classList.add("match");
        addMove();
        matches++;
        console.log(matches);
        if (matches === 8) {
          clearInterval(timeStopper);
        }
      } else {
        tempCard.classList.remove("show");
        event.target.classList.remove("show");
        addMove();
      }
      inturn = false;
      tempCard = null;
    }
  }
}

const originalDeck = document.getElementsByClassName('deck');
console.log(originalDeck);
const cards = originalDeck[0].getElementsByTagName('li');
console.log(cards);
let shufflearray = [];
for (let i = 0; i < cards.length; i++) {
  shufflearray.push(cards.item(i));
}
console.log(shuffle(shufflearray));
const cardList = document.createElement('ul');
cardList.className = 'deck';
for (let i = 0; i < shufflearray.length; i++) {
  cardList.appendChild(shufflearray[i]);
}
console.log(cardList);
originalDeck[0].remove();
document.body.appendChild(cardList);

cardList.addEventListener('click', flipCard);




/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */