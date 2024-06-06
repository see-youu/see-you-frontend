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
      },
      maxWidth: {
        "px-480": "480px",
      },
      height: {
        menubar: "3.5rem",
        withoutMenubarHeight: `calc(100vh-3.5rem)`,
      },
    },
  },
  plugins: [],
};
