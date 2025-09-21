// Fortune Card Data - 30 Fortune Images and Quotes
const FORTUNE_DATA = [
  {
    id: 1,
    image: './assets/fortune/fortune-1.png',
    quote: 'Sip your tea slowly. Life is savoured, not rushed.'
  },
  {
    id: 2,
    image: './assets/fortune/fortune-2.png',
    quote: 'Krishna whispers: act, and let go of the fruits of action.'
  },
  {
    id: 3,
    image: './assets/fortune/fortune-3.png',
    quote: 'The horizon exists to remind you that life is always more. Keep moving, exploring, and seeking.'
  },
  {
    id: 4,
    image: './assets/fortune/fortune-4.png',
    quote: 'Even shadows teach us the value of light. Do not fear darkness, for it carries wisdom.'
  },
  {
    id: 5,
    image: './assets/fortune/fortune-5.png',
    quote: 'The wind changes for no one. Shift with it and discover new directions.'
  },
  {
    id: 6,
    image: './assets/fortune/fortune-6.png',
    quote: 'Act with devotion, not for reward. The universe honours those who give freely.'
  },
  {
    id: 7,
    image: './assets/fortune/fortune-7.png',
    quote: 'Pleasure and pain are fleeting. See beyond them to find the eternal self.'
  },
  {
    id: 8,
    image: './assets/fortune/fortune-8.png',
    quote: 'Step off the familiar path. The unknown is where growth begins.'
  },
  {
    id: 9,
    image: './assets/fortune/fortune-9.png',
    quote: 'Life\'s spark hides in new experiences. Seek them relentlessly.'
  },
  {
    id: 10,
    image: './assets/fortune/fortune-10.png',
    quote: 'The quiet moments are teachers. Listen and you will learn who you truly are.'
  },
  {
    id: 11,
    image: './assets/fortune/fortune-11.png',
    quote: 'The heart learns patience when it beats in empty rooms.'
  },
  {
    id: 12,
    image: './assets/fortune/fortune-12.png',
    quote: 'The more we dwell on the positive, the less the negative can touch us.'
  },
  {
    id: 13,
    image: './assets/fortune/fortune-13.png',
    quote: 'We\'re born alone, we live alone, we die alone. Only through our love and friendship can we create the illusion that we are not alone.'
  },
  {
    id: 14,
    image: './assets/fortune/fortune-14.png',
    quote: 'Be good to yourself first, then to others.'
  },
  {
    id: 15,
    image: './assets/fortune/fortune-15.png',
    quote: 'Thinking too much can make it difficult to act. Just do it, and it is done.'
  },
  {
    id: 16,
    image: './assets/fortune/fortune-16.png',
    quote: 'One word of encouragement, said with kindness and hope, can change a person\'s future.'
  },
  {
    id: 17,
    image: './assets/fortune/fortune-17.png',
    quote: 'Stop shouting "what if" and just take a leap of faith.'
  },
  {
    id: 18,
    image: './assets/fortune/fortune-18.png',
    quote: 'A smile is contagious. Share it generously.'
  },
  {
    id: 19,
    image: './assets/fortune/fortune-19.png',
    quote: 'Be where you are, otherwise you will miss your life.'
  },
  {
    id: 20,
    image: './assets/fortune/fortune-20.png',
    quote: 'No one has ever become poor by giving.'
  },
  {
    id: 21,
    image: './assets/fortune/fortune-21.png',
    quote: 'Life is what happens when you\'re busy making other plans.'
  },
  {
    id: 22,
    image: './assets/fortune/fortune-22.png',
    quote: 'Your time is limited, so don\'t waste it living someone else\'s life.'
  },
  {
    id: 23,
    image: './assets/fortune/fortune-23.png',
    quote: 'Decide what kind of life you really want, and then say no to everything that isn\'t that.'
  },
  {
    id: 24,
    image: './assets/fortune/fortune-24.png',
    quote: 'Sometimes you just have to stop being scared and just go for it. Either it will work out, or it won\'t.'
  },
  {
    id: 25,
    image: './assets/fortune/fortune-25.png',
    quote: 'Life is tough, but so are you.'
  },
  {
    id: 26,
    image: './assets/fortune/fortune-26.png',
    quote: 'Like the moon, we must go through phases of emptiness to feel full again.'
  },
  {
    id: 27,
    image: './assets/fortune/fortune-27.png',
    quote: 'Sometimes you just have to wish someone the best and let them go.'
  },
  {
    id: 28,
    image: './assets/fortune/fortune-28.png',
    quote: 'Life goes on. It passes some in the distance, and for those who wait, it circles back.'
  },
  {
    id: 29,
    image: './assets/fortune/fortune-29.png',
    quote: 'Stars can\'t shine without darkness.'
  },
  {
    id: 30,
    image: './assets/fortune/fortune-30.png',
    quote: 'In a world full of trends, remain classic.'
  }
];

// Function to get a random fortune
function getRandomFortune() {
  const randomIndex = Math.floor(Math.random() * FORTUNE_DATA.length);
  return FORTUNE_DATA[randomIndex];
}

// Function to get a specific fortune by ID
function getFortuneById(id) {
  return FORTUNE_DATA.find(fortune => fortune.id === id);
}

// Function to get all fortunes
function getAllFortunes() {
  return FORTUNE_DATA;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FORTUNE_DATA,
    getRandomFortune,
    getFortuneById,
    getAllFortunes
  };
}
