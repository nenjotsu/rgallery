/* eslint react/display-title: 0 */
import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import { animated, useSpring, useTrail, config } from 'react-spring';
import styled from 'styled-components';
import Img from 'gatsby-image';
import _filter from 'lodash/filter';
import { Layout, Container } from '../../components';

const NewsListWrapper = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  height: auto;
  margin-bottom: 50px;
`;

const NewsListItem = styled.div`
  min-height: 350px;
  background: #f9f9f9;
  margin-top: 30px;
  padding: 20px;
  display: grid;
  grid-template-columns: 60% 30%;
  grid-gap: 30px;
`;

const ImageWrapper = styled.div`
  > div {
    height: auto;
    left: 0;
    top: 0;
    width: 100%;
  }
`;

const News = ({ data, location }) => {
  const list = data.allStrapiGallerynews.edges;

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
      <NewsListWrapper>
        {trail.map((style, index) => {
          const news = list[index].node;
          return (
            <NewsListItem key={news.id}>
              <Container type="text">
                <animated.div style={contentProps}>
                  <h3>{news.title}</h3>
                  {news.description && (
                    <ReactMarkdown source={news.description} />
                  )}
                </animated.div>
              </Container>
              <ImageWrapper>
                {news.thumbnail && (
                  <Img fluid={news.thumbnail.childImageSharp.fluid} />
                )}
              </ImageWrapper>
            </NewsListItem>
          );
        })}
      </NewsListWrapper>
    </Layout>
  );
};

export default News;

News.propTypes = {
  data: PropTypes.shape({
    allStrapiGallerynews: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query NewsQuery {
    allStrapiGallerynews(sort: { fields: title, order: ASC }, limit: -1) {
      edges {
        node {
          id
          title
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 290, quality: 50) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          description
        }
      }
    }
  }
`;
