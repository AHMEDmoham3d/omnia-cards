import './style.css'

const tarotMessages = [
  "The path you seek is already unfolding beneath your feet.",
  "A hidden truth will soon reveal itself—be ready to listen.",
  "The universe whispers secrets to those who dare to be still.",
  "Your courage will illuminate the darkest corners of doubt.",
  "What you release now will make space for profound transformation.",
  "Trust the rhythm of your journey, even when the melody seems unclear.",
  "An unexpected ally will appear when you need guidance most.",
  "The answer you seek lives quietly within your own heart.",
  "Embrace the mystery, for not all that glitters requires explanation.",
  "Your intuition is a compass—follow it without question.",
  "The seeds you planted in silence are beginning to bloom.",
  "A door you thought was closed is merely waiting for your touch.",
  "Release the need for certainty and watch miracles unfold.",
  "Your presence alone shifts the energy of every room you enter.",
  "What feels like an ending is actually a beautiful new beginning.",
  "The stars have aligned in ways you cannot yet perceive.",
  "Your vulnerability is not weakness—it is your greatest strength.",
  "Ancient wisdom flows through your veins, awakening now.",
  "The moment you surrender control, everything falls into place.",
  "A message from the beyond seeks your attention—be open.",
  "Your dreams hold the keys to mysteries your mind cannot solve.",
  "The universe is conspiring in your favor, even in the shadows.",
  "What you believe about yourself is becoming your reality.",
  "A cycle is completing—honor what was, embrace what comes.",
  "Your light shines brightest when you stop dimming it for others.",
  "The veil between worlds grows thin—communication deepens now.",
  "Trust that you are exactly where you need to be at this moment.",
  "Magic happens when you align your actions with your soul's truth.",
  "A profound realization awaits you in the silence between thoughts.",
  "You are being guided by forces far greater than you can imagine."
];

let usedMessages = [];
let lastCardIndex = -1;

function getRandomMessage() {
  if (usedMessages.length === tarotMessages.length) {
    usedMessages = [];
  }

  let availableMessages = tarotMessages.filter((msg, index) => !usedMessages.includes(index));
  let randomIndex = Math.floor(Math.random() * availableMessages.length);
  let messageIndex = tarotMessages.indexOf(availableMessages[randomIndex]);

  usedMessages.push(messageIndex);
  return tarotMessages[messageIndex];
}

function getRandomCardIndex() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * 5);
  } while (newIndex === lastCardIndex);

  lastCardIndex = newIndex;
  return newIndex;
}

function shuffleCards() {
  const cards = document.querySelectorAll('.card:not(.hidden)');
  cards.forEach(card => {
    card.classList.add('shuffle');
    setTimeout(() => {
      card.classList.remove('shuffle');
    }, 500);
  });
}

function revealCard() {
  const drawButton = document.getElementById('drawButton');
  const container = document.querySelector('.cards-container');

  // Reset to 5 cards
  container.innerHTML = `
    <div class="card" data-card="0">
      <div class="card-inner">
        <div class="card-back">
          <div class="card-pattern"></div>
          <div class="card-symbol">✦</div>
        </div>
        <div class="card-front">
          <div class="card-message"></div>
          <button class="card-book-btn">Pick a message</button>
        </div>
      </div>
    </div>
    <div class="card" data-card="1">
      <div class="card-inner">
        <div class="card-back">
          <div class="card-pattern"></div>
          <div class="card-symbol">✦</div>
        </div>
        <div class="card-front">
          <div class="card-message"></div>
          <button class="card-book-btn">Pick a message</button>
        </div>
      </div>
    </div>
    <div class="card" data-card="2">
      <div class="card-inner">
        <div class="card-back">
          <div class="card-pattern"></div>
          <div class="card-symbol">✦</div>
        </div>
        <div class="card-front">
          <div class="card-message"></div>
          <button class="card-book-btn">Pick a message</button>
        </div>
      </div>
    </div>
    <div class="card" data-card="3">
      <div class="card-inner">
        <div class="card-back">
          <div class="card-pattern"></div>
          <div class="card-symbol">✦</div>
        </div>
        <div class="card-front">
          <div class="card-message"></div>
          <button class="card-book-btn">Pick a message</button>
        </div>
      </div>
    </div>
    <div class="card" data-card="4">
      <div class="card-inner">
        <div class="card-back">
          <div class="card-pattern"></div>
          <div class="card-symbol">✦</div>
        </div>
        <div class="card-front">
          <div class="card-message"></div>
          <button class="card-book-btn">Pick a message</button>
        </div>
      </div>
    </div>
  `;

  const cards = document.querySelectorAll('.card');
  drawButton.disabled = true;
  drawButton.style.opacity = '0.6';
  drawButton.style.cursor = 'not-allowed';

  shuffleCards();

  setTimeout(() => {
    const randomCardIndex = getRandomCardIndex();
    const selectedCard = cards[randomCardIndex];
    const messageEl = selectedCard.querySelector('.card-message');
    messageEl.textContent = getRandomMessage();

    // Hide all except selected and flip it
    cards.forEach((card, index) => {
      if (index !== randomCardIndex) {
        card.classList.add('hidden');
      }
    });
    selectedCard.classList.add('flipped');
    document.querySelector('.cards-container').classList.add('reveal');

    setTimeout(() => {
      drawButton.disabled = false;
      drawButton.style.opacity = '1';
      drawButton.style.cursor = 'pointer';
    }, 1200);
  }, 700);
}

document.addEventListener('DOMContentLoaded', () => {
  const drawButton = document.getElementById('drawButton');
  drawButton.addEventListener('click', revealCard);
});
