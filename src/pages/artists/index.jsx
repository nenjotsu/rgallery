/* eslint react/display-name: 0 */
import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { useTrail } from 'react-spring';
import styled from 'styled-components';
import { Layout, ArtistItem } from '../../components';

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
  padding: 20px;
`;

const Artists = ({ data, location }) => {
  const list = data.allStrapiArtists.edges;
  const trail = useTrail(list.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <Layout pathname={location.pathname}>
      <ListWrapper>
        {trail.map((style, index) => (
          <ArtistItem
            testid={`/${list[index].node.id}`}
            style={style}
            key={list[index].node.id}
            node={list[index].node}
          />
        ))}
      </ListWrapper>
    </Layout>
  );
};

export default Artists;

Artists.propTypes = {
  data: PropTypes.shape({
    allStrapiArtists: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query ArtistsQuery {
    allStrapiArtists {
      edges {
        node {
          id
          name
          thumbnail {
            childImageSharp {
              fixed(width: 200, height: 125) {
                ...GatsbyImageSharpFixed
              }
              fluid(maxWidth: 250, quality: 50) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          biography
          artworks {
            id
            title
            thumbnail {
              childImageSharp {
                fixed(width: 200, height: 125) {
                  ...GatsbyImageSharpFixed
                }
                fluid(maxWidth: 850, quality: 50) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
