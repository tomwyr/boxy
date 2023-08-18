/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      width: {
        dialog: "576px",
      },

      minWidth: {
        "dropdown-menu-item": "96px",
      },

      colors: {
        "item-rarity-common": "#000000",
        "item-rarity-rare": "#0000FF",
        "item-rarity-unique": "#FF00FF",
        "item-rarity-epic": "#FFF000",
        "item-rarity-legendary": "#FF0000",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /item-rarity/,
      variants: ["hover"],
    },
    {
      pattern: /blue/,
      variants: ["hover"],
    },
  ],
}
