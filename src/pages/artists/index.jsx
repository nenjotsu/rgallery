/* eslint react/display-name: 0 */
import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { useTrail } from 'react-spring';
import styled from 'styled-components';
import _filter from 'lodash/filter';
import { Layout, ArtistItem } from '../../components';

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
  padding: 20px;
`;

const Artists = ({ data, location }) => {
  const list = _filter(
    data.allStrapiArtists.edges,
    e => e.node.artworks.length > 0,
  );

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
              fluid(maxWidth: 290, quality: 50) {
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
                fluid(maxWidth: 550, quality: 50) {
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
