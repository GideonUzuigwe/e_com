/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.js", "./views/**/*.ejs"],
  theme: {
    extend: {
      fontSize: {
        xxs: "8px"
      },
      rotate: {
        360: "360deg",
        270: "270deg"
      }
    },
  },
  plugins: [],
}

