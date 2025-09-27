// Fortune Card Data - 30 Funny Fortune Images and Quotes
const FORTUNE_DATA = [
  {
    id: 1,
    image: './assets/fortune/fortune-1.jpg',
    quote: 'Sip your tea slowly… but not so slow it gets cold.'
  },
  {
    id: 2,
    image: './assets/fortune/fortune-2.jpg',
    quote: 'Life is short. Smile while you still have teeth.'
  },
  {
    id: 3,
    image: './assets/fortune/fortune-3.jpg',
    quote: 'Don\'t take life too seriously. No one makes it out alive anyway.'
  },
  {
    id: 4,
    image: './assets/fortune/fortune-4.jpg',
    quote: 'Even Wi-Fi needs a reset sometimes. So do you.'
  },
  {
    id: 5,
    image: './assets/fortune/fortune-5.jpg',
    quote: 'Behind every great person is a cat plotting their downfall.'
  },
  {
    id: 6,
    image: './assets/fortune/fortune-6.jpg',
    quote: 'You\'re not late—you\'re just dramatically on time.'
  },
  {
    id: 7,
    image: './assets/fortune/fortune-7.jpg',
    quote: 'Fortune cookies don\'t lie. Except this one.'
  },
  {
    id: 8,
    image: './assets/fortune/fortune-8.jpg',
    quote: 'Your phone battery lasts longer than most of your relationships.'
  },
  {
    id: 9,
    image: './assets/fortune/fortune-9.jpg',
    quote: 'You will join the gym. The gym will not see you again.'
  },
  {
    id: 10,
    image: './assets/fortune/fortune-10.jpg',
    quote: 'That "free delivery" cost you an extra ₹200 in add-ons is not discount!'
  },
  {
    id: 11,
    image: './assets/fortune/fortune-11.jpg',
    quote: 'The traffic signal ahead knows you\'re late. It will stay red longer.'
  },
  {
    id: 12,
    image: './assets/fortune/fortune-12.jpg',
    quote: 'Your phone will die in the middle of a "very important" meme scroll.'
  },
  {
    id: 13,
    image: './assets/fortune/fortune-13.jpg',
    quote: 'Good news: you\'re the main character. Bad news: it\'s a comedy.'
  },
  {
    id: 14,
    image: './assets/fortune/fortune-14.jpg',
    quote: 'Someone will call during your favorite show. Politely curse.'
  },
  {
    id: 15,
    image: './assets/fortune/fortune-15.jpg',
    quote: 'Someone will brag about savings. Remind them about EMI.'
  },
  {
    id: 16,
    image: './assets/fortune/fortune-16.jpg',
    quote: 'Your talent for ordering food at 2am is unmatched.'
  },
  {
    id: 17,
    image: './assets/fortune/fortune-17.jpg',
    quote: 'You\'re not lazy—you\'re just conserving energy.'
  },
  {
    id: 18,
    image: './assets/fortune/fortune-18.jpg',
    quote: 'A cat is currently living life with more confidence than you. Fix that.'
  },
  {
    id: 19,
    image: './assets/fortune/fortune-19.jpg',
    quote: 'You are 70% water, 30% bad decisions.'
  },
  {
    id: 20,
    image: './assets/fortune/fortune-20.jpg',
    quote: 'The stars tried to predict your future but got distracted by reels.'
  },
  {
    id: 21,
    image: './assets/fortune/fortune-21.jpg',
    quote: 'You are the plot twist nobody asked for.'
  },
  {
    id: 22,
    image: './assets/fortune/fortune-22.jpg',
    quote: 'Your laugh is about to embarrass you in public. Roll with it.'
  },
  {
    id: 23,
    image: './assets/fortune/fortune-23.jpg',
    quote: 'Tomorrow you\'ll open the fridge six times and still eat the same thing.'
  },
  {
    id: 24,
    image: './assets/fortune/fortune-24.jpg',
    quote: 'Your future spouse just scrolled past your profile. Again.'
  },
  {
    id: 25,
    image: './assets/fortune/fortune-25.jpg',
    quote: 'Someone is watching your story for reasons you\'ll never know.'
  },
  {
    id: 26,
    image: './assets/fortune/fortune-26.jpg',
    quote: 'You\'ll catch yourself re-reading old messages like they\'re literature.'
  },
  {
    id: 27,
    image: './assets/fortune/fortune-27.jpg',
    quote: 'Your salary will arrive. So will EMIs. Balance = zero.'
  },
  {
    id: 28,
    image: './assets/fortune/fortune-28.jpg',
    quote: 'You\'ll spend 15 minutes bargaining to save ₹10, then order ₹400 worth of Zomato.'
  },
  {
    id: 29,
    image: './assets/fortune/fortune-29.jpg',
    quote: 'You\'re closer to financial freedom than you think… if you stop online shopping.'
  },
  {
    id: 30,
    image: './assets/fortune/fortune-30.jpg',
    quote: 'Your UPI will fail exactly when the waiter is watching.'
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
