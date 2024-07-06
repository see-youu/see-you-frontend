/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./src/app/*.{js,ts,jsx,tsx}", // Next.js 페이지
    // "./components/**/*.{js,ts,jsx,tsx}", // 컴포넌트 디렉토리],
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customYellow: "#FFE792",
        customBrown: "#6B4D00",
        customOpacityGray: "#8080806d",
        lightGray100: "#d1d1d1",
        lightGray200: "#909090",
      },
      minWidth: {
        "px-320": "320px",
      },
      maxWidth: {
        "px-480": "480px",
      },
      height: {
        menubar: "3.5rem",
        withoutMenubarHeight: `calc(100vh-3.5rem)`,
        "px-1": "1px",
      },
      zIndex: {
        100: "100",
        200: "200",
      },
      gridTemplateColumns: {
        "1-5-1-1": "1fr 5fr 1fr 0.5fr",
      },
      padding: {
        1.5: "0.35rem",
      },
      boxShadow: {
        top: "0 -6px 10px -5px rgb(0 0 0 / 0.3)",
      },
    },
  },
  plugins: [],
};
