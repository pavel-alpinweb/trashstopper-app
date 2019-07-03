const fs = require("fs");

module.exports = {
  syntax: "postcss-scss",
  parser: "postcss-scss",
  plugins: [
    require("postcss-easy-import")({
      extensions: ".scss"
    }),
    require("autoprefixer")({
      browsers: ["last 2 versions"],
      cascade: false
    }),
    require("postcss-advanced-variables")({
      variables: require("./src/assets/styles/variables")
    }),
    require("postcss-nested"),
    require("postcss-rgb"),
    require("postcss-inline-svg")({
      removeFill: false,
      path: "./src/assets/images/"
    }),
    require("postcss-svgo"),
    require("cssnano")()
  ]
};
