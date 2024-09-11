/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.html"],
  theme: {
    extend: {
      backgroundImage: {
        'unchecked': "url('assets/unchecked.pgn')",
        'checked': "url('assets/checked.pgn')",
      }
    },
  },
  plugins: [],
}

