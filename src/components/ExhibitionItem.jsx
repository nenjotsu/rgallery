import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { animated } from 'react-spring';
import styled from 'styled-components';
import Img from 'gatsby-image';

const Item = styled(animated.div)`
  position: relative;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

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
    margin-top: 0;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const ImageWrapper = styled.div`
  > div {
    height: 100%;
    left: 0;
    position: absolute !important;
    top: 0;
    width: 100%;

    padding: 20px;
    > div {
      position: static !important;
    }
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
  opacity: 0.8;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const ExhibitionItem = ({ node, style, testid }) => (
  <Item key={testid} style={style} data-testid={testid}>
    <Content>
      <ImageWrapper>
        {node.thumbnail && (
          <Img
            style={{
              padding: 20,
            }}
            fluid={node.thumbnail.childImageSharp.fluid}
          />
        )}
      </ImageWrapper>
      <Link to={testid}>
        {node.thumbnail && (
          <TracedGlow src={node.thumbnail.childImageSharp.fluid} alt="" />
        )}
        <Overlay style={{ backgroundColor: '#00000066' }} />
        <h2>{node.title}</h2>
        <Service>{node.dateFrom}</Service>
      </Link>
    </Content>
  </Item>
);

export default ExhibitionItem;

ExhibitionItem.propTypes = {
  node: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  testid: PropTypes.string.isRequired,
};
