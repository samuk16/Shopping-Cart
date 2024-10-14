<h1 align="center">Shopping Cart</h1>

![](./src/assets/thumbnail.webp)
![](./src/assets/thumbnailM.webp)

# Description

This project is an interactive shopping cart for CS:GO skins, developed as part of The Odin Project course. It utilizes the CS:GO API to fetch up-to-date information about available skins and allows users to explore and "purchase" their favorite skins.

# Features

- Display of CS:GO skins fetched from the official API
- Shopping cart functionality
- Responsive and attractive user interface
- Skin filtering and search capabilities

# Technologies Used

- React
- React Router DOM
- TypeScript

# Acknowledgments

- The Odin Project for providing the structure and challenge for this project.
- CSGO API for providing skin data.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
