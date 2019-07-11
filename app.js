// Display 12 cards.
const cardsArray = [
  {name: 'ali_cupcake', img: 'img/ali_cupcake.jpg'},
  {name: 'ali_hula', img: 'img/ali_hula.jpg'},
  {name: 'ali_joe', img: 'img/ali_joe.jpg'},
  {name: 'ali_wings', img: 'img/ali_wings.jpg'},
  {name: 'aub_cupcake', img: 'img/aub_cupcake.jpg'},
  {name: 'city_sunnies', img: 'img/city_sunnies.jpg'},
  {name: 'Family', img: 'img/Family.jpg'},
  {name: 'family2', img: 'img/family2.jpg'},
  {name: 'girls', img: 'img/girls.jpg'},
  {name: 'go_to_face', img: 'img/go_to_face.jpg'},
  {name: 'grandpa', img: 'img/grandpa.jpg'},
  {name: 'guitar', img: 'img/guitar.jpg'},
  {name: 'jen_aub_al', img: 'img/jen_aub_al.jpg'},
  {name: 'jen_aub_al2', img: 'img/jen_aub_al2.jpg'},
  {name: 'jen_joe_sunnies', img: 'img/jen_joe_sunnies.jpg'},
  {name: 'joe_jen', img: 'img/joe_jen.jpg'},
  {name: 'tongues', img: 'img/tongues.jpg'}
]

let gameGrid = cardsArray.concat(cardsArray);
gameGrid.sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = item.name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${item.img})`;

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
  });
};

grid.addEventListener('click', function (event) {
  let clicked = event.target;
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected')) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }
    if (firstGuess !== '' && secondGuess !== '') {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
      } else {
        setTimeout(resetGuesses, delay);
      }
    }
    previousTarget = clicked;
  }
});