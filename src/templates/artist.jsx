import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animated, useSpring, useTrail, config } from 'react-spring';
import { graphql } from 'gatsby';
import ReactMarkdown from 'react-markdown';
import Img from 'gatsby-image';
import {
  SEO,
  Container,
  Layout,
  ArtworkItem,
  Hero,
  BGImage,
  RandomColor,
} from '../components';
import * as animation from '../common/animation';
import AboutCover from '../images/cover.jpg';

const Content = styled(Container)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 2rem;
  padding-bottom: 2rem;
  z-index: 3;
`;

const Title = styled(animated.h1)`
  margin-top: 0;
`;

const ArtistTemplate = ({ data, location }) => {
  const artist = { ...data.strapiArtists, color: '#2a3342' };

  const titleProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: 'translate3d(0, -30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  });

  const contentProps = useSpring({
    config: config.slow,
    delay: 1000,
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const { artworks = [] } = artist;

  const trailArtworks = useTrail(artworks.length, animation.opacity);

  const pathname = ` ${artist.name} ${location.pathname}`;

  return (
    <Layout pathname={pathname} customSEO>
      <SEO pathname={pathname} />
      <Hero>
        <BGImage customcolor={artist.color}>
          {artist.thumbnail ? (
            <Img
              fluid={artist.thumbnail.childImageSharp.fluid}
              alt={pathname}
            />
          ) : (
            <img src={AboutCover} alt={pathname} />
          )}
        </BGImage>
        <Content type="text">
          <Title data-testid="project-title" style={titleProps}>
            {artist.name}
          </Title>
        </Content>
      </Hero>
      <Container type="text">
        <animated.div style={contentProps}>
          {artist.biography && <ReactMarkdown source={artist.biography} />}
        </animated.div>
        {artworks.length > 0 && (
          <div className="masonry">
            {trailArtworks.map((style, index) => (
              <ArtworkItem
                testid={`/Artworks_${artworks[index].id}`}
                style={style}
                key={artworks[index].id}
                node={artworks[index]}
              />
            ))}
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default ArtistTemplate;

ArtistTemplate.propTypes = {
  data: PropTypes.shape({
    strapiArtists: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query ArtistTemplate($id: String!) {
    strapiArtists(id: { eq: $id }) {
      name
      thumbnail {
        childImageSharp {
          fluid(maxWidth: 350, quality: 50) {
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
        medium
        sizes
        exhibition
      }
    }
  }
`;
