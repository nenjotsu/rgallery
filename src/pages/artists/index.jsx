/* eslint react/display-name: 0 */
import React from "react";
import { graphql, Link } from "gatsby";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

import { animated, useSpring, useTrail, config } from "react-spring";
import styled from "styled-components";
import Img from "gatsby-image";
import _filter from "lodash/filter";
import { Layout, Container } from "../../components";

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
`;

const ImageWrapper = styled.div`
  > div {
    height: auto;
    left: 0;
    top: 0;
    width: 100%;
  }
`;

const Artists = ({ data, location }) => {
  const list = _filter(data.allStrapiArtists.edges, e => e.node.isFeatured);

  const trail = useTrail(list.length, {
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  const contentProps = useSpring({
    config: config.slow,
    delay: 1000,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  const SpanConfigLeft = {
    xs: {
      span: 24
    },
    md: { span: 16 }
  };
  const SpanConfigRight = {
    xs: {
      span: 24
    },
    md: { span: 8 }
  };

  return (
    <Layout pathname={location.pathname}>
      <ArtistListWrapper>
        {trail.map((style, index) => {
          const artist = list[index].node;
          return (
            <ArtistListItem key={artist.id}>
              <Row key={artist.id}>
                <Col {...SpanConfigLeft}>
                  <Container type="text">
                    <animated.div style={contentProps}>
                      <Link to={`/${artist.id}`}>
                        <h1
                          style={{
                            fontWeight: 900,
                            marginBottom: 30,
                            marginTop: 30
                          }}
                        >
                          {artist.name}
                        </h1>
                      </Link>
                      <hr />
                      {artist.biography && (
                        <ReactMarkdown source={artist.biography} />
                      )}
                    </animated.div>
                  </Container>
                </Col>
                <Col {...SpanConfigRight}>
                  <ImageWrapper>
                    {artist.thumbnail && (
                      <Img fluid={artist.thumbnail.childImageSharp.fluid} />
                    )}
                  </ImageWrapper>
                </Col>
              </Row>
            </ArtistListItem>
          );
        })}
      </ArtistListWrapper>
    </Layout>
  );
};

export default Artists;

Artists.propTypes = {
  data: PropTypes.shape({
    allStrapiArtists: PropTypes.shape({
      edges: PropTypes.array.isRequired
    })
  }).isRequired,
  location: PropTypes.object.isRequired
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
        }
      }
    }
  }
`;
