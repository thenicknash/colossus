/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundImage: {
      'fantasy-02': "url('/images/fantasy-background-002.webp')",
      'fantasy-inn': "url('/images/fantasy-inn.jpg')",
      'fantasy-rain-night': "url('/images/fantasy-rain-night.jpeg')",
      'fantasy-shop': "url('/images/fantasy-shop.jpeg')",
      'fantasy-tavern': "url('/images/fantasy-background-tavern.jpg')",
      'fantasy-village-dawn': "url('/images/fantasy-village-dawn.jpeg')",
      'fantasy-wilderness': "url('/images/fantasy-wilderness.avif')",
      'galesburg-map': "url('/images/galesburg-map.png')",
      'jobs-board': "url('/images/jobs-board-background.jpeg')",
    },
    extend: {
      colors: {
        'brown-300': '#a68668',
        'brown-500': '#755c45',
        'brown-700': '#523e2d',
        'brown-900': '#211611',
        'brown-900/25:hover': 'rgba(33, 22, 17, 0.25)',
        'brown-900/50:hover': 'rgba(33, 22, 17, 0.5)',
        'brown-900/75:hover': 'rgba(33, 22, 17, 0.75)',
      }
    },
  },
  plugins: [],
}

