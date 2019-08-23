/* eslint react/display-name: 0 */
import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
// import { useTrail, animated } from 'react-spring';
import ReactMarkdown from 'react-markdown';

import { animated, useSpring, useTrail, config } from 'react-spring';
import styled from 'styled-components';
import Img from 'gatsby-image';
import _filter from 'lodash/filter';
import {
  Layout,
  ArtistItem,
  ArtistItemFeatured,
  Container,
} from '../../components';

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
  padding: 20px;
`;

const ArtistListWrapper = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  height: auto;
  margin-bottom: 50px;
`;

const ArtistListItem = styled.div`
  min-height: 350px;
  background: #f9f9f9;
  margin-top: 30px;
  padding: 20px;
  display: grid;
  grid-template-columns: 60% 35%;
  grid-gap: 30px;
`;

const ImageWrapper = styled.div`
  > div {
    height: 100%;
    left: 0;
    // position: absolute !important;
    top: 0;
    width: 100%;
    // max-width: 300px;
    // > div {
    //   position: static !important;
    // }
  }
`;

const Artists = ({ data, location }) => {
  const list = _filter(
    data.allStrapiArtists.edges,
    e => e.node.isFeatured && e.node.artworks.length > 0,
  );

  const trail = useTrail(list.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const contentProps = useSpring({
    config: config.slow,
    delay: 1000,
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <Layout pathname={location.pathname}>
      <ArtistListWrapper>
        {trail.map((style, index) => {
          const artist = list[index].node;
          return (
            <ArtistListItem>
              <Container type="text">
                <animated.div style={contentProps}>
                  <h3>{artist.name}</h3>
                  {artist.biography && (
                    <ReactMarkdown source={artist.biography} />
                  )}
                </animated.div>
              </Container>
              <ImageWrapper>
                {artist.thumbnail && (
                  <Img fluid={artist.thumbnail.childImageSharp.fluid} />
                )}
                {artist.thumbnail ? (
                  <Img fluid={artist.thumbnail.childImageSharp.fluid} />
                ) : (
                  <Img
                    fluid={artist.artworks[0].thumbnail.childImageSharp.fluid}
                    alt={`R Gallery Contemporary Arts - ${artist.name}`}
                  />
                )}
              </ImageWrapper>
              {/* <div>
                {artist.name}
                {artist.biography}
              </div> */}
              {/* <ArtistItemFeatured
              testid={`/${artist.id}`}
              style={style}
              key={artist.id}
              node={list[index].node}
            /> */}
            </ArtistListItem>
          );
        })}
      </ArtistListWrapper>
      <p style={{ marginBottom: 50 }}> </p>
      {/* <div>
        {trail.map((style, index) => (
          <ArtistItem
            testid={`/${list[index].node.id}`}
            style={style}
            key={list[index].node.id}
            node={list[index].node}
          />
        ))}
      </div> */}
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
    allStrapiArtists(sort: { fields: name, order: ASC }, limit: -1) {
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
          isFeatured
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
