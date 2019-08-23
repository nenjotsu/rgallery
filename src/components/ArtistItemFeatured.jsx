import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { animated } from 'react-spring';
import styled from 'styled-components';
import Img from 'gatsby-image';
import RandomColor, { hexToRGB } from './RandomColor';
import ImagePlaceholder from '../images/artist-placeholder.png';

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
    // position: absolute !important;
    top: 0;
    width: 100%;
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

const ImgDefault = styled.div`
  .img-fluid {
    max-width: 100%;
    height: auto;
  }
`;

const ArtistItem = ({ node, style, testid }) => (
  <Item
    key={testid}
    style={{
      ...style,
      margin: 10,
    }}
    data-testid={testid}
  >
    <Content>
      <div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quae ex
          voluptatem corrupti eligendi aliquam ducimus officiis doloremque odio
          reprehenderit adipisci porro dolores deserunt pariatur, ab
          dignissimos! Quod, quae molestias.
        </div>
        <ImageWrapper>
          {node.thumbnail ? (
            <Img fluid={node.thumbnail.childImageSharp.fluid} />
          ) : (
            <Img
              fluid={node.artworks[0].thumbnail.childImageSharp.fluid}
              alt={`R Gallery Contemporary Arts - ${node.name}`}
            />
          )}
        </ImageWrapper>
        <Link to={testid}>
          {node.thumbnail && (
            <TracedGlow src={node.thumbnail.childImageSharp.fluid} alt="" />
          )}
          <Overlay style={{ backgroundColor: hexToRGB(RandomColor(), 0.2) }} />
          <h2>
            {node.name} {node.artworks && `(${node.artworks.length})`}
          </h2>
        </Link>
      </div>
    </Content>
  </Item>
);

export default ArtistItem;

ArtistItem.propTypes = {
  node: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  testid: PropTypes.string.isRequired,
};
