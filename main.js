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

function showHandAnimation() {
  const hand = document.getElementById('magic-hand');
  if (!hand) {
    const handEl = document.createElement('div');
    handEl.id = 'magic-hand';
    handEl.style.cssText = 'position: fixed; width: 80px; height: 80px; background: radial-gradient(circle, var(--gold) 20%, transparent 50%); border-radius: 50%; z-index: 1000; pointer-events: none; opacity: 0; left: 50%; top: 50%; transform: translate(-50%, -50%) scale(0); transition: all 0.5s ease; box-shadow: 0 0 20px var(--gold);';
    document.body.appendChild(handEl);
  } else {
    hand.style.opacity = '1';
    hand.style.transform = 'translate(-50%, -50%) scale(1)';
  }
  setTimeout(() => {
    hand.style.opacity = '0';
    hand.style.transform = 'translate(-50%, -50%) scale(0)';
  }, 800);
}

function getRandomCardIndex() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * 5);
  } while (newIndex === lastCardIndex);

  lastCardIndex = newIndex;
  return newIndex;
}

function shrinkCards(exceptIndex) {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    if (index !== exceptIndex) {
      card.classList.add('shrink');
    }
  });
}

function liftCard(cardIndex) {
  const cards = document.querySelectorAll('.card');
  const selectedCard = cards[cardIndex];
  selectedCard.classList.add('lifted');
  const messageEl = selectedCard.querySelector('.card-message');
  messageEl.style.opacity = '0';
  messageEl.textContent = getRandomMessage();
  setTimeout(() => {
    messageEl.style.transition = 'opacity 0.5s ease';
    messageEl.style.opacity = '1';
  }, 200);
}



function revealCard() {
  const cards = document.querySelectorAll('.card');
  const drawButton = document.getElementById('drawButton');

  // Reset all cards
  cards.forEach(card => {
    card.classList.remove('lifted', 'shrink');
  });

  drawButton.disabled = true;
  drawButton.style.opacity = '0.6';
  drawButton.style.cursor = 'not-allowed';

  showHandAnimation();

  setTimeout(() => {
    const randomCardIndex = getRandomCardIndex();
    shrinkCards(randomCardIndex);
    setTimeout(() => {
      liftCard(randomCardIndex);
      setTimeout(() => {
        drawButton.disabled = false;
        drawButton.style.opacity = '1';
        drawButton.style.cursor = 'pointer';
      }, 1200);
    }, 300);
  }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  const drawButton = document.getElementById('drawButton');
  drawButton.addEventListener('click', revealCard);
});
