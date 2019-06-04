/* eslint react/display-name: 0 */
import React from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { useTrail } from 'react-spring';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { Layout, ExhibitionItem } from '../../components';

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  width: 100%;
`;

const Exhibitions = ({ data, location }) => {
  const list = data.allStrapiExhibitions.edges;

  const trail = useTrail(list.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <Layout pathname={location.pathname}>
      <ListWrapper>
        {trail.map((style, index) => (
          <ExhibitionItem
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
    allStrapiExhibitions {
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
        }
      }
    }
  }
`;
