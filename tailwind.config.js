/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.js", "./views/**/*.ejs"],
  theme: {
    extend: {
      fontSize: {
        xxs: "8px",
        "70px": "70px"
      },
      fontFamily: {
        mono: "monospace",
        arial: "Arial"
      },
      maxWidth: {
        600: "600px",
        "90%": "90%",
        "95%": "95%"
      },
      width: {
        40: "168px",
        "90%": "90%",
        "95%": "95%",
      },
      height: {
        40: "168px",
        "70dvh": "70dvh",
        400: "385px"
      },
    },
  },
  plugins: [],
}

