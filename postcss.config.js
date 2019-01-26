const postcssPresetEnv = require('postcss-preset-env');
const postcssNesting = require('postcss-nesting');
const selector = require('postcss-custom-selectors')
var pxToRem = require('postcss-pxtorem');
module.exports = {
  plugins: [
    postcssPresetEnv(),
    require('autoprefixer')({
      browsers: ['last 2 versions']
    }),
    postcssPresetEnv(),
    postcssNesting(),
    selector(),
    pxToRem({
      rootValue: 16,
      unitPrecision: 6,
      propList: ['font',
        'font-size',
        'line-height',
        'letter-spacing',
        'height',
        'width',
        'padding',
        'top',
        'right',
        'left',
        'bottom',
        'margin',
        'margin-left',
        'margin-right',
        'margin-top',
        'margin-bottom',
        'padding-left',
        'padding-right',
        'padding-bottom',
        'padding-top',
        'border',
        'border-radius',
        'max-height',
        'min-height',
        'border-top-left-radius',
        'border-top-right-radius',
        'border-bottom-right-radius',
        'border-bottom-left-radius',
        'border-left',
        'border-right',
        'border-bottom',
        'border-top'
      ],
      selectorBlackList: [/^body$/, /^html$/],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    })
  ]
}