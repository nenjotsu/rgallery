/* eslint react/display-name: 0 */
import React from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { useTrail } from 'react-spring';
import styled from 'styled-components';
import * as lodash from 'lodash';
import Img from 'gatsby-image';
import { Carousel } from 'react-responsive-carousel';
import { Layout } from '../components';
import RandomColor, { hexToRGB } from '../components/RandomColor';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './style.css';

const Content = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  padding: 20px;

  a {
    color: #fff;
    height: 100%;
    left: 0;
    opacity: 0;
    padding: 2rem;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
    transition: all 0.3s ease-in-out;
    text-decoration: none;

    &:hover {
      color: #fff;
      opacity: 1;
      text-decoration: none;
    }
  }
  h2 {
    font-size: 0.5em;
    margin-top: 0;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  h3 {
    font-size: 0.5em;
    margin-top: 0;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const Overlay = styled.div`
  background-color: ${props => props.theme.brand.primary};
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -2;
`;

const TracedGlow = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.08;
  filter: invert(100%);
  z-index: -1;
`;

const Service = styled.div`
  font-size: 0.3em;
  opacity: 0.9;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
`;

const Index = ({ data, location }) => {
  const banners = data.allStrapiBanners.edges;

  const trailartworks = useTrail(data.allStrapiArtworks.edges.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const trailBanners = useTrail(banners.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const color = RandomColor();
  const transparentColor = hexToRGB(color, 0.1);

  return (
    <Layout pathname={location.pathname}>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        interval={3000}
        style={{ marginBottom: 20 }}
      >
        {trailBanners.map((style, index) => (
          <Img
            key={index}
            fluid={banners[index].node.thumbnail.childImageSharp.fluid}
            alt="R Gallery Social Pictures"
          />
        ))}
      </Carousel>
      <div className="masonry">
        {trailartworks.map((style, index) => {
          const artwork = data.allStrapiArtworks.edges[index].node;
          return (
            <div
              key={artwork.id}
              className="item"
              style={{
                ...style,
              }}
            >
              <div className="item__content  item__content--large">
                <Content>
                  <Link to={artwork.id}>
                    {artwork.thumbnail && (
                      <TracedGlow
                        src={artwork.thumbnail.childImageSharp.fluid}
                        alt=""
                      />
                    )}
                    <Overlay style={{ backgroundColor: transparentColor }} />
                    <h2>{artwork.title}</h2>
                    {lodash.has(artwork, 'sizes.descriptions') && (
                      <Service>
                        {artwork.sizes && artwork.sizes.descriptions}
                      </Service>
                    )}
                    {lodash.has(artwork, 'medium.name') && (
                      <Service>{artwork.medium && artwork.medium.name}</Service>
                    )}
                    {lodash.has(artwork, 'exhibition.title') && (
                      <Service>
                        Exhibition:{' '}
                        {artwork.exhibition && artwork.exhibition.title}
                      </Service>
                    )}
                    {lodash.has(artwork, 'artist.name') &&
                      artwork.artist.name && (
                        <h3>Artist: {artwork.artist && artwork.artist.name}</h3>
                      )}
                  </Link>
                </Content>
                {artwork.thumbnail && (
                  <Img
                    className="item__img"
                    key={artwork.id}
                    fluid={artwork.thumbnail.childImageSharp.fluid}
                    alt={`${artwork.title} by ${artwork.artist.name}`}
                  />
                )}
                <p style={{ fontSize: '.3em', textAlign: 'center' }}>{`${
                  artwork.title
                } by: ${artwork.artist.name}`}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Index;

Index.propTypes = {
  data: PropTypes.shape({
    allStrapiArtworks: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
    allStrapiBanners: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiBanners {
      edges {
        node {
          id
          name
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 850, quality: 50) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    allStrapiArtworks {
      edges {
        node {
          id
          title
          descriptions
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 250, quality: 20) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          artist {
            id
            name
          }
          medium {
            name
          }
          sizes {
            descriptions
          }
          exhibition {
            id
            title
          }
        }
      }
    }
  }
`;
