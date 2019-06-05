import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import { FaInstagram, FaFacebook, FaDribbble } from 'react-icons/fa';
import styled from 'styled-components';
import config from '../../config/website';
import MainLogo from '../images/main-logo.jpg';

const Wrapper = styled.header`
  align-items: center;
  display: flex;
  padding: 1rem 0 1rem 0;
  position: relative;
  z-index: 1000;
  background: #fff;
  -webkit-box-shadow: 0 2px 8px #f0f1f2;
  box-shadow: 0 2px 8px #f0f1f2;
  a {
    color: ${props => props.theme.colors.black};
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    z-index: 100;
    &:hover {
      color: ${props => props.theme.brand.primary};
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding: 1rem 0 1rem 0;
    flex-wrap: wrap;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  padding: 0 ${props => props.theme.spacer.horizontal};
  a:not(:first-child) {
    margin-left: 1rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding: 0 1rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    order: 2;
  }
`;

const Name = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  a {
    font-size: 1.25rem;
    font-family: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      sans-serif;
    font-weight: 700;
    &:hover,
    &:focus {
      color: ${props => props.theme.colors.body_color};
      text-decoration: none;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    order: 1;
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    order: 1;
    flex: 1 0 100%;
    margin-bottom: 0.75rem;
  }
`;

const SocialMedia = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  padding: 0 ${props => props.theme.spacer.horizontal};
  a {
    font-size: 1.25rem;
    line-height: 20px;
  }
  a:not(:first-child) {
    margin-left: 1rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    display: none;
    padding: 1rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    // order: 2;
    display: none;
  }
`;

// Grabs all MDX files from src/pages and puts them into the navigation

const navs = [
  {
    slug: '/about',
    title: 'About',
  },
  {
    slug: '/artists',
    title: 'Artists',
  },
  {
    slug: '/artworks',
    title: 'Artworks',
  },
  {
    slug: '/exhibitions',
    title: 'Exhibitions',
  },
];

const Navigation = () => (
  <StaticQuery
    query={query}
    render={data => (
      <Wrapper data-testid="navigation">
        <Nav>
          {data.nav.edges.map((nav, index) => (
            <Link
              key={nav.node.fields.slug}
              to={nav.node.fields.slug}
              data-testid={`navItem-${index}`}
              activeClassName="nav-active"
            >
              {nav.node.frontmatter.title}
            </Link>
          ))}
          {navs.map((nav, index) => (
            <Link
              key={nav.slug}
              to={nav.slug}
              data-testid={`navItem-${index}`}
              activeClassName="nav-active"
            >
              {nav.title}
            </Link>
          ))}
        </Nav>
        <Name>
          <Link to="/" data-testid="home-title-link">
            <img
              style={{ maxHeight: 40 }}
              src={MainLogo}
              alt={config.siteTitle}
            />
          </Link>
        </Name>

        <SocialMedia>
          <a
            href="https://www.instagram.com/rgallery.ph/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/rgalleryph"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="FAcebook"
          >
            <FaFacebook />
          </a>
        </SocialMedia>
      </Wrapper>
    )}
  />
);

export default Navigation;

const query = graphql`
  query NavLinks {
    nav: allMdx(filter: { fields: { sourceInstanceName: { eq: "pages" } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
