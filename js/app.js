/*
 * Create a list that holds all of your cards
 */

 var allcards = ["fa-bicycle","fa-bomb","fa-anchor","fa-bolt"
                ,"fa-cube","fa-leaf","fa-diamond","fa-paper-plane-o",
                "fa-diamond","fa-paper-plane-o","fa-anchor",
                "fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb"];

    shuffle(allcards); //in first to run when the page reload from restart or the browser

var cardshold = document.querySelector(".deck");
var a=0;

do {
    var allli = document.createElement('li');
    var alli = document.createElement('i');
    allli.classList.add("card");
    alli.classList.add(allcards[a]);
    allli.appendChild(alli);
    alli.classList.add("fa");
    cardshold.appendChild(allli);
     a++;
}
while ( a <allcards.length);

// //to restart the game from restart buttun
var reloadgame = document.getElementsByClassName('restart');
reloadgame[0].addEventListener('click', function () {
	reloadgamee();
});

	function reloadgamee() {
              location.reload();    //fun to restart the game
  }
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;

    }

    return array;
}

// timer who count total seconds
var interval;
var seconds = 0;
document.addEventListener('click', countsecond);
var secondtimer = document.getElementById('seconds-counter');
function countsecond() {
document.removeEventListener('click', countsecond); //to remove the eventlistener and to make second work regularly
 interval = setInterval(function Secondsplus() {
    seconds += 1;
    secondtimer.innerText =  seconds;
}, 1000);
}


var clicks = 0;
    function movecount() //to count the number of moves
    {
        clicks += 1;
        document.getElementById("clicks").innerHTML = clicks;
    };


    var stararry1 = document.querySelectorAll(".score-panel .stars li i"); //to show the stars on the game
    var stararry2 = document.querySelectorAll(".resultback .stars li i");   //to show the stars on the reuslt box
    //to count the starts
    function Ratingstar() {
        if (clicks ==15) {
          stararry1[0].classList.replace("fa-star", "fa-star-o");
          stararry2[0].classList.replace("fa-star", "fa-star-o");

        } else if (clicks == 20) {
          stararry1[1].classList.replace("fa-star", "fa-star-o");
          stararry2[1].classList.replace("fa-star", "fa-star-o");
        } else if (clicks == 25) {
          stararry1[2].classList.replace("fa-star", "fa-star-o");
          stararry2[2].classList.replace("fa-star", "fa-star-o");
        };
    }
//to stop time
function stopinterval(){
  clearInterval(interval);
  return false;
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



var allofcards = document.querySelectorAll('.card');
var congratMessage = document.querySelector('.resultback');
var cardshow = [] ;
var moves = 0;
var     n=0;
allofcards.forEach(function(card){
  card.addEventListener('click' , function(e) {
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') ){
       cardshow.push(card);
     card.classList.add('open' , 'show');
       if(cardshow.length == 2) {
       movecount();
if(cardshow[0].firstElementChild.className == cardshow[1].firstElementChild.classList) //to check if they are matched
 {
           cardshow [0].classList.add('match');
           cardshow [0].classList.add('open');
           cardshow [0].classList.add('show');
           cardshow [1].classList.add('match');
           cardshow [1].classList.add('open');
           cardshow [1].classList.add('show');
           n=n+1;
           if(n == 8) // to check all cards matched or not if matched print result
           {
             stopinterval();
             congratMessage.style.display = 'block';
             var movescountt = document.getElementsByClassName('movess');
  	       	movescountt[0].innerHTML = clicks ;
            var timecountt = document.getElementsByClassName('timerr');
           timecountt[0].innerHTML = seconds ;
           }
          cardshow = [];
         } else  {
         setTimeout (function() //if the 2 cards unmatched close cards
          {
         cardshow.forEach(function(card) {
           card.classList.remove('open','show');
           var x=x+1;
           console.log(x);
         });
           cardshow = [];
         }, 200);

                }
                Ratingstar();
             }
          }
    });
});
