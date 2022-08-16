module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "400px",
    },
    extend: {
      boxShadow: {
        "3xl": "0 0 50px 10px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
