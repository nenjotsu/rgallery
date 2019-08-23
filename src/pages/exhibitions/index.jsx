/* eslint react/display-name: 0 */
import React from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import * as moment from 'moment';
import { animated, useSpring, useTrail, config } from 'react-spring';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { Layout, Container } from '../../components';

const ExhibitionWrapper = styled.div`
  margin-top: 30px;
  padding: 20px;
  display: grid;
  grid-template-columns: 10% 90%;
  grid-gap: 30px;
`;

const NewsListWrapper = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  height: auto;
  margin-bottom: 50px;
`;

const NewsListItem = styled.div`
  min-height: 350px;
  background: #f9f9f9;
  padding: 20px;
  display: grid;
  grid-template-columns: 60% 30%;
  grid-gap: 30px;
  margin-bottom: 10px;
`;

const ImageWrapper = styled.div`
  > div {
    height: auto;
    left: 0;
    top: 0;
    width: 100%;
  }
`;

const ExhibitionListWrapper = styled.div`
  > div {
    text-transform: lowercase;
    margin-bottom: 0.8em;
    height: auto;
    left: 0;
    top: 0;
    width: 100%;
  }
`;

const Service = styled.div`
  opacity: 0.8;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const InformationWrapper = styled(animated.div)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
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

const Exhibitions = ({ data, location }) => {
  const list = data.allStrapiExhibitions.edges;

  const trail = useTrail(list.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
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

  return (
    <Layout pathname={location.pathname}>
      <ExhibitionWrapper>
        <ExhibitionListWrapper>
          {trail.map((_, index) => (
            <div key={`${list[index].node.id}`}>
              <a href={`#${list[index].node.id}`}>{list[index].node.title}</a>
            </div>
          ))}
        </ExhibitionListWrapper>
        <NewsListWrapper>
          {trail.map((_, index) => {
            const exhibition = list[index].node;
            return (
              <NewsListItem key={exhibition.id} id={exhibition.id}>
                <Container type="text">
                  <animated.div style={contentProps}>
                    <Link to={exhibition.id}>
                      <h3>{exhibition.title}</h3>
                    </Link>
                    <InformationWrapper style={infoProps}>
                      <InfoBlock customcolor={exhibition.color}>
                        <div>Starts</div>
                        <div>
                          {moment(exhibition.date_from).format('MMM DD YYYY')}
                        </div>
                      </InfoBlock>
                      <InfoBlock customcolor={exhibition.color}>
                        <div>Ends</div>
                        <div>
                          {moment(exhibition.date_to).format('MMM DD YYYY')}
                        </div>
                      </InfoBlock>
                    </InformationWrapper>
                    {exhibition.descriptions && (
                      <ReactMarkdown source={exhibition.descriptions} />
                    )}
                  </animated.div>
                </Container>
                <ImageWrapper>
                  {exhibition.thumbnail && (
                    <Img fluid={exhibition.thumbnail.childImageSharp.fluid} />
                  )}
                </ImageWrapper>
              </NewsListItem>
            );
          })}
        </NewsListWrapper>
      </ExhibitionWrapper>
    </Layout>
  );
};

export default Exhibitions;

Exhibitions.propTypes = {
  data: PropTypes.shape({
    allStrapiExhibitions: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query ExhibitionsQuery {
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
  }
`;
