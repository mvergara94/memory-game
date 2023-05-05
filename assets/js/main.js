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

// Janela modal **********************************
// Obtém a janela modal  para abri-la
let modal = document.getElementById('myModal');
let closeBtn = document.getElementsByClassName('close')[0];
const form = document.getElementById('myForm');
const header = document.getElementById('header');

// Quando o usuário clicar no botão, abre a janela modal
window.onload = function () {
  modal.style.display = 'block';
};

// Quando o usuário clicar no botão de fechar, fecha a janela modal
closeBtn.onclick = function () {
  modal.style.display = 'none';
};

// Quando o usuário clicar fora da janela, fecha a janela modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

function putName(name = 'Anônimo') {
  header.innerHTML = `Olá ${name}, bom jogo!`;
  return null;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  modal.style.display = 'none';
  const inputNome = document.querySelector('#nome');
  const nome = inputNome.value;

  putName(nome);
});
