var plugins = [{
      plugin: require('/Users/nenjotsu/Documents/github/rgallery/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/nenjotsu/Documents/github/rgallery/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/nenjotsu/Documents/github/rgallery/node_modules/gatsby-mdx/gatsby-ssr'),
      options: {"plugins":[],"extensions":[".mdx",".md"],"gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-images","options":{"maxWidth":820,"quality":90,"linkImagesToOriginal":false}},{"resolve":"gatsby-remark-external-links","options":{"target":"_blank","rel":"nofollow noopener noreferrer"}},{"resolve":"gatsby-remark-responsive-iframe","options":{}}]},
    },{
      plugin: require('/Users/nenjotsu/Documents/github/rgallery/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackingId":"UA-141247174-1"},
    },{
      plugin: require('/Users/nenjotsu/Documents/github/rgallery/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/nenjotsu/Documents/github/rgallery/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"RGallery","short_name":"RGallery","description":"Minimalistic bright portfolio with full-width grid and large images","start_url":"/","background_color":"#2b2e3c","theme_color":"#3498DB","display":"standalone","icons":[{"src":"/favicons/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},{"src":"/favicons/android-chrome-512x512.png","sizes":"512x512","type":"image/png"}]},
    },{
      plugin: require('/Users/nenjotsu/Documents/github/rgallery/node_modules/gatsby-plugin-offline/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
