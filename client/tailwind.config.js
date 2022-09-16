module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "430px",
    },
    extend: {
      fontFamily: {
        header: ["Caveat"],
      },
      boxShadow: {
        "3xl": "0 0 50px 10px rgba(0, 0, 0, 0.2)",
      },
      backgroundColor: {
        primary: "black",
        secondary: "#191919",
        tertiary: "#222222",
        quaternary: "#454545",
        quinary: "#bbbbbb",
        light: "#aaaaaa",
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
