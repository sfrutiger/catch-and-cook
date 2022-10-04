module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "400px",
      md: "500px",
    },
    extend: {
      fontFamily: {
        header: ["Caveat"],
      },
      boxShadow: {
        "2xl": "0 0 20px -5px black",
        "3xl": "0 0 20px 2px black",
      },
      backgroundColor: {
        primary: "black",
        secondary: "#202020",
        tertiary: "#282828",
        quaternary: "#454545",
        quinary: "#888895",
        light: "#888895",
      },
      borderColor: {
        secondary: "#454545",
      },
      textColor: {
        dark: "#191919",
        light: "white",
      },
      placeholderColor: {
        light: "#CDCDCD",
      },
    },
  },
  plugins: [],
};
