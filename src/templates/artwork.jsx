import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animated, useSpring, config } from 'react-spring';
import { Link, graphql } from 'gatsby';
import ReactMarkdown from 'react-markdown';
import ReactImageZoom from 'react-image-zoom';

import Img from 'gatsby-image';
import {
  SEO,
  Container,
  Layout,
  Hero,
  BGImage,
  RandomColor,
  hexToRGB,
} from '../components';

const Content = styled(Container)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 2rem;
  padding-bottom: 2rem;
  z-index: 3;
`;

const InformationWrapper = styled(animated.div)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Title = styled(animated.h1)`
  margin-top: 0;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 2rem 0 0;
  div:first-child {
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 700;
    color: ${props =>
      props.customcolor ? props.customcolor : props.theme.colors.grey};
  }
  div:last-child {
    font-size: 1rem;
  }
`;

const ArtworkTemplate = ({ data }) => {
  const color = RandomColor();
  const pastelColor = hexToRGB(color, 0.8);

  const artwork = { ...data.strapiArtworks, color: '#000' };

  const titleProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: 'translate3d(0, -30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  });

  const infoProps = useSpring({
    config: config.slow,
    delay: 500,
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const contentProps = useSpring({
    config: config.slow,
    delay: 1000,
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const ReactImageZoomProps = {
    width: 400,
    zoomWidth: 500,
    img: artwork.thumbnail.publicURL,
  };

  const artworkTitleArtist = `Artwork: "${artwork.title}" by: ${
    artwork.artist.name
  } - Inquiry`;

  const emailSubject = encodeURIComponent(artworkTitleArtist);

  return (
    <Layout pathname={artworkTitleArtist} customSEO>
      <SEO pathname={artworkTitleArtist} />
      <Hero>
        <BGImage customcolor={artwork.color}>
          {artwork.thumbnail && (
            <Img fluid={artwork.thumbnail.childImageSharp.fluid} alt="" />
          )}
        </BGImage>
        <Content type="text">
          <Title data-testid="project-title" style={titleProps}>
            {artwork.title}
          </Title>
          <InformationWrapper style={infoProps}>
            <InfoBlock customcolor={artwork.color}>
              <div>Artist</div>
              <div>
                <Link to={`Artists_${artwork.artist.id}`}>
                  {artwork.artist.name}
                </Link>
              </div>
            </InfoBlock>
            <InfoBlock customcolor={artwork.color}>
              <div>Medium</div>
              <div>{artwork.medium.name}</div>
            </InfoBlock>
            <InfoBlock customcolor={artwork.color}>
              <div>Size</div>
              <div>{artwork.sizes.descriptions}</div>
            </InfoBlock>
            <InfoBlock customcolor={artwork.color}>
              <div>Exhibition</div>
              <div>
                <Link to={`Exhibitions_${artwork.exhibition.id}`}>
                  {artwork.exhibition.title}
                </Link>
              </div>
            </InfoBlock>
          </InformationWrapper>
        </Content>
      </Hero>
      <Container type="text">
        <animated.div style={contentProps}>
          {artwork.descriptions && (
            <ReactMarkdown source={artwork.descriptions} />
          )}
        </animated.div>
        <ReactImageZoom className="img-zoom" {...ReactImageZoomProps} />
        <p>
          To inquire on available work of art, please call or text us at
          +63917-7180-777.
          <br />
          You may also send us an email to{' '}
          <strong>rgallery.ph@gmail.com</strong> or click{' '}
          <a href={`mailto:rgallery.ph@gmail.com?subject=${emailSubject}`}>
            here.
          </a>
        </p>
      </Container>
    </Layout>
  );
};

export default ArtworkTemplate;

ArtworkTemplate.propTypes = {
  data: PropTypes.shape({
    strapiArtworks: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query ArtworkTemplate($id: String!) {
    strapiArtworks(id: { eq: $id }) {
      id
      title
      descriptions
      thumbnail {
        publicURL
        childImageSharp {
          fluid(maxWidth: 550, quality: 50) {
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
`;
