const cardBoard = document.querySelector('#cardboard');

const imgs = [
  'vue.svg',
  'angular.svg',
  'react.svg',
  'ember.svg',
  'backbone.svg',
  'aurelia.svg',
];

let cardHTML = '';

imgs.forEach(img => {
  cardHTML += `
  <div class="memory-card" data-card="${img}">
  <img class="front-face" src="assets/img/imagens-jogo-da-memoria/${img}">
  <img class="back-face" src="assets/img/imagens-jogo-da-memoria/js-badge.svg">
    </div>`;
});

cardBoard.innerHTML = cardHTML.concat(cardHTML);

//  Fim renderização HTML

const cards = document.querySelectorAll('.memory-card');
let firstCard, secondCard;
let lockCard = false;

function flipCard() {
  if (lockCard === true) return false;
  this.classList.add('flip');
  if (!firstCard) {
    firstCard = this;
    return false;
  }

  secondCard = this;

  checaSeSaoIguais();
}

function checaSeSaoIguais() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  !isMatch ? desabilitaCartas() : resetarCards(isMatch);
}

function desabilitaCartas() {
  lockCard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetarCards();
  }, 1000);
}

function resetarCards(isMatch = false) {
  if (isMatch) {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  }
  [firstCard, secondCard, lockCard] = [null, null, false];
}

(function aleatorio() {
  cards.forEach(card => {
    let rand = Math.floor(Math.random() * 12);
    card.style.order = rand;
  });
})();

cards.forEach(card => {
  card.addEventListener('click', flipCard);
});
