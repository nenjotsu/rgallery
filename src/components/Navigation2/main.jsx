import React from 'react';
import { Link } from 'gatsby';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import config from '../../../config/website';
import MainLogo from '../../images/main-logo.jpg';
import { LogoBrand, LeftNav, RightNav } from './styled';
import { SpanConfig, NavRoutes } from './enums';

const Navigation = () => {
  return (
    <Row>
      <Col key="LeftNav" {...SpanConfig}>
        <LeftNav>
          <Link to="/v2" data-testid="home-title-link">
            <LogoBrand src={MainLogo} alt={config.siteTitle} />
          </Link>
        </LeftNav>
      </Col>
      <Col key="RightNav" {...SpanConfig}>
        <RightNav>
          {NavRoutes.map((nav, index) => (
            <Link
              key={nav.slug}
              to={nav.slug}
              data-testid={`nav-item-${index}`}
              activeClassName="nav-active"
            >
              {nav.title}
            </Link>
          ))}
        </RightNav>
      </Col>
    </Row>
  );
};

export default Navigation;
