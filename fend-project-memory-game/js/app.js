let inturn = false;
let tempCard;
let moves = 0;
let matches = 0;
let time = -1;
let timeStopper;
let stars = 3;
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
        if (moves === 24) {
          const one = document.querySelector('.one');
          one.classList.remove('fa-star');
          one.classList.add('fa-star-o');
          stars--;
        } else if (moves === 32) {
          const two = document.querySelector('.two');
          two.classList.remove('fa-star');
          two.classList.add('fa-star-o');
          stars--;
        } else if (moves === 40) {
          const three = document.querySelector('.three');
          three.classList.remove('fa-star');
          three.classList.add('fa-star-o');
          stars--;
        }
        matches++;
        console.log(matches);
        if (matches === 8) {
          clearInterval(timeStopper);
          modal.style.display = "block";
          document.querySelector('.winSeconds').textContent = time;
          document.querySelector('.winStars').textContent = stars;
          if (stars === 1) {
            document.querySelector('.stars-s').textContent = "";
          }
        }
      } else {
        tempCard.classList.remove("show");
        event.target.classList.remove("show");
        addMove();
        if (moves === 24) {
          const one = document.querySelector('.one');
          one.classList.remove('fa-star');
          one.classList.add('fa-star-o');
        } else if (moves === 32) {
          const two = document.querySelector('.two');
          two.classList.remove('fa-star');
          two.classList.add('fa-star-o');
        } else if (moves === 40) {
          const three = document.querySelector('.three');
          three.classList.remove('fa-star');
          three.classList.add('fa-star-o');
        }
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

// Get the modal
var modal = document.getElementById('winModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

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