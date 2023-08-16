// 预设环境里面包含很多的插件
const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  plugins: [postcssPresetEnv()],
};
