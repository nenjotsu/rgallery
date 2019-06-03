import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';
import * as lodash from 'lodash';
import RandomColor, { hexToRGB } from './RandomColor';

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
  font-size: 0.7em;
  opacity: 0.9;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
`;

const ArtowrkItem = ({ node, style, testid }) => {
  const color = RandomColor();
  const transparentColor = hexToRGB(color, 0.1);
  return (
    <div
      key={testid}
      className="item"
      style={{
        ...style,
      }}
    >
      <div className="item__content  item__content--large">
        <Content>
          <Link to={testid}>
            {node.thumbnail && (
              <TracedGlow src={node.thumbnail.childImageSharp.fluid} alt="" />
            )}
            <Overlay style={{ backgroundColor: transparentColor }} />
            <h2>{node.title}</h2>
            {lodash.has(node, 'sizes.descriptions') && (
              <Service>{node.sizes && node.sizes.descriptions}</Service>
            )}
            {lodash.has(node, 'medium.name') && (
              <Service>{node.medium && node.medium.name}</Service>
            )}
            {lodash.has(node, 'exhibition.title') && (
              <Service>
                Exhibition: {node.exhibition && node.exhibition.title}
              </Service>
            )}
            {lodash.has(node, 'artist.name') && (
              <h3>Artist: {node.artist && node.artist.name}</h3>
            )}
          </Link>
        </Content>
        {node.thumbnail && node.thumbnail.publicURL && (
          <img
            className="item__img"
            src={node.thumbnail.publicURL}
            alt={node.title}
          />
        )}
      </div>
    </div>
  );
};

export default ArtowrkItem;

ArtowrkItem.propTypes = {
  node: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  testid: PropTypes.string.isRequired,
};
