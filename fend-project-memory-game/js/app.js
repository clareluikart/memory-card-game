// variable that keeps track of whether the game is in play
let inturn = false;
// keeps track of if an animation is running
let animating = false;
// keeps track of the first card while choosing a second card
let tempCard;
// keeping track of moves
let moves = 0;
// keeps track of matches for the stars
let matches = 0;
// keeps track of time. starts at -1 at the beginning
let time = -1;
// setInterval variable so that timer can be stopped
let timeStopper;
// number of stars left
let stars = 3;
// selecting moves in the html
const movesSpan = document.querySelector('.moves');
const movesPlural = document.querySelector('.s')
movesSpan.textContent = moves;

//timer: called after first turn
function startTimer() {
  timeStopper = setInterval(function() {
    // times in seconds: increases time by 1 every second
    time++;
    document.querySelector('.timer').textContent = time;
  }, 1000);
}

// adds move and updates the move counter for singular and plural
function addMove() {
  moves++;
  movesSpan.textContent = moves;
  if (moves === 1) {
    movesPlural.textContent = "Move";
  } else {
    movesPlural.textContent = "Moves";
  }
}

// function processed when any card is clicked
function flipCard(event) {
  //checking if timer has started. if not, start timer.
  if (time === -1) {
    time++;
    startTimer();
  }
  // checking that an animation is not in progress
  if (animating === false) {
    // checking that the card hasn't already been clicked and that it isn't the background
    if (event.target != tempCard && event.target.tagName == 'LI') {
      // "flipping" over the card and making it show
      event.target.classList.add("open", "show");
      // checking if this is the first click or the second
      if (!inturn) {
        inturn = true;
        tempCard = event.target;
      } else {
        //seeing if the cards match
        if ((tempCard.getElementsByTagName('i'))[0].classList.contains((event.target.getElementsByTagName('i'))[0].classList[1])) {
          //if they do, change their class to match
          tempCard.classList.remove("open", "show");
          event.target.classList.remove("open", "show");
          tempCard.classList.add("match");
          event.target.classList.add("match");
          addMove();
          //after adding move, check if the stars need to be changed
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
          //add a match so we can see if the game is done.
          matches++;
          if (matches === 8) {
            //if  it is, end the time, and make the modal
            clearInterval(timeStopper);
            modal.style.display = "block";
            document.querySelector('.winSeconds').textContent = time;
            document.querySelector('.winStars').textContent = stars;
            if (stars === 1) {
              document.querySelector('.stars-s').textContent = "";
            }
          }
        } else {
          //else if they don't match turn them back to default class after animating
          var height = 124;

          var id1 = setInterval(firstFlipping, 10);

          animating = true;

          let down = true;

          var animationTemp = tempCard;

          function firstFlipping() {
            if (height > 0 && down === true) {
              height--;
              event.target.style.height = height + 'px';
              animationTemp.style.height = height + 'px';
            } else if (height === 124) {
              animationTemp.style.height = '125px';
              event.target.style.height = '125px';
              event.target.classList.remove("open", "show");
              animationTemp.classList.remove("open", "show");
              clearInterval(id1);
              animating = false;
            } else {
              down = false;
              height = height + 2;
              animationTemp.style.height = height + 'px';
              event.target.style.height = height + 'px';
            }
          }

          /*var id2 = setInterval(secondFlipping, 5)

          function secondFlipping() {
            if (height === 125) {
              clearInterval(id2);
            } else {
              height++;
              event.target.style.height = height + 'px';
            }
          }
          event.target.classList.add('open', 'show');
          */
          /*var wait = 100;
          var id = setInterval(waiter, 5);

          function waiter() {
            if (wait === 0) {
              clearInterval(id);
            } else {
              wait--;
              tempCard.classList.add("open", "show");
            }
          }*/
          //tempCard.classList.remove("open", "show");
          //event.target.classList.remove("open", "show");
          //add move and check if the stars need to be changed
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
        //at the end of a turn, end the turn by making inturn false and resetting tempcard
        inturn = false;
        tempCard = null;
      }
    }
  }
} //end flipCard

// shuffling the deck by first taking the deck we are given
const originalDeck = document.getElementsByClassName('deck');
// getting the cards into a HTMLCollection
const cards = originalDeck[0].getElementsByTagName('li');
// make an array to shuffle
let shufflearray = [];
// add each card from the HTMLCollection into the array and shuffle
for (let i = 0; i < cards.length; i++) {
  shufflearray.push(cards.item(i));
}
shuffle(shufflearray);
// make a list to add the cards back to and styling it as a deck
const cardList = document.createElement('ul');
cardList.className = 'deck';
for (let i = 0; i < shufflearray.length; i++) {
  cardList.appendChild(shufflearray[i]);
}
// removing the original deck and adding the new one
originalDeck[0].remove();
document.getElementsByClassName('container')[0].appendChild(cardList);

// starting to listen for a click
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