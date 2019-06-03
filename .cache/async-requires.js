// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-templates-exhibition-jsx": () => import("/Users/nenjotsu/Documents/github/rgallery/src/templates/exhibition.jsx" /* webpackChunkName: "component---src-templates-exhibition-jsx" */),
  "component---src-templates-artwork-jsx": () => import("/Users/nenjotsu/Documents/github/rgallery/src/templates/artwork.jsx" /* webpackChunkName: "component---src-templates-artwork-jsx" */),
  "component---src-templates-artist-jsx": () => import("/Users/nenjotsu/Documents/github/rgallery/src/templates/artist.jsx" /* webpackChunkName: "component---src-templates-artist-jsx" */),
  "component---cache-dev-404-page-js": () => import("/Users/nenjotsu/Documents/github/rgallery/.cache/dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-404-jsx": () => import("/Users/nenjotsu/Documents/github/rgallery/src/pages/404.jsx" /* webpackChunkName: "component---src-pages-404-jsx" */),
  "component---src-pages-about-index-jsx": () => import("/Users/nenjotsu/Documents/github/rgallery/src/pages/about/index.jsx" /* webpackChunkName: "component---src-pages-about-index-jsx" */),
  "component---src-pages-artists-index-jsx": () => import("/Users/nenjotsu/Documents/github/rgallery/src/pages/artists/index.jsx" /* webpackChunkName: "component---src-pages-artists-index-jsx" */),
  "component---src-pages-artworks-index-jsx": () => import("/Users/nenjotsu/Documents/github/rgallery/src/pages/artworks/index.jsx" /* webpackChunkName: "component---src-pages-artworks-index-jsx" */),
  "component---src-pages-exhibitions-index-jsx": () => import("/Users/nenjotsu/Documents/github/rgallery/src/pages/exhibitions/index.jsx" /* webpackChunkName: "component---src-pages-exhibitions-index-jsx" */),
  "component---src-pages-index-jsx": () => import("/Users/nenjotsu/Documents/github/rgallery/src/pages/index.jsx" /* webpackChunkName: "component---src-pages-index-jsx" */)
}

exports.data = () => import(/* webpackChunkName: "pages-manifest" */ "/Users/nenjotsu/Documents/github/rgallery/.cache/data.json")

