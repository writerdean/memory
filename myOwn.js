const allCards = [
  {name: 'Ali', img: 'img/ali.jpg'},
  {name: 'aub_icecream', img: 'img/aub_icecream.jpg'},
  {name: 'Barb', img: 'img/Barb.jpg'},
  {name: 'city_sunnies', img: 'img/city_sunnies.jpg'},
  {name: 'DeeDee', img: 'img/DeeDee.jpg'},
  {name: 'Family', img: 'img/Family.jpg'},
  {name: 'guitar', img: 'img/guitar.jpg'} ,
  {name: 'Hunter', img: 'img/Hunter.jpg'},
  {name: 'jen_joe_sunnies', img: 'img/jen_joe_sunnies.jpg'},
  {name: 'Jen', img: 'img/Jen.jpg'},
  {name: 'Makena', img: 'img/Makena.jpg'},
  {name: 'Scott', img: 'img/Scott.jpg'},
  {name: 'Denise', img: 'img/Denise.jpg'},
  {name: 'Chris', img: 'img/Chris.jpg'}
]

  const gameArray = []
  for (let i = 0; i < 12; i++) {
  let rand = Math.floor(Math.random() * allCards.length)
  gameArray.push(allCards.splice(allCards[rand], 1))
  }
let gameGrid = gameArray.concat(gameArray);
gameGrid.sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let totalGuesses = 0;
let previousTarget = null;
let delay = 1200;

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);
gameGrid.forEach(item=> {

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = item[0].name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${item[0].img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const match = () => {
  let selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
}

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
    card.classList.remove('back');

  });
};

grid.addEventListener('click', function (event) {
  let clicked = event.target;
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }
    if (firstGuess !== '' && secondGuess !== '') {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
      } else {
        setTimeout(resetGuesses, delay);
      }
      totalGuesses++
      document.getElementById('guesses').innerText = totalGuesses;
    }
    previousTarget = clicked;
  }
});