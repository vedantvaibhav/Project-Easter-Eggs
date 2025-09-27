// Fortune Card Data - 30 Funny Fortune Images and Quotes
const FORTUNE_DATA = [
  {
    id: 1,
    image: './assets/fortune/fortune-1.png',
    quote: 'Sip your tea slowly… but not so slow it gets cold.'
  },
  {
    id: 2,
    image: './assets/fortune/fortune-2.png',
    quote: 'Stop waiting for a sign. This is it. Seriously, go.'
  },
  {
    id: 3,
    image: './assets/fortune/fortune-3.png',
    quote: 'Life is short. Smile while you still have teeth.'
  },
  {
    id: 4,
    image: './assets/fortune/fortune-4.png',
    quote: 'Even Wi-Fi needs a reset sometimes. So do you.'
  },
  {
    id: 5,
    image: './assets/fortune/fortune-5.png',
    quote: 'The early bird gets the worm… but the second mouse gets the cheese.'
  },
  {
    id: 6,
    image: './assets/fortune/fortune-6.png',
    quote: 'Be yourself. Unless you can be a dragon, then be a dragon.'
  },
  {
    id: 7,
    image: './assets/fortune/fortune-7.png',
    quote: 'Some doors close for a reason. Others close because you forgot your keys.'
  },
  {
    id: 8,
    image: './assets/fortune/fortune-8.png',
    quote: 'Patience is a virtue… but coffee is faster.'
  },
  {
    id: 9,
    image: './assets/fortune/fortune-9.png',
    quote: 'Stars can\'t shine without darkness. Or electricity. Pay the bill.'
  },
  {
    id: 10,
    image: './assets/fortune/fortune-10.png',
    quote: 'A balanced diet means a cookie in each hand.'
  },
  {
    id: 11,
    image: './assets/fortune/fortune-11.png',
    quote: 'Don\'t take life too seriously. No one makes it out alive anyway.'
  },
  {
    id: 12,
    image: './assets/fortune/fortune-12.png',
    quote: 'You miss 100% of the naps you don\'t take.'
  },
  {
    id: 13,
    image: './assets/fortune/fortune-13.png',
    quote: 'Behind every great person is a cat plotting their downfall.'
  },
  {
    id: 14,
    image: './assets/fortune/fortune-14.png',
    quote: 'Happiness is like Wi-Fi. Better when you share the password.'
  },
  {
    id: 15,
    image: './assets/fortune/fortune-15.png',
    quote: 'Remember: even Google doesn\'t have all the answers.'
  },
  {
    id: 16,
    image: './assets/fortune/fortune-16.png',
    quote: 'The road to success is under construction. Detour ahead.'
  },
  {
    id: 17,
    image: './assets/fortune/fortune-17.png',
    quote: 'If plan A fails, don\'t worry. The alphabet has 25 more letters.'
  },
  {
    id: 18,
    image: './assets/fortune/fortune-18.png',
    quote: 'You\'re not late—you\'re just dramatically on time.'
  },
  {
    id: 19,
    image: './assets/fortune/fortune-19.png',
    quote: 'Chocolate doesn\'t ask questions. Chocolate understands.'
  },
  {
    id: 20,
    image: './assets/fortune/fortune-20.png',
    quote: 'Dance like nobody\'s watching. But check for cameras first.'
  },
  {
    id: 21,
    image: './assets/fortune/fortune-21.png',
    quote: 'If opportunity doesn\'t knock, build a doorbell.'
  },
  {
    id: 22,
    image: './assets/fortune/fortune-22.png',
    quote: 'A clean house is a sign of a broken computer.'
  },
  {
    id: 23,
    image: './assets/fortune/fortune-23.png',
    quote: 'When nothing goes right… go left.'
  },
  {
    id: 24,
    image: './assets/fortune/fortune-24.png',
    quote: 'The best way to predict the future is to order dessert.'
  },
  {
    id: 25,
    image: './assets/fortune/fortune-25.png',
    quote: 'Don\'t follow your dreams—chase them with running shoes.'
  },
  {
    id: 26,
    image: './assets/fortune/fortune-26.png',
    quote: 'Life is too short for matching socks.'
  },
  {
    id: 27,
    image: './assets/fortune/fortune-27.png',
    quote: 'Common sense is like deodorant. The people who need it most never use it.'
  },
  {
    id: 28,
    image: './assets/fortune/fortune-28.png',
    quote: 'Failure is just success in progress… with extra paperwork.'
  },
  {
    id: 29,
    image: './assets/fortune/fortune-29.png',
    quote: 'Age is merely the number of years the world has enjoyed you.'
  },
  {
    id: 30,
    image: './assets/fortune/fortune-30.png',
    quote: 'Fortune cookies don\'t lie. Except this one.'
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
