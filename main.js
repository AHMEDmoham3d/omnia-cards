const tarotMessages = [
  "Come back to yourself, You are safe to be you.",
  "You are enough, exactly as you are.",
  "Release what no longer serve you",
  "Healing is happening, even if you can't see it",
  "Let it go with love",
  "You are allowed to start again",
  "Trust your inner voice. You already know the answer",
  "This is your time to bloom",
  "A new chapter is beginning",
  "Allow the change to happen, it will lead you to something better",
  "Say yes to the new beginnings",
  "All endings are also beginings",
  "You attract what you believe you deserve",
  "Your energy creates your reality",
  "You are the creator of your life.",
  "Choose yourself first",
  "Your energy creates your reality",
  "A hidden truth will soon reveal itself, be ready to listen",
  "Your courage will illuminate the darkest corners of doubt",
  "What you release now will make space for profound transformation",
  "Trust the rhythm of your journey, even when the melody seems unclear",
  "The seeds you planted in silence are beginning to bloom",
  "A door you thought was closed is opening for you now",
  "Your presence alone shifts the energy of every room you enter",
  "What feels like an ending is actually a beautiful new beginning",
  "Your vulnerability is not weakness, it is your greatest strength",
  "The moment you release the control, everything falls into place",
  "What you believe about yourself is becoming your reality",
  "Your light shines brightest when you stop dimming it for others",
  "Trust that you are exactly where you need to be at this moment"
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

  // Reset to 5 cards (no Book Now buttons)
  container.innerHTML = `
<div class="card" data-card="0">
  <div class="card-inner">
    <div class="card-back">
      <div class="card-pattern"></div>
      <div class="card-symbol">✦</div>
    </div>
    <div class="card-front">
      <div class="card-message"></div>
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
    </div>
  </div>
</div>`;

  const cards = document.querySelectorAll('.card');
  drawButton.disabled = true;
  drawButton.style.opacity = '0.6';
  drawButton.style.cursor = 'not-allowed';
  
  // Hide button early during animation
  drawButton.style.display = 'none';

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
    
    // Hide draw button during message display
    drawButton.style.display = 'none';
    
    document.querySelector('.cards-container').classList.add('reveal');

    // Button stays hidden permanently after first reveal
  }, 700);
}

document.addEventListener('DOMContentLoaded', () => {
  const drawButton = document.getElementById('drawButton');
  const audio = document.getElementById('backgroundMusic');
  
  audio.volume = 0.3;
  audio.load();
  
  const playMusic = () => {
    audio.play().catch(e => {
      document.addEventListener('click', playMusic, {once: true});
      document.addEventListener('touchstart', playMusic, {once: true});
    });
  };
  playMusic();
  
  window.addEventListener('beforeunload', () => {
    audio.pause();
  });
  
  drawButton.addEventListener('click', revealCard);
});

