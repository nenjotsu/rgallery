import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as moment from 'moment';
import { animated, useSpring, useTrail, config } from 'react-spring';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import ReactMarkdown from 'react-markdown';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import {
  SEO,
  Container,
  Layout,
  Hero,
  BGImage,
  RandomColor,
  hexToRGB,
  ArtworkItem,
} from '../components';
import '../pages/style.css';

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
`;

const formatDate = date => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
};

const Content = styled(Container)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
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

const ExhibitionTemplate = ({ data, location }) => {
  const color = RandomColor();
  const pastelColor = hexToRGB(color, 0.8);

  const exhibition = { ...data.strapiExhibitions, color: pastelColor };

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

  const { artworks = [], artists = [] } = exhibition;

  const trailArtworks = useTrail(artworks.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const ImageWrapper = styled.div`
    > div {
      height: 100%;
      width: 100%;
      > div {
        position: static !important;
      }
    }
  `;

  return (
    <Layout pathname={location.pathname} customSEO>
      <SEO pathname={location.pathname} />
      <Hero>
        <BGImage customcolor={exhibition.color}>
          {exhibition.thumbnail && (
            <Img
              fluid={data.file.childImageSharp.fluid}
              alt={exhibition.title}
            />
          )}
        </BGImage>
        <Content type="text">
          <Title data-testid="project-title" style={titleProps}>
            {exhibition.title}
          </Title>
          <InformationWrapper style={infoProps}>
            <InfoBlock customcolor={exhibition.color}>
              <div>Starts</div>
              <div>{moment(exhibition.date_from).format('MMM DD YYYY')}</div>
            </InfoBlock>
            <InfoBlock customcolor={exhibition.color}>
              <div>Ends</div>
              <div>{moment(exhibition.date_to).format('MMM DD YYYY')}</div>
            </InfoBlock>
          </InformationWrapper>
        </Content>
      </Hero>
      <Container type="text">
        <animated.div style={contentProps}>
          {exhibition.descriptions && (
            <ReactMarkdown source={exhibition.descriptions} />
          )}
          {artists.length > 0 && <div>Artists:</div>}
          {artists.length > 0 && (
            <ul>
              {artists.map(a => {
                return (
                  <li key={a.id} style={{ listStyle: 'none', marginBottom: 5 }}>
                    <Link to={`Artists_${a.id}`}>{a.name}</Link>
                  </li>
                );
              })}
            </ul>
          )}
        </animated.div>
        <ImageWrapper style={{ textAlign: 'center', marginBottom: 30 }}>
          {exhibition.thumbnail && (
            <Img fixed={exhibition.thumbnail.childImageSharp.fixed} />
          )}
        </ImageWrapper>
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
      </Container>
    </Layout>
  );
};

export default ExhibitionTemplate;

ExhibitionTemplate.propTypes = {
  data: PropTypes.shape({
    strapiExhibitions: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
    file: PropTypes.object,
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query ExhibitionTemplate($id: String!) {
    file(id: { eq: "cd29e3f2-ed71-508b-996a-084929a8f429" }) {
      id
      childImageSharp {
        fluid(maxWidth: 850, quality: 40) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    strapiExhibitions(id: { eq: $id }) {
      title
      descriptions
      date_from
      date_to
      thumbnail {
        childImageSharp {
          fixed(width: 600) {
            ...GatsbyImageSharpFixed
          }
          fluid(maxWidth: 450, quality: 50) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      artworks {
        id
        title
        descriptions
        thumbnail {
          publicURL
          childImageSharp {
            fluid(maxWidth: 250, quality: 50) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      artists {
        id
        name
      }
    }
  }
`;
