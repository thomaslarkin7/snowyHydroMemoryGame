//Memory Game: T Larkin

//Make a list of all memory card elements and store this inside a constant named 'cards'
//const cards = document.querySelectorAll('.memory-card');
let cards = document.querySelectorAll('.memory-card');
//console.log(cards.length);
//console.log(cards);
//cards.splice(4, 2);
//console.log(cards.length);

let numCards = 20;
let matchedCards = 0;

let hasFlippedCard = false;
//once two cards have been clicked we need to 'lock' the board to prevent further clicking
let lockBoard = false;
let firstCard, secondCard;
let cardValue;

//MODAL VARIABLES
//Taken from this webpage https://sabe.io/tutorials/how-to-create-modal-popup-box
var modal = document.querySelector(".modal");

// Get the modal
var modals = document.getElementsByClassName('modal');
var imgBs = document.getElementsByClassName('imgB');

//var trigger = document.querySelector(".trigger");
var closeButtons = document.getElementsByClassName('close-button');
var closeButton = document.querySelector(".close-button");
console.log(closeButtons);
console.log(closeButtons[0]);

cards.forEach(card => card.addEventListener('click', flipCard));

//Now loop through this list and attach an 'Event Listener' to each card. We are going to
//listen for a 'click' event and when this fires, we will run the 'card flip' function
//Begin function flipCard
function flipCard(){
    //if the lockBoard variable is true, do not execute the rest of the code 
    if (lockBoard) return;
    //to prevent the same card from being clicked twice and locking out the game
    if(this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlippedCard){
        //first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    } 
    // second click
    hasFlippedCard = false;
    secondCard = this;
    checkForMatch();

}//end function flipCard

function checkForMatch(){
    //do the cards match
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch == true){
        
        //console.log('We Have a Match');
        //if the cards that are matched are the Australia cards, toggle the 'Australia' modal
        //if (firstCard.dataset.framework == 'australia'){
            cardValue = firstCard.dataset.framework;
            if (cardValue == 'DLeckie'){setTimeout(toggleModalA, 1500);}
            else if (cardValue == 'PMeredith'){setTimeout(toggleModalV, 1500);}
            else if (cardValue == 'HJeromin'){setTimeout(toggleModalAn, 1500);}
            else if (cardValue == 'IBotka'){setTimeout(toggleModalE, 1500);}
            else if (cardValue == 'KSinkevicius'){setTimeout(toggleModalB, 1500);}
            else if (cardValue == 'AGlavica'){setTimeout(toggleModalR, 1500);}
            else if (cardValue == 'JPeska'){setTimeout(toggleModalH, 1500);}
            else if (cardValue == 'RLodge'){setTimeout(toggleModalAp, 1500);}
            else if (cardValue == 'GVanWezel'){setTimeout(toggleModalAu, 1500);}
            else if (cardValue == 'ABeranek'){setTimeout(toggleModalD, 1500);}
            else{
                console.log('Congratulations, you are done!')
            }

        //}
        //console.log(modals);
    }

    //ternary operator
    isMatch ? disableCards() : unflipCards();
}//end function checkForMatch

//console.log(imgBs);
    //If the cards matched are the Australia Cards, toggle 'Australia' Modal


function toggleModalA(){modals[0].classList.toggle("show-modal");}
function toggleImgA(){imgBs[0].style.visibility = "visible";}

function toggleModalV(){modals[1].classList.toggle("show-modal");}
function toggleImgV(){imgBs[1].style.visibility = "visible";}

function toggleModalAn(){modals[2].classList.toggle("show-modal");}
function toggleImgAn(){imgBs[2].style.visibility = "visible";}

function toggleModalE(){modals[3].classList.toggle("show-modal");}
function toggleImgE(){imgBs[3].style.visibility = "visible";}

function toggleModalB(){modals[4].classList.toggle("show-modal");}
function toggleImgB(){imgBs[4].style.visibility = "visible";}

function toggleModalR(){modals[5].classList.toggle("show-modal");}
function toggleImgR(){imgBs[5].style.visibility = "visible";}

function toggleModalH(){modals[6].classList.toggle("show-modal");}
function toggleImgH(){imgBs[6].style.visibility = "visible";}

function toggleModalAp(){modals[7].classList.toggle("show-modal");}
function toggleImgAp() {imgBs[7].style.visibility = "visible";}

function toggleModalAu(){modals[8].classList.toggle("show-modal");}
function toggleImgAu(){imgBs[8].style.visibility = "visible";}

function toggleModalD(){modals[9].classList.toggle("show-modal");}
function toggleImgD(){imgBs[9].style.visibility = "visible";}


function windowOnClick(event) {
    if (event.target === modal && cardValue == 'DLeckie') {toggleModalA();}
    if (event.target === modal && cardValue == 'PMeredith') {toggleModalV();}
    if (event.target === modal && cardValue == 'HJeromin') {toggleModalAn();}
    if (event.target === modal && cardValue == 'IBotka') {toggleModalE();}
    if (event.target === modal && cardValue == 'KSinkevicius') {toggleModalB();}
    if (event.target === modal && cardValue == 'AGlavica') {toggleModalR();}
    if (event.target === modal && cardValue == 'JPeska') {toggleModalH();}
    if (event.target === modal && cardValue == 'RLodge') {toggleModalAp();}
    if (event.target === modal && cardValue == 'GVanWezel') {toggleModalAu();}
    if (event.target === modal && cardValue == 'ABeranek') {toggleModalD();}
}

function disableCards(){
    //it's a match
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchedCards = matchedCards += 2;
    if (matchedCards == 20){
        document.getElementById('buttonQuiz').style.display = 'block';
    }
        console.log(matchedCards);
    resetBoard();
} //end function disableCards

function unflipCards(){
    lockBoard = true;
    //not a match
    //the numeral value in this setTimeout sets the amount of time for the 
    //card to remain visible on screen before being flipped over again
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);   
} //end function unflipCards

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
} //end function resetBoard

(function shuffle(){
    var i;
    //document.getElementById("wohoo").style.display = "none";
    for (i=0; i<cards.length; i++){
        let randomPos = Math.floor(Math.random()*12);
        cards[i].style.order = randomPos;
        //cards[i].style.display = 'none';
    }
    
    cards.forEach(card => {
        //let randomPos = Math.floor(Math.random()*12);
        //card.style.order = randomPos;
    });
})();
//these extra parenthesis at the end make this function an immediately 
//invoked function expression

function off(){
    document.getElementById("loadOverlay").style.display = "none";
    document.getElementById("navBottom").style.display = "flex";
    
}


//MODAL LISTENERS
//TAKEN FROM this webpage https://sabe.io/tutorials/how-to-create-modal-popup-box
//trigger.addEventListener("click", toggleModal);
closeButtons[0].addEventListener("click", toggleModalA); //Close Button A
closeButtons[0].addEventListener("click", toggleImgA); //Img A to appear

closeButtons[1].addEventListener("click", toggleModalV); //Close Button V
closeButtons[1].addEventListener("click", toggleImgV); //Img V to appear

closeButtons[2].addEventListener("click", toggleModalAn); //Close Button An
closeButtons[2].addEventListener("click", toggleImgAn); //Image An to appear

closeButtons[3].addEventListener("click", toggleModalE); //Close Button E
closeButtons[3].addEventListener("click", toggleImgE); //Img E to appear

closeButtons[4].addEventListener("click", toggleModalB); //Close Button B
closeButtons[4].addEventListener("click", toggleImgB); //Img B to appear

closeButtons[5].addEventListener("click", toggleModalR); //Close Button R
closeButtons[5].addEventListener("click", toggleImgR); //Img R to appear

closeButtons[6].addEventListener("click", toggleModalH); //Close Button H
closeButtons[6].addEventListener("click", toggleImgH); //Img H to appear

closeButtons[7].addEventListener("click", toggleModalAp); //Close Button Ap
closeButtons[7].addEventListener("click", toggleImgAp); //Img Ap to appear

closeButtons[8].addEventListener("click", toggleModalAu); //Close Button Au
closeButtons[8].addEventListener("click", toggleImgAu); //Img R to appear Au

closeButtons[9].addEventListener("click", toggleModalD); //Close Button D
closeButtons[9].addEventListener("click", toggleImgD); //Img D to appear

window.addEventListener("click", windowOnClick);
