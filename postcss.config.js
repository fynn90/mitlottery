const postcssPresetEnv = require('postcss-preset-env');
const postcssNesting = require('postcss-nesting');
const selector = require('postcss-custom-selectors')
module.exports = {
  plugins: [
    postcssPresetEnv(),
    require('autoprefixer')({
      browsers: ['last 2 versions']
    }),
    postcssPresetEnv(),
    postcssNesting(),
    selector()
  ]
}