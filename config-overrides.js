const {
  override,
  addWebpackAlias,
  addDecoratorsLegacy,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@": path.resolve(__dirname, "./src"),
    style: path.resolve(__dirname, "src/style"),
    common: path.resolve(__dirname, "src/common"),
    components: path.resolve(__dirname, "src/components"),
    "d.ts": path.resolve(__dirname, "src/d.ts"),
  }),
  addDecoratorsLegacy()
);
