const _ = require('lodash');

const path = require(`path`);

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors;
    }
    return result;
  });

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  // Only use MDX nodes
  if (node.internal.type === 'Mdx') {
    const fileNode = getNode(node.parent);
    // If the frontmatter contains a "slug", use it
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.slug)}`;
    }
    // Otherwise use the title for the slug
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`;
    }
    createNodeField({ node, name: 'slug', value: slug });
    // Adds the name of "gatsby-source-filesystem" as field (in this case "projects" or "pages")
    createNodeField({
      node,
      name: 'sourceInstanceName',
      value: fileNode.sourceInstanceName,
    });
  }
};

// Necessary changes to get gatsby-mdx and Cypress working
exports.onCreateWebpackConfig = ({ stage, actions, loaders, getConfig }) => {
  const config = getConfig();

  config.module.rules = [
    ...config.module.rules.filter(
      rule => String(rule.test) !== String(/\.jsx?$/),
    ),
    {
      ...loaders.js(),
      test: /\.jsx?$/,
      exclude: modulePath =>
        /node_modules/.test(modulePath) &&
        !/node_modules\/gatsby-mdx/.test(modulePath),
    },
  ];

  actions.replaceWebpackConfig(config);
};

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for nodes to use in creating pages.
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        return result;
      }),
    );
  });

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const getExhibitions = makeRequest(
    graphql,
    `{
      allStrapiExhibitions {
        edges {
          node {
            id
          }
        }
      }
    }
    `,
  ).then(exhibitionsResult => {
    // Create pages for each article.
    exhibitionsResult.data.allStrapiExhibitions.edges.forEach(({ node }) => {
      createPage({
        // path: `/${_.kebabCase(node.artist.name)}/${_.kebabCase(node.title)}/${
        //   node.id
        // }`,
        path: `/${node.id}`,
        component: path.resolve(`src/templates/exhibition.jsx`),
        context: {
          id: node.id,
        },
      });
    });
  });

  const getArtworks = makeRequest(
    graphql,
    `{
      allStrapiArtworks {
        edges {
          node {
            id
          }
        }
      }
    }
    `,
  ).then(artworksResult => {
    // Create pages for each article.
    artworksResult.data.allStrapiArtworks.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.id}`,
        component: path.resolve(`src/templates/artwork.jsx`),
        context: {
          id: node.id,
        },
      });
    });
  });

  const getArtists = makeRequest(
    graphql,
    `{
      allStrapiArtists {
        edges {
          node {
            id
          }
        }
      }
    }
    `,
  ).then(artistResult => {
    // Create pages for each article.
    artistResult.data.allStrapiArtists.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.id}`,
        component: path.resolve(`src/templates/artist.jsx`),
        context: {
          id: node.id,
        },
      });
    });
  });

  // Query for articles nodes to use in creating pages.
  return Promise.all([getExhibitions, getArtworks, getArtists]);
};
