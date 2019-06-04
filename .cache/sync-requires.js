const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---node-modules-gatsby-plugin-offline-app-shell-js": hot(preferDefault(require("/Users/nenjotsu/Documents/github/rgallery/node_modules/gatsby-plugin-offline/app-shell.js"))),
  "component---src-templates-exhibition-jsx": hot(preferDefault(require("/Users/nenjotsu/Documents/github/rgallery/src/templates/exhibition.jsx"))),
  "component---src-templates-artwork-jsx": hot(preferDefault(require("/Users/nenjotsu/Documents/github/rgallery/src/templates/artwork.jsx"))),
  "component---src-templates-artist-jsx": hot(preferDefault(require("/Users/nenjotsu/Documents/github/rgallery/src/templates/artist.jsx"))),
  "component---src-pages-404-jsx": hot(preferDefault(require("/Users/nenjotsu/Documents/github/rgallery/src/pages/404.jsx"))),
  "component---src-pages-about-index-jsx": hot(preferDefault(require("/Users/nenjotsu/Documents/github/rgallery/src/pages/about/index.jsx"))),
  "component---src-pages-artists-index-jsx": hot(preferDefault(require("/Users/nenjotsu/Documents/github/rgallery/src/pages/artists/index.jsx"))),
  "component---src-pages-artworks-index-jsx": hot(preferDefault(require("/Users/nenjotsu/Documents/github/rgallery/src/pages/artworks/index.jsx"))),
  "component---src-pages-exhibitions-index-jsx": hot(preferDefault(require("/Users/nenjotsu/Documents/github/rgallery/src/pages/exhibitions/index.jsx"))),
  "component---src-pages-index-jsx": hot(preferDefault(require("/Users/nenjotsu/Documents/github/rgallery/src/pages/index.jsx")))
}

