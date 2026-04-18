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
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.classList.add('shuffle');
    setTimeout(() => {
      card.classList.remove('shuffle');
    }, 500);
  });
}

function revealCard() {
  console.log('DEBUG: revealCard started');
  try {
// Reset previous state
    document.querySelector('.cards-container').classList.remove('reveal');
    const title = document.querySelector('.title');
    const instructions = document.querySelector('.instructions');
    title.style.opacity = '1';
    title.style.visibility = 'visible';
    if (instructions) {
      instructions.style.opacity = '1';
      instructions.style.visibility = 'visible';
    }

    const drawButton = document.getElementById('drawButton');
    const container = document.querySelector('.cards-container');
    const cards = document.querySelectorAll('.card');
    
    // Clear all states first
    cards.forEach(card => {
      const msg = card.querySelector('.card-message');
      if (msg) msg.textContent = '';
      card.classList.remove('flipped', 'hidden', 'fade-out');
    });

    drawButton.disabled = true;
    drawButton.style.opacity = '0.6';
    drawButton.style.cursor = 'not-allowed';
    
    shuffleCards();

    setTimeout(() => {
      const randomCardIndex = getRandomCardIndex();
      const selectedCard = cards[randomCardIndex];
      const messageEl = selectedCard.querySelector('.card-message');
      const message = getRandomMessage();
      messageEl.textContent = message;
      console.log('DEBUG: Message set:', message);

      // Flip selected first
      selectedCard.classList.add('flipped');
      
      // Then fade out others
      setTimeout(() => {
        cards.forEach((card, index) => {
          if (index !== randomCardIndex) {
            card.style.display = 'none';
            card.classList.add('fade-out');
          }
        });
      }, 300);

      console.log('DEBUG: Card flipped, index:', randomCardIndex);
      
      document.querySelector('.cards-container').classList.add('reveal');
      
      // Hide title/instructions after reveal
      setTimeout(() => {
        title.style.opacity = '0';
        title.style.visibility = 'hidden';
        if (instructions) {
          instructions.style.opacity = '0';
          instructions.style.visibility = 'hidden';
        }
      }, 800);
      
      // Reset button after full animation
      setTimeout(() => {
        drawButton.disabled = false;
        drawButton.style.opacity = '1';
        drawButton.style.cursor = 'pointer';
      }, 6000);
      
    }, 1000);
  } catch (error) {
    console.error('Reveal card error:', error);
    const drawButton = document.getElementById('drawButton');
    if (drawButton) {
      drawButton.disabled = false;
      drawButton.style.opacity = '1';
      drawButton.style.cursor = 'pointer';
    }
    alert('Error revealing card. Check console.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const drawButton = document.getElementById('drawButton');
  const audio = document.getElementById('backgroundMusic');
  
  audio.volume = 0.3;
  
  window.addEventListener('beforeunload', () => {
    audio.pause();
  });
  
  drawButton.addEventListener('click', () => {
    console.log('DEBUG: Pick a message button clicked');
    // Play audio on first user interaction (fixes autoplay issues)
    audio.play().catch(e => console.log('Audio play failed:', e));
    revealCard();
  });
});

