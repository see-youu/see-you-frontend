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
      top: {
        menubar: "3.5rem",
        withoutMenubarHeight: `calc(100vh-3.5rem)`,
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
        "screen-x": "2.5rem",
      },
      boxShadow: {
        top: "0 -6px 10px -5px rgb(0 0 0 / 0.3)",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(-20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeOutDown: {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(20px)" },
        },
        fadeInDown: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeOutUp: {
          from: { opacity: "1", transform: "translateY(20px)" },
          to: { opacity: "0", transform: "translateY(0)" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.5s ease-out",
        fadeOutDown: "fadeOutDown 0.5s ease-out",
        fadeInDown: "fadeInDown 0.5s ease-out",
        fadeOutUp: "fadeOutUp 0.5s ease-out",
        fadeOut: "fadeOut 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
