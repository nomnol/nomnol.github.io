module.exports = () => ({
  ident: 'postcss',
  sourceMap: true,
  plugins: [
    require('postcss-import')(),
    require('postcss-apply')(),
    require('postcss-nested')(),
    require('postcss-url')(),
    require('postcss-cssnext')(),
  ],
});
