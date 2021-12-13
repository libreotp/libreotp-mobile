module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    "macros"
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
