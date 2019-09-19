import React from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { useTrail } from 'react-spring';
// import styled from 'styled-components';
import * as lodash from 'lodash';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import Img from 'gatsby-image';
// import { Carousel } from 'react-responsive-carousel';
import { Layout } from '../../components';
import RandomColor, { hexToRGB } from '../../components/RandomColor';
import { getFullYear } from '../../common/utils';
import { Content, Overlay, TracedGlow, Service } from './styled';
// import { Content } from './enums';

// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import '../style.css';
import Jumbotron from '../../components/Jumbotron/main';

const Index = ({ data, location }) => {
  const banners = data.allStrapiBanners.edges;

  const exhibitions = data.allStrapiExhibitions.edges;

  // const trailBanners = useTrail(banners.length, {
  //   from: { opacity: 0 },
  //   to: { opacity: 1 },
  // });

  const color = RandomColor();
  const transparentColor = hexToRGB(color, 0.1);

  console.log('exhibitions index', exhibitions);

  return (
    <Layout pathname={location.pathname}>
      {exhibitions && <Jumbotron exhibitions={exhibitions} />}

      {/* <Carousel
        showThumbs={false}
        autoPlay={true}
        interval={3000}
        style={{ marginBottom: 20 }}
      >
        {trailBanners.map((_, index) => (
          <Img
            key={index}
            fluid={banners[index].node.thumbnail.childImageSharp.fluid}
            alt="R Gallery Social Pictures"
          />
        ))}
      </Carousel> */}
      {/* {exhibitions.map(exhibition => {
        let exhibitionId = lodash.get(exhibition, 'node.id');
        exhibitionId = exhibitionId.replace('Exhibitions_', '');
        const artworksByExhibition = data.allStrapiArtworks.edges.filter(
          artwork => lodash.get(artwork, 'node.exhibition.id') === exhibitionId,
        );
        const trailartworks = useTrail(artworksByExhibition.length, {
          from: { opacity: 0 },
          to: { opacity: 1 },
        });
        return (
          <div>
            <h2 style={{ marginLeft: 10 }} key="title">
              {exhibition.node.title}
            </h2>
            <div className="masonry" key={exhibitionId}>
              {trailartworks.map((style, index) => {
                const artwork = artworksByExhibition[index].node;
                // console.log('artwork', artwork);
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
                          <Overlay
                            style={{ backgroundColor: transparentColor }}
                          />
                          <h2>{artwork.title}</h2>
                          {lodash.has(artwork, 'sizes.descriptions') && (
                            <Service>
                              {artwork.sizes && artwork.sizes.descriptions}
                            </Service>
                          )}
                          {lodash.has(artwork, 'medium.name') && (
                            <Service>
                              {artwork.medium && artwork.medium.name}
                            </Service>
                          )}
                          {lodash.has(artwork, 'createdAt') && (
                            <Service>{getFullYear(artwork.createdAt)}</Service>
                          )}
                          {lodash.has(artwork, 'exhibition.title') && (
                            <Service>
                              Exhibition:{' '}
                              {artwork.exhibition && artwork.exhibition.title}
                            </Service>
                          )}
                          {lodash.has(artwork, 'artist.name') &&
                            artwork.artist.name && (
                              <h3>
                                Artist: {artwork.artist && artwork.artist.name}
                              </h3>
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
                      <p
                        style={{ fontSize: '.3em', textAlign: 'center' }}
                      >{`${artwork.title} by: ${artwork.artist.name}`}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })} */}
    </Layout>
  );
};

export default Index;

Index.propTypes = {
  data: PropTypes.shape({
    allStrapiExhibitions: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
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
  query MainQuery {
    allStrapiBanners {
      edges {
        node {
          id
          name
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 80) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    allStrapiExhibitions(sort: { order: DESC, fields: updatedAt }, limit: -1) {
      edges {
        node {
          id
          title
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 550, quality: 40) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          descriptions
          date_from
          date_to
        }
      }
    }
    allStrapiArtworks(sort: { order: DESC, fields: updatedAt }, limit: -1) {
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
          createdAt
          updatedAt
        }
      }
      group(field: exhibition___id) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;
