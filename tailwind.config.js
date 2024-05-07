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
      },
      maxWidth: {
        "px-480": "480px",
      },
    },
  },
  plugins: [],
};
