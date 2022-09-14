module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "430px",
    },
    extend: {
      boxShadow: {
        "3xl": "0 0 50px 10px rgba(0, 0, 0, 0.2)",
      },
      backgroundColor: {
        primary: "#043076",
        tertiary: "#011638",
        secondary: "#4F5F7D",
        quaternary: "#819595",
        quinary: "#B1B6A6",
        light: "rgb(245, 245, 245)",
      },
      textColor: {
        dark: "#364156",
        light: "#CDCDCD",
      },
    },
  },
  plugins: [],
};
