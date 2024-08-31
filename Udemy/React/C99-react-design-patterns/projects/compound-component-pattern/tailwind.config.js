/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        // custom utility classes, you can also define them in the index.css file, but this is a better approach as can see vscode intellisense
        // ! but be careful to typo, as it will not show any error
        ".my-btn-primary": {
          "@apply border border-slate-500 p-2 hover:bg-slate-700 hover:text-white":
            {},
        },
      });
    },
  ],
};
