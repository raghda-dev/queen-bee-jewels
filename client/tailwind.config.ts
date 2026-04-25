//client/tailwind.config.ts

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{css,scss}",
  ],
  safelist: ['border-orangeMedium'],
  theme: {
    extend: {
      colors: {
        orangeLight: "var(--orange-light)",
        orangeMedium: "var(--orange-medium)",
        orangeDark: "var(--orange-dark)",
        orangeDeep: "var(--orange-deep)",
        orangeRich: "var(--orange-rich)",
        orangeBrown: "var(--orange-brown)",
        deepBrown: "var(--deep-brown)",
        orangeMain: "var(--orange-main)",

        purpleLight: "var(--purple-light)",
        purpleMedium: "var(--purple-medium)",
        purpleDark: "var(--purple-dark)",
        pinkish: "var(--pinkish)",
        pinkTint: "var(--pink-tint)",
        pinkLight: "var(--pink-light)",

        white: "var(--white)",
        grayLight: "var(--gray-light)",
        grayMedium: "var(--gray-medium)",
        grayDark: "var(--gray-dark)",
        black: "var(--black)",
        lightCyan: "var(--light-cyan)",
        cyanMedium: "var(--cyan-medium)",

        navyDark: "var(--navy-dark)",
        navyMedium: "var(--navy-medium)",

        brownishRed: "var(--brownish-red)",
        darkBurgundy: "var(--dark-burgundy)",
        mutedRed: "var(--muted-red)",
        deepPurpleRed: "var(--deep-purple-red)",

        gradientStart: "var(--gradient-start)",
        gradientMid: "var(--gradient-mid)",
        gradientEnd: "var(--gradient-end)",
      },
      fontFamily: {
        'josefin': ['Josefin Sans', 'sans-serif'],  // Add Josefin Sans to Tailwind's font stack
        'popins':['Poppins', 'sans-serif']

      },
      screens: {
       xs: '360px',
       start: '0px',
      },
    },
  },
  plugins: [],
};

export default config;
