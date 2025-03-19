/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html","./src/**/*.{ts,tsx,js,jsx}" // Adjust paths based on your project structure
  ],
  theme: {
    extend: {
      borderColor: {
        border: 'var(--border)', // Use the CSS variable
      },
    },
  },
  plugins: [],
};