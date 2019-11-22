const path = require("path");

module.exports = {
  plugins: [
    require("posthtml-include")({
      root: path.join(__dirname, "src")
    })
  ]
};
