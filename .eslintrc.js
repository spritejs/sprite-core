module.exports = {
  extends:  "eslint-config-sprite",
  plugins: ["html"],
  globals: {
    spritejs: true,
    wx: true,
  },
  rules: {
    'import/prefer-default-export': 'off',
    "complexity": ["warn", 25]
  },
}
